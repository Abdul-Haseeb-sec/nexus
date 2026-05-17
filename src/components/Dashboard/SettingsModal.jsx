import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Monitor, Volume2, BellOff, X } from 'lucide-react';

export default function SettingsModal({
  theme,
  settingsOpen,
  setSettingsOpen,
  settingsTab,
  setSettingsTab,
  themeColor,
  setThemeColor,
  soundEnabled,
  setSoundEnabled,
  soundProfile,
  setSoundProfile,
  playHoverSound,
  volume,
  setVolume,
  focusMode,
  setFocusMode
}) {
  return (
    <AnimatePresence>
      {settingsOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(30px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.95 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, y: 40, scale: 0.95 }} 
            transition={{ type: "spring", damping: 30, stiffness: 300 }} 
            style={{ width: 800, background: 'rgba(15,15,15,0.85)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 32, display: 'flex', overflow: 'hidden', boxShadow: '0 60px 120px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-title"
          >
            
            {/* Settings Sidebar */}
            <div style={{ width: 240, background: 'rgba(255,255,255,0.02)', borderRight: '1px solid rgba(255,255,255,0.05)', padding: 32 }}>
              <h3 id="settings-title" style={{ fontSize: 24, fontWeight: 800, color: '#fff', margin: '0 0 32px 0', display: 'flex', alignItems: 'center', gap: 12, letterSpacing: '-0.02em' }}><Settings size={24} color={theme.acc} /> Settings</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }} role="tablist">
                <button onClick={() => setSettingsTab('appearance')} role="tab" aria-selected={settingsTab === 'appearance'} style={{ background: settingsTab === 'appearance' ? `${theme.acc}20` : 'transparent', color: settingsTab === 'appearance' ? theme.acc : '#A1A1AA', border: `1px solid ${settingsTab === 'appearance' ? `${theme.acc}50` : 'transparent'}`, padding: '12px 16px', borderRadius: 12, fontSize: 14, fontWeight: 600, textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.2s' }}><Monitor size={16} /> Appearance</button>
                <button onClick={() => setSettingsTab('audio')} role="tab" aria-selected={settingsTab === 'audio'} style={{ background: settingsTab === 'audio' ? `${theme.acc}20` : 'transparent', color: settingsTab === 'audio' ? theme.acc : '#A1A1AA', border: `1px solid ${settingsTab === 'audio' ? `${theme.acc}50` : 'transparent'}`, padding: '12px 16px', borderRadius: 12, fontSize: 14, fontWeight: 600, textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.2s' }}><Volume2 size={16} /> Audio</button>
                <button onClick={() => setSettingsTab('focus')} role="tab" aria-selected={settingsTab === 'focus'} style={{ background: settingsTab === 'focus' ? `${theme.acc}20` : 'transparent', color: settingsTab === 'focus' ? theme.acc : '#A1A1AA', border: `1px solid ${settingsTab === 'focus' ? `${theme.acc}50` : 'transparent'}`, padding: '12px 16px', borderRadius: 12, fontSize: 14, fontWeight: 600, textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.2s' }}><BellOff size={16} /> Focus</button>
              </div>
            </div>

            {/* Settings Content */}
            <div style={{ flex: 1, padding: 40, position: 'relative' }}>
              <button 
                onClick={() => setSettingsOpen(false)} 
                aria-label="Close Settings"
                style={{ position: 'absolute', top: 24, right: 24, background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', cursor: 'pointer', width: 36, height: 36, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }} 
                onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.1)'} 
                onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.05)'}
              >
                <X size={18} />
              </button>
              
              {settingsTab === 'appearance' && (
                <div style={{ animation: 'fadeUp 0.3s ease' }}>
                  <div style={{ marginBottom: 40 }}>
                    <h4 style={{ fontSize: 12, fontWeight: 800, color: '#A1A1AA', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24 }}>System Accent Color</h4>
                    <div style={{ display: 'flex', gap: 16 }}>
                      {['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#FFFFFF'].map(c => (
                        <button key={c} onClick={() => setThemeColor(c)} style={{ width: 44, height: 44, borderRadius: '50%', background: c, border: themeColor === c ? `3px solid #fff` : 'none', cursor: 'pointer', outline: `2px solid rgba(0,0,0,0.5)`, outlineOffset: -2, transition: 'all 0.2s', boxShadow: themeColor === c ? `0 0 20px ${c}80` : 'none' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {settingsTab === 'audio' && (
                <div style={{ animation: 'fadeUp 0.3s ease' }}>
                  <div style={{ marginBottom: 40 }}>
                    <h4 style={{ fontSize: 12, fontWeight: 800, color: '#A1A1AA', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24 }}>Audio Engine</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                      <div style={{ background: 'rgba(255,255,255,0.03)', padding: 24, borderRadius: 20, border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                          <label style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>Interface Sounds</label>
                          <input type="checkbox" checked={soundEnabled} onChange={e => setSoundEnabled(e.target.checked)} style={{ width: 20, height: 20, accentColor: theme.acc }} />
                        </div>
                        <p style={{ fontSize: 13, color: '#A1A1AA', margin: 0, lineHeight: 1.5 }}>Enable high-fidelity micro-interactions and hovering feedback sounds.</p>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.03)', padding: 24, borderRadius: 20, border: '1px solid rgba(255,255,255,0.05)', opacity: soundEnabled ? 1 : 0.5, pointerEvents: soundEnabled ? 'auto' : 'none' }}>
                        <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 16 }}>Acoustic Profile</label>
                        <select value={soundProfile} onChange={e => { setSoundProfile(e.target.value); setTimeout(()=>playHoverSound(), 100); }} style={{ width: '100%', padding: '14px 16px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff', fontSize: 14, outline: 'none', fontWeight: 500, appearance: 'none', cursor: 'pointer' }}>
                          <option value="pop">Minimal Pop</option>
                          <option value="swoosh">Soft Swoosh</option>
                          <option value="click">Mechanical Click</option>
                          <option value="chime">Glass Chime</option>
                          <option value="digital">Digital Wave</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div style={{ opacity: soundEnabled ? 1 : 0.5, pointerEvents: soundEnabled ? 'auto' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                      <label style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>Master Volume</label>
                      <span style={{ fontSize: 14, fontWeight: 700, color: theme.acc }}>{Math.round(volume * 100)}%</span>
                    </div>
                    <input type="range" min="0" max="1" step="0.05" value={volume} onChange={e => { setVolume(Number(e.target.value)); playHoverSound(); }} style={{ width: '100%', accentColor: theme.acc, cursor: 'pointer' }} />
                  </div>
                </div>
              )}

              {settingsTab === 'focus' && (
                <div style={{ animation: 'fadeUp 0.3s ease' }}>
                  <div style={{ marginBottom: 40 }}>
                    <h4 style={{ fontSize: 12, fontWeight: 800, color: '#A1A1AA', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 24 }}>Focus Controls</h4>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: 24, borderRadius: 20, border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                        <label style={{ fontSize: 15, fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: 10 }}><BellOff size={18} color={theme.acc} /> Focus Mode</label>
                        <input type="checkbox" checked={focusMode} onChange={e => setFocusMode(e.target.checked)} style={{ width: 20, height: 20, accentColor: theme.acc }} />
                      </div>
                      <p style={{ fontSize: 13, color: '#A1A1AA', margin: 0, lineHeight: 1.5 }}>Mute all notifications, alerts, and calendar alarms so you can focus on deep work without interruptions.</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
