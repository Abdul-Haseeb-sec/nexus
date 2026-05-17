import React, { useState } from 'react';
import { useStore } from '../store';
import { Clock, CheckSquare, FileText, Check, Plus, X, Brain, Sparkles, TrendingUp, Calendar as CalIcon, Trash2 } from 'lucide-react';
import { format, isToday } from 'date-fns';

export default function Secretary({ t, user, playHoverSound }) {
  const { events, notes, todos, setNotes, setTodos } = useStore();
  const [newNote, setNewNote] = useState('');
  const [newTodo, setNewTodo] = useState('');

  const addNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setNotes([{ id: 'n_' + Date.now(), text: newNote, ts: new Date().toISOString() }, ...notes]);
    setNewNote('');
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    setTodos([{ id: 't_' + Date.now(), text: newTodo, done: false }, ...todos]);
    setNewTodo('');
  };

  const toggleTodo = (id) => setTodos(todos.map(td => td.id === id ? { ...td, done: !td.done } : td));
  const deleteTodo = (id) => setTodos(todos.filter(td => td.id !== id));
  const deleteNote = (id) => setNotes(notes.filter(n => n.id !== id));

  const todayEvs = events.filter(e => e.date === format(new Date(), 'yyyy-MM-dd')).sort((a, b) => a.time.localeCompare(b.time));
  const pendingTodos = todos.filter(t => !t.done).length;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 32, height: 'calc(100vh - 180px)', animation: 'fadeUp 0.4s ease' }}>
      
      {/* Executive Briefing Sidebar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* AI Briefing Card */}
        <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 24, padding: 32, position: 'relative', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
          <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, background: 'radial-gradient(circle, rgba(157, 78, 221, 0.2) 0%, transparent 70%)', filter: 'blur(20px)' }} />
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #9D4EDD, #3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <Brain size={20} />
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Executive Brief</h2>
          </div>

          <div style={{ fontSize: 14, lineHeight: 1.6, color: t.muted }}>
            Good day, {user.username}. You have <span style={{ color: t.text, fontWeight: 700 }}>{todayEvs.length} meetings</span> scheduled for today and <span style={{ color: t.text, fontWeight: 700 }}>{pendingTodos} priority tasks</span> pending. 
            {todayEvs.length > 0 && ` Your first engagement is "${todayEvs[0].title}" at ${todayEvs[0].time}.`}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 24 }}>
            <div style={{ padding: 16, background: t.inp, borderRadius: 16, border: `1px solid ${t.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#3B82F6', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}><CalIcon size={14} /> Meetings</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: t.text }}>{todayEvs.length}</div>
            </div>
            <div style={{ padding: 16, background: t.inp, borderRadius: 16, border: `1px solid ${t.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#F59E0B', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}><TrendingUp size={14} /> Tasks</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: t.text }}>{pendingTodos}</div>
            </div>
          </div>
        </div>

        {/* Schedule Preview */}
        <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 24, padding: 32, flex: 1, overflowY: 'auto', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Clock size={18} /> Today&apos;s Itinerary
          </h3>
          
          {todayEvs.length === 0 ? (
            <div style={{ color: t.muted, fontSize: 14, textAlign: 'center', padding: '20px 0' }}>No engagements scheduled.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {todayEvs.map(ev => (
                <div key={ev.id} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ width: 48, fontSize: 12, fontWeight: 700, color: t.muted, textAlign: 'right' }}>{ev.time}</div>
                  <div style={{ flex: 1, padding: 16, background: t.inp, borderRadius: 16, border: `1px solid ${t.border}`, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ width: 4, height: '100%', position: 'absolute', left: 0, top: 0, background: ev.color || '#3B82F6' }} />
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{ev.title}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Workspace */}
      <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 24 }}>
        
        {/* Priority Action Items */}
        <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 24, padding: 32, display: 'flex', flexDirection: 'column', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10 }}>
              <CheckSquare size={20} color="#F59E0B" /> Priority Action Items
            </h3>
            <span style={{ fontSize: 12, fontWeight: 600, color: t.muted, background: t.inp, padding: '4px 12px', borderRadius: 100 }}>{todos.length} Total</span>
          </div>

          <form onSubmit={(e) => { playHoverSound(); addTodo(e); }} style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
            <input 
              value={newTodo} onChange={e => setNewTodo(e.target.value)} placeholder="Add a new action item..." 
              style={{ flex: 1, padding: '16px 20px', background: t.inp, border: `1px solid ${t.border}`, borderRadius: 16, color: t.text, fontSize: 14, transition: 'border 0.2s' }} 
              onFocus={e => e.target.style.borderColor = '#F59E0B'}
              onBlur={e => e.target.style.borderColor = t.border}
            />
            <button type="submit" onMouseEnter={playHoverSound} style={{ padding: '0 20px', background: '#fff', color: '#000', border: 'none', borderRadius: 16, cursor: 'pointer', fontWeight: 600 }}>
              Add
            </button>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1, overflowY: 'auto', paddingRight: 8 }}>
            {todos.length === 0 && <div style={{ color: t.muted, fontSize: 14, textAlign: 'center', padding: '40px 0' }}>All clear. Great job.</div>}
            {todos.map(td => (
              <div 
                key={td.id} 
                style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px', background: t.inp, borderRadius: 16, border: `1px solid ${t.border}`, cursor: 'pointer', opacity: td.done ? 0.4 : 1, transition: 'all 0.2s' }}
                onMouseEnter={e => { playHoverSound(); e.currentTarget.style.borderColor = t.muted; }}
                onMouseLeave={e => e.currentTarget.style.borderColor = t.border}
              >
                <div onClick={() => { playHoverSound(); toggleTodo(td.id); }} style={{ width: 24, height: 24, borderRadius: 8, border: `2px solid ${td.done ? '#F59E0B' : t.muted}`, background: td.done ? '#F59E0B' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                  {td.done && <Check size={14} color="#000" strokeWidth={3} />}
                </div>
                <span onClick={() => { playHoverSound(); toggleTodo(td.id); }} style={{ flex: 1, fontSize: 15, fontWeight: 500, textDecoration: td.done ? 'line-through' : 'none' }}>{td.text}</span>
                <button onClick={() => { playHoverSound(); deleteTodo(td.id); }} style={{ background: 'transparent', border: 'none', color: t.muted, cursor: 'pointer', padding: 8, borderRadius: 8 }}><X size={18} /></button>
              </div>
            ))}
          </div>
        </div>

        {/* Meeting Notes / Strategy */}
        <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 24, padding: 32, display: 'flex', flexDirection: 'column', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
            <FileText size={20} color="#10B981" /> Strategy & Meeting Notes
          </h3>

          <form onSubmit={(e) => { playHoverSound(); addNote(e); }} style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
            <input 
              value={newNote} onChange={e => setNewNote(e.target.value)} placeholder="Draft a note or meeting summary..." 
              style={{ flex: 1, padding: '16px 20px', background: t.inp, border: `1px solid ${t.border}`, borderRadius: 16, color: t.text, fontSize: 14, transition: 'border 0.2s' }} 
              onFocus={e => e.target.style.borderColor = '#10B981'}
              onBlur={e => e.target.style.borderColor = t.border}
            />
            <button type="submit" onMouseEnter={playHoverSound} style={{ padding: '0 20px', background: '#fff', color: '#000', border: 'none', borderRadius: 16, cursor: 'pointer', fontWeight: 600 }}>
              Save
            </button>
          </form>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 16, flex: 1, overflowY: 'auto' }}>
            {notes.length === 0 && <div style={{ color: t.muted, fontSize: 14, gridColumn: '1 / -1', padding: '40px 0' }}>No notes recorded.</div>}
            {notes.map(n => (
              <div key={n.id} style={{ padding: 20, background: t.inp, borderRadius: 16, border: `1px solid ${t.border}`, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 14, lineHeight: 1.6, flex: 1, marginBottom: 16 }}>{n.text}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${t.border}`, paddingTop: 12 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: t.muted, textTransform: 'uppercase' }}>{format(new Date(n.ts), 'MMM d · h:mm a')}</span>
                  <button onClick={() => { playHoverSound(); deleteNote(n.id); }} style={{ background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer', padding: 0 }}><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
