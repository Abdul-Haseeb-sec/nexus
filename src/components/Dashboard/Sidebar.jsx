import React, { useState } from 'react';
import { Zap, Settings, BellOff, VolumeX, Volume2, LogOut } from 'lucide-react';
import AppIcon from '../AppIcon';

export default function Sidebar({
  theme,
  quickApps,
  launch,
  playHoverSound,
  focusMode,
  setFocusMode,
  allMute,
  setAllMute,
  currentTime,
  onLogout,
  setSettingsOpen
}) {
  const [sidebarHovered, setSidebarHovered] = useState(false);

  return (
    <>
      {/* Edge trigger sliver — invisible 16px zone on the far left */}
      {!sidebarHovered && (
        <div
          onMouseEnter={() => setSidebarHovered(true)}
          style={{
            position: 'fixed', left: 0, top: 0, bottom: 0, width: 16,
            zIndex: 3000, cursor: 'default'
          }}
        />
      )}

      {/* Elastic In-Layout Sidebar */}
      <div
        onMouseLeave={() => setSidebarHovered(false)}
        style={{
          flexShrink: 0,
          width: sidebarHovered ? 280 : 0,
          transition: 'width 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'width',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 100
        }}
      >
        <div style={{ 
          width: 280,
          background: '#09090B',
          borderRight: `1px solid rgba(255,255,255,0.06)`, 
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', 
          boxShadow: sidebarHovered ? '12px 0 40px rgba(0,0,0,0.5)' : 'none',
          transition: 'box-shadow 0.45s ease',
        }}>
          <div style={{ padding: '28px 24px', borderBottom: `1px solid rgba(255,255,255,0.05)`, display: 'flex', alignItems: 'center', gap: 12 }}>
            <Zap color={theme.acc} fill={theme.acc} size={24} /> <span style={{ fontWeight: 900, fontSize: 20, letterSpacing: '-0.04em', color: '#fff' }}>NEXUS OS</span>
          </div>
          
          <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#A1A1AA', textTransform: 'uppercase', letterSpacing: '0.1em' }}>GX Control Panel</div>
              <button 
                onClick={() => setSettingsOpen(true)} 
                aria-label="Open Settings"
                style={{ background: 'none', border: 'none', color: '#A1A1AA', cursor: 'pointer', transition: 'transform 0.2s' }} 
                onMouseEnter={e => e.currentTarget.style.transform='rotate(90deg)'} 
                onMouseLeave={e => e.currentTarget.style.transform='rotate(0deg)'}
              >
                <Settings size={16} />
              </button>
            </div>

            {/* Quick Launch Apps */}
            {quickApps.length > 0 && (
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Quick Launch</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                  {quickApps.map(app => (
                    <button 
                      key={app.id} 
                      onClick={() => launch(app)} 
                      aria-label={`Launch ${app.name}`}
                      onMouseEnter={() => playHoverSound()} 
                      style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid rgba(255,255,255,0.05)`, borderRadius: 12, padding: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: 'all 0.2s' }} 
                      onMouseOver={e => { e.currentTarget.style.borderColor = app.color || theme.acc; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }} 
                      onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                    >
                      <AppIcon app={app} size={24} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
              <button 
                onClick={() => setFocusMode(!focusMode)} 
                aria-pressed={focusMode}
                style={{ flex: 1, padding: '12px 10px', borderRadius: 12, background: focusMode ? theme.acc : 'rgba(255,255,255,0.03)', color: focusMode ? '#000' : '#fff', border: `1px solid ${focusMode ? theme.acc : 'rgba(255,255,255,0.05)'}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}
              >
                <BellOff size={16} /> Focus Mode
              </button>
              <button 
                onClick={() => setAllMute(!allMute)} 
                aria-pressed={allMute}
                style={{ flex: 1, padding: '12px 10px', borderRadius: 12, background: allMute ? '#EF4444' : 'rgba(255,255,255,0.03)', color: '#fff', border: `1px solid ${allMute ? '#EF4444' : 'rgba(255,255,255,0.05)'}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}
              >
                {allMute ? <VolumeX size={16} /> : <Volume2 size={16} />} All Mute
              </button>
            </div>
            
            {/* Aesthetic Mini Calendar / Clock Widget */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: 32, borderRadius: 20, border: `1px solid rgba(255,255,255,0.05)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              <div style={{ fontSize: 40, fontWeight: 300, color: '#fff', letterSpacing: '-0.04em', marginBottom: 8 }}>
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div style={{ fontSize: 11, fontWeight: 800, color: theme.acc, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                {currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
              </div>
            </div>
          </div>

          <div style={{ padding: 24, borderTop: `1px solid rgba(255,255,255,0.05)`, display: 'flex', justifyContent: 'center' }}>
            <button onClick={onLogout} onMouseEnter={() => playHoverSound()} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px', borderRadius: 12, background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#EF4444', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
