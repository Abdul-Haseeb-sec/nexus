import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function NewsTab({ theme, realNews, playHoverSound }) {
  return (
    <div style={{ animation: 'fadeUp 0.4s ease' }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Global Tech News</h2>
      <p style={{ color: theme.muted, marginBottom: 32 }}>Real-time live feed from HackerNews top stories.</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {realNews.length === 0 ? <div style={{ color: theme.muted }}>Fetching live data...</div> : realNews.map(n => (
          <a key={n.objectID} href={n.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
            <div style={{ background: theme.card, border: `1px solid ${theme.border}`, padding: 24, borderRadius: 16, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onMouseEnter={(e) => { playHoverSound(); e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = theme.acc; }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = theme.border; }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: theme.acc, marginBottom: 8, textTransform: 'uppercase' }}>{n.points} Points • by {n.author}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: theme.text, marginBottom: 8, lineHeight: 1.4 }}>{n.title}</div>
                <div style={{ fontSize: 12, color: theme.muted }}>{new URL(n.url || 'https://news.ycombinator.com').hostname}</div>
              </div>
              <ExternalLink size={20} color={theme.muted} />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
