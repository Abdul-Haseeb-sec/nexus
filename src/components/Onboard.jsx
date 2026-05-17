import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Bg from './Bg';
import AppIcon from './AppIcon';
import { ALL_APPS, CATS } from '../data';

export default function Onboard({ onDone }) {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [sel, setSel] = useState({ socials: [], work: [], games: [], entertainment: [] });

  const cat = CATS[step];
  const apps = ALL_APPS[cat.key];
  const isSel = (id) => sel[cat.key].includes(id);
  const allSel = sel[cat.key].length === apps.length;

  const toggle = (id) => setSel(p => ({ ...p, [cat.key]: isSel(id) ? p[cat.key].filter(x => x !== id) : [...p[cat.key], id] }));
  const toggleAll = () => setSel(p => ({ ...p, [cat.key]: allSel ? [] : apps.map(a => a.id) }));
  const next = () => step < CATS.length - 1 ? setStep(s => s + 1) : onDone(sel);

  return (
    <div role="main" aria-label="Onboarding" style={{ minHeight: '100vh', background: '#06060A', position: 'relative', overflow: 'hidden' }}>
      <Bg dark={true} accent={cat.accent} />
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '32px 18px', position: 'relative', zIndex: 1 }}>

        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 9, letterSpacing: 4, color: 'rgba(255,255,255,0.16)', marginBottom: 10 }}>
            {t('onboard.step_of', { step: step + 1, total: CATS.length })}
          </div>
          <h2 style={{ fontSize: 'clamp(22px,5vw,36px)', fontWeight: 900, color: '#fff', margin: '0 0 6px' }}>{t('onboard.title')}</h2>
          <p style={{ color: 'rgba(255,255,255,0.24)', fontSize: 11 }}>{cat.desc}</p>
        </div>

        {/* Progress */}
        <div role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={CATS.length} style={{ display: 'flex', gap: 5, maxWidth: 260, margin: '0 auto 20px' }}>
          {CATS.map((c, i) => (
            <div key={c.key} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? c.accent : 'rgba(255,255,255,0.06)', boxShadow: i === step ? `0 0 6px ${c.accent}` : 'none', transition: 'all 0.4s' }} />
          ))}
        </div>

        {/* Tab switcher */}
        <div role="tablist" aria-label="Categories" style={{ display: 'flex', gap: 5, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 18 }}>
          {CATS.map((c, i) => (
            <button key={c.key} role="tab" aria-selected={i === step} onClick={() => setStep(i)}
              style={{ padding: '5px 14px', borderRadius: 100, border: `1px solid ${i === step ? c.accent + '48' : 'rgba(255,255,255,0.06)'}`, background: i === step ? `${c.accent}0e` : 'transparent', color: i === step ? c.accent : 'rgba(255,255,255,0.2)', fontSize: 9, fontWeight: 800, letterSpacing: 2, cursor: 'pointer', transition: 'all 0.2s' }}>
              {c.label.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span aria-live="polite" style={{ color: 'rgba(255,255,255,0.2)', fontSize: 10, fontFamily: 'IBM Plex Mono,monospace' }}>
            {t('onboard.selected', { count: sel[cat.key].length, total: apps.length })}
          </span>
          <button onClick={toggleAll} aria-label={allSel ? t('onboard.deselect_all') : t('onboard.select_all')} style={{ padding: '4px 13px', borderRadius: 6, border: `1px solid ${cat.accent}28`, background: `${cat.accent}08`, color: cat.accent, fontSize: 9, fontWeight: 800, letterSpacing: 1, cursor: 'pointer' }}>
            {allSel ? t('onboard.deselect_all') : t('onboard.select_all')}
          </button>
        </div>

        {/* Grid */}
        <div role="group" aria-label="Available apps" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(105px,1fr))', gap: 8, marginBottom: 26 }}>
          {apps.map(app => {
            const s = isSel(app.id);
            return (
              <div key={app.id} role="checkbox" aria-checked={s} aria-label={app.name} tabIndex={0} onClick={() => toggle(app.id)}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), toggle(app.id))}
                style={{ padding: '16px 7px 12px', borderRadius: 15, background: s ? `${app.color}0c` : 'rgba(255,255,255,0.02)', border: s ? `1px solid ${app.color}42` : '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', textAlign: 'center', position: 'relative', boxShadow: s ? `0 0 18px ${app.color}12` : 'none', transition: 'border-color 0.15s,background 0.15s,box-shadow 0.15s' }}
                onMouseEnter={e => { if (!s) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
                onMouseLeave={e => { if (!s) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; } }}>
                {s && <div aria-hidden="true" style={{ position: 'absolute', top: 5, right: 5, width: 15, height: 15, borderRadius: '50%', background: app.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, color: '#000', fontWeight: 900 }}>✓</div>}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 7 }}><AppIcon app={app} size={40} /></div>
                <div style={{ fontSize: 9, fontWeight: 700, color: s ? '#fff' : 'rgba(255,255,255,0.35)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{app.name}</div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button id="onboard-next-btn" onClick={next}
            style={{ padding: '14px 50px', borderRadius: 13, background: `linear-gradient(135deg,${cat.accent},#9D4EDD)`, border: 'none', color: '#06060A', fontWeight: 900, fontSize: 11, letterSpacing: 3, cursor: 'pointer', textTransform: 'uppercase', transition: 'all 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = `0 0 50px ${cat.accent}40`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}>
            {step < CATS.length - 1 ? t('onboard.next', { label: CATS[step + 1].label.toUpperCase() }) : t('onboard.launch')}
          </button>
        </div>
      </div>
    </div>
  );
}
