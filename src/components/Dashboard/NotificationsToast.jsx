import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function NotificationsToast({ theme, focusMode, notifications, removeNotification }) {
  if (focusMode) return null;

  return (
    <div style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 12, pointerEvents: 'none' }}>
      <AnimatePresence>
        {notifications.slice(-4).map(n => (
          <motion.div
            key={n.id}
            layout
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            style={{
              width: 320, background: 'rgba(20,20,20,0.85)', border: `1px solid rgba(255,255,255,0.1)`, 
              borderLeft: `4px solid ${n.color || theme.acc}`,
              borderRadius: 16, padding: 20, boxShadow: `0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)`,
              pointerEvents: 'auto', cursor: 'pointer', backdropFilter: 'blur(30px)'
            }}
            onClick={() => removeNotification(n.id)}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: n.color || theme.acc, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{n.appName}</div>
              <button style={{ background: 'none', border: 'none', color: theme.muted, cursor: 'pointer' }}><X size={14} /></button>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{n.title}</div>
            <div style={{ fontSize: 13, color: '#A1A1AA', lineHeight: 1.4 }}>{n.message}</div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
