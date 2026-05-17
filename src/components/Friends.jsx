import React, { useState, useEffect, useRef } from 'react';
import { Search, UserPlus, Video, Send, MessageCircle, MapPin, Gamepad2, Music, Camera } from 'lucide-react';
import { makeTag, roomId } from '../utils';
import { useStore } from '../store';
import { db } from '../firebase';
import { collection, query, where, getDocs, addDoc, onSnapshot, orderBy, serverTimestamp } from 'firebase/firestore';

export default function Friends({ t, user, playHoverSound }) {
  const { friends, setFriends } = useStore();
  const [search, setSearch] = useState('');
  const [found, setFound] = useState(null);
  const [activeDm, setActiveDm] = useState(null);
  const [messages, setMessages] = useState([]);
  const [msgInput, setMsgInput] = useState('');
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [nearbyScan, setNearbyScan] = useState(false);
  const messagesEndRef = useRef(null);

  // Simulated Rich Presence
  const RICH_PRESENCE_OPTS = [
    { type: 'spotify', icon: <Music size={12} />, text: 'Listening to Spotify' },
    { type: 'game', icon: <Gamepad2 size={12} />, text: 'Playing Valorant' },
    { type: 'online', icon: <div style={{width:8, height:8, borderRadius:4, background:'#10B981'}}/>, text: 'Online' }
  ];

  // Map presence dynamically for UI since it's not saved to Firestore
  const friendsWithPresence = friends.map(f => ({
    ...f,
    presence: RICH_PRESENCE_OPTS[Math.floor((f.id.charCodeAt(0) || 0) % RICH_PRESENCE_OPTS.length)]
  }));

  // Setup Firestore listener for messages when activeDm changes
  useEffect(() => {
    if (!activeDm) return;
    const key = `chat_${[user.id, activeDm.id].sort().join('_')}`;
    const q = query(collection(db, 'chats', key, 'messages'), orderBy('timestamp', 'asc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = [];
      snapshot.forEach(doc => {
        msgs.push({ id: doc.id, ...doc.data() });
      });
      setMessages(msgs);
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    });

    return () => unsubscribe();
  }, [user.id, activeDm]);

  const handleSearch = async () => {
    if (!search) return;
    const targetTag = makeTag(search.replace('@', ''));
    
    try {
      const q = query(collection(db, 'users'), where('tag', '==', targetTag));
      const querySnapshot = await getDocs(q);
      
      let foundUser = null;
      querySnapshot.forEach((doc) => {
        if (doc.id !== user.id) {
          foundUser = doc.data();
        }
      });
      
      setFound(foundUser || { notFound: true, tag: targetTag });
    } catch (error) {
      console.error("Error searching for user:", error);
    }
  };

  const scanNearby = () => {
    playHoverSound();
    if (!locationEnabled) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(() => setLocationEnabled(true), () => alert("Location access denied."));
      } else {
        alert("Geolocation is not supported by this browser.");
      }
      return;
    }
    setNearbyScan(true);
    setTimeout(() => {
      setNearbyScan(false);
      alert("No Nexus users found within 5km radius.");
    }, 2000);
  };

  const addFriend = (f) => {
    if (!friends.find(x => x.id === f.id)) {
      const baseFriend = { id: f.id, username: f.username, tag: f.tag };
      setFriends([...friends, baseFriend]);
    }
    setFound(null);
    setSearch('');
  };

  const openChat = (friend) => {
    playHoverSound();
    setActiveDm(friend);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!msgInput.trim() || !activeDm) return;

    const key = `chat_${[user.id, activeDm.id].sort().join('_')}`;
    const text = msgInput;
    setMsgInput('');
    
    try {
      await addDoc(collection(db, 'chats', key, 'messages'), {
        senderId: user.id,
        text: text,
        timestamp: serverTimestamp()
      });
      // The onSnapshot listener will pick this up and update the UI
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Message failed to send. Check console.");
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 32, height: 'calc(100vh - 180px)', animation: 'fadeUp 0.4s ease' }}>
      
      {/* Nexus Social Hub Sidebar */}
      <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 24, display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
        
        {/* User Profile Area */}
        <div style={{ padding: 24, borderBottom: `1px solid ${t.border}`, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 60, background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))' }} />
          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 16, marginTop: 20 }}>
            <div style={{ width: 64, height: 64, borderRadius: 20, background: t.inp, border: `4px solid ${t.card}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700, color: t.text, position: 'relative', cursor: 'pointer' }} onMouseEnter={playHoverSound}>
              {user.username[0].toUpperCase()}
              <div style={{ position: 'absolute', bottom: -4, right: -4, background: t.card, borderRadius: '50%', padding: 4 }}>
                <div style={{ background: t.inp, borderRadius: '50%', padding: 4 }}><Camera size={12} color={t.muted} /></div>
              </div>
            </div>
            <div style={{ flex: 1, paddingBottom: 4 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{user.username}</h2>
              <div style={{ fontSize: 12, color: t.muted, fontFamily: 'JetBrains Mono, monospace' }}>{user.tag}</div>
            </div>
          </div>
        </div>

        <div style={{ padding: 20, borderBottom: `1px solid ${t.border}` }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: 14, top: 13, color: t.muted }} />
              <input 
                value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()}
                placeholder="Find friends via @tag" 
                style={{ width: '100%', padding: '12px 14px 12px 36px', background: t.inp, border: `1px solid ${t.border}`, borderRadius: 12, color: t.text, fontSize: 13 }} 
              />
            </div>
            <button onClick={() => { playHoverSound(); handleSearch(); }} style={{ padding: '0 16px', background: t.text, color: t.bg, border: 'none', borderRadius: 12, cursor: 'pointer', fontWeight: 600 }}>
              Add
            </button>
          </div>

          <button onClick={scanNearby} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', background: 'transparent', border: `1px solid ${t.border}`, borderRadius: 12, color: '#3B82F6', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>
            {nearbyScan ? <span style={{ animation: 'pulse 1s infinite' }}>Scanning Radius...</span> : <><MapPin size={16} /> Scan Nearby</>}
          </button>

          {found && (
            <div style={{ marginTop: 16, padding: 16, background: t.inp, borderRadius: 12, border: `1px solid ${t.border}` }}>
              {found.notFound ? (
                <span style={{ fontSize: 13, color: t.muted }}>User {found.tag} not found. Ensure the spelling is exact.</span>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 10, background: t.text, color: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{found.username[0].toUpperCase()}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{found.username}</div>
                      <div style={{ fontSize: 11, color: t.muted }}>{found.tag}</div>
                    </div>
                  </div>
                  <button onClick={() => { playHoverSound(); addFriend(found); }} style={{ padding: '8px 16px', background: '#3B82F6', color: '#fff', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Connect</button>
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 12 }}>
          <div style={{ padding: '0 12px', fontSize: 11, fontWeight: 700, color: t.muted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Direct Messages</div>
          {friendsWithPresence.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: t.muted, fontSize: 13 }}>
              Your friend list is empty. Add someone to start a conversation.
            </div>
          ) : (
            friendsWithPresence.map(f => (
              <div 
                key={f.id} onClick={() => openChat(f)}
                onMouseEnter={(e) => { playHoverSound(); e.currentTarget.style.background = activeDm?.id === f.id ? t.inp : 'rgba(255,255,255,0.02)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = activeDm?.id === f.id ? t.inp : 'transparent' }}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: 16, padding: '12px', 
                  borderRadius: 16, cursor: 'pointer',
                  background: activeDm?.id === f.id ? t.inp : 'transparent',
                  transition: 'background 0.2s', marginBottom: 4
                }}
              >
                <div style={{ position: 'relative' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 16, background: t.border, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, color: t.text }}>
                    {f.username[0].toUpperCase()}
                  </div>
                  <div style={{ position: 'absolute', bottom: -2, right: -2, background: t.card, borderRadius: '50%', padding: 3 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981' }} />
                  </div>
                </div>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4, color: t.text }}>{f.username}</div>
                  <div style={{ fontSize: 12, color: t.muted, display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {f.presence?.icon} {f.presence?.text}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 24, display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
        {!activeDm ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: t.muted }}>
            <MessageCircle size={64} strokeWidth={1} style={{ marginBottom: 24, opacity: 0.3 }} />
            <div style={{ fontSize: 18, fontWeight: 600, color: t.text }}>Nexus Secure Chat</div>
            <div style={{ fontSize: 14, marginTop: 8, maxWidth: 300, textAlign: 'center', lineHeight: 1.5 }}>Select a conversation from the sidebar or start a new one. End-to-end encrypted.</div>
          </div>
        ) : (
          <>
            <div style={{ padding: '20px 32px', borderBottom: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 16, background: t.border, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700 }}>
                  {activeDm.username[0].toUpperCase()}
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700 }}>{activeDm.username}</div>
                  <div style={{ fontSize: 13, color: '#10B981', display: 'flex', alignItems: 'center', gap: 6 }}>
                    {activeDm.presence?.icon} {activeDm.presence?.text}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => { playHoverSound(); window.open(`https://meet.jit.si/nexus-${roomId()}`, '_blank'); }}
                onMouseEnter={playHoverSound}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: '#3B82F6', border: 'none', borderRadius: 12, color: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 600, transition: 'transform 0.2s' }}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
              >
                <Video size={18} /> Join Call
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
              {messages.map((m, i) => {
                const isMe = m.senderId === user.id;
                const showAvatar = i === 0 || messages[i-1].senderId !== m.senderId;
                
                return (
                  <div key={m.id} style={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start', gap: 12, alignItems: 'flex-end' }}>
                    {!isMe && showAvatar && (
                      <div style={{ width: 32, height: 32, borderRadius: 10, background: t.border, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                        {activeDm.username[0].toUpperCase()}
                      </div>
                    )}
                    {!isMe && !showAvatar && <div style={{ width: 32 }} />}
                    
                    <div style={{ 
                      maxWidth: '65%', padding: '14px 20px', 
                      background: isMe ? '#fff' : t.inp, 
                      color: isMe ? '#000' : t.text,
                      borderRadius: isMe ? '20px 20px 6px 20px' : '20px 20px 20px 6px',
                      fontSize: 15, lineHeight: 1.5,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                    }}>
                      {m.text}
                      <div style={{ fontSize: 10, marginTop: 6, opacity: 0.6, textAlign: isMe ? 'right' : 'left', fontWeight: 600 }}>
                        {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={(e) => { playHoverSound(); sendMessage(e); }} style={{ padding: 24, borderTop: `1px solid ${t.border}`, background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ display: 'flex', gap: 16, background: t.inp, border: `1px solid ${t.border}`, borderRadius: 20, padding: '8px 8px 8px 24px', alignItems: 'center' }}>
                <input 
                  value={msgInput} onChange={e => setMsgInput(e.target.value)}
                  placeholder={`Message @${activeDm.username}...`} autoFocus
                  style={{ flex: 1, background: 'transparent', border: 'none', color: t.text, fontSize: 15, outline: 'none' }}
                />
                <button type="submit" disabled={!msgInput.trim()} style={{ width: 44, height: 44, borderRadius: 16, background: t.text, color: t.bg, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: msgInput.trim() ? 'pointer' : 'not-allowed', opacity: msgInput.trim() ? 1 : 0.5, transition: 'all 0.2s' }}>
                  <Send size={18} style={{ transform: 'translateX(2px)' }} />
                </button>
              </div>
            </form>
          </>
        )}
      </div>
      <style>{`@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }`}</style>
    </div>
  );
}
