import React from 'react';
import { Plus } from 'lucide-react';
import AppIcon from '../AppIcon';

export default function HomeTab({ theme, CATS, getApps, setAppModal, launch, playHoverSound }) {
  return (
    <div style={{ animation: 'fadeUp 0.4s ease' }}>
      <h1 style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 48 }}>
        Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}.
      </h1>

      {CATS.map(cat => {
        const apps = getApps(cat.key);
        if (!apps.length) return null;
        return (
          <section key={cat.key} style={{ marginBottom: 56 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <h2 style={{ fontSize: 13, fontWeight: 700, color: theme.muted, margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {cat.label}
              </h2>
              <button 
                onClick={() => { playHoverSound(); setAppModal(cat.key); }}
                style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: theme.text, background: theme.inp, border: `1px solid ${theme.border}`, padding: '6px 12px', borderRadius: 100, cursor: 'pointer' }}
              >
                <Plus size={14} /> Add App
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 20 }}>
              {apps.map(app => (
                <div 
                  key={app.id} 
                  onClick={() => launch(app)}
                  onMouseEnter={(e) => {
                    playHoverSound();
                    e.currentTarget.style.background = theme.cardHover; 
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = `0 12px 30px ${app.color || theme.acc}25`;
                    e.currentTarget.style.borderColor = `${app.color || theme.acc}50`;
                  }}
                  onMouseLeave={e => { 
                    e.currentTarget.style.background = theme.card; 
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = theme.border;
                  }}
                  style={{ 
                    padding: '24px 16px', background: theme.card, border: `1px solid ${theme.border}`, 
                    borderRadius: 20, cursor: 'pointer', textAlign: 'center',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16, position: 'relative' }}>
                    <AppIcon app={app} size={54} />
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: theme.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{app.name}</div>
                </div>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  );
}
