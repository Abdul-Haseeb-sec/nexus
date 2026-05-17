import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { CATS } from '../../data';

export default function AddAppModal({
  theme,
  appModal,
  setAppModal,
  newApp,
  setNewApp,
  addApp
}) {
  return (
    <AnimatePresence>
      {appModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} style={{ width: 440, background: theme.modal, border: `1px solid ${theme.border}`, borderRadius: 24, padding: 32, boxShadow: '0 40px 80px rgba(0,0,0,0.4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Add to {CATS.find(c => c.key === appModal)?.label}</h3>
              <button onClick={() => setAppModal(null)} style={{ background: theme.inp, border: `1px solid ${theme.border}`, color: theme.muted, cursor: 'pointer', width: 32, height: 32, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={16} /></button>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: theme.muted, marginBottom: 8 }}>App Name</label>
              <input value={newApp.name} onChange={e => setNewApp({...newApp, name: e.target.value})} placeholder="e.g. Netflix" style={{ width: '100%', padding: '14px 16px', background: theme.inp, border: `1px solid ${theme.border}`, borderRadius: 12, color: theme.text, fontSize: 15 }} />
            </div>
            <div style={{ marginBottom: 32 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: theme.muted, marginBottom: 8 }}>URL</label>
              <input value={newApp.url} onChange={e => setNewApp({...newApp, url: e.target.value})} placeholder="https://..." style={{ width: '100%', padding: '14px 16px', background: theme.inp, border: `1px solid ${theme.border}`, borderRadius: 12, color: theme.text, fontSize: 15 }} />
            </div>
            <button onClick={() => addApp(appModal)} style={{ width: '100%', padding: '16px', background: theme.acc, color: '#000', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
              Create Shortcut
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
