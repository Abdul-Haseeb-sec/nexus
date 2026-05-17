import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Shield, Zap } from 'lucide-react';
import { DARK as t } from '../theme';

export default function Landing({ onEnter }) {
  const { t: tr } = useTranslation();

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div
      role="main"
      style={{
        minHeight: '100vh',
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        color: '#fff'
      }}
    >
      {/* Subtle Background Glows */}
      <div style={{ position: 'absolute', top: '-10%', left: '20%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-20%', right: '10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)', filter: 'blur(120px)', zIndex: 0 }} />

      <motion.div 
        variants={container} 
        initial="hidden" 
        animate="show"
        style={{ zIndex: 10, textAlign: 'center', maxWidth: 800, padding: '0 24px' }}
      >
        <motion.div variants={item} style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <div style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 100, fontSize: 11, fontWeight: 500, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />
            NEXUS OS 2.0
          </div>
        </motion.div>

        <motion.h1 
          variants={item}
          style={{
            fontSize: 'clamp(48px, 8vw, 96px)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            margin: '0 0 24px 0',
            background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.5) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Your Digital Universe.
        </motion.h1>

        <motion.p 
          variants={item}
          style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: '#A1A1AA',
            fontWeight: 400,
            lineHeight: 1.5,
            maxWidth: 500,
            margin: '0 auto 48px auto'
          }}
        >
          A unified, high-performance workspace designed for elite productivity, seamless communication, and quiet luxury.
        </motion.p>

        <motion.div variants={item}>
          <button
            onClick={onEnter}
            style={{
              padding: '16px 32px',
              background: '#fff',
              color: '#000',
              border: 'none',
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              transition: 'transform 0.2s, opacity 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.opacity = '0.9'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.opacity = '1'; }}
          >
            {tr('enter')} <ArrowRight size={16} />
          </button>
        </motion.div>

        <motion.div variants={item} style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 80, flexWrap: 'wrap' }}>
          {[
            { icon: <Zap size={20} />, label: 'Ultra Fast' },
            { icon: <Globe size={20} />, label: 'Unified Apps' },
            { icon: <Shield size={20} />, label: 'End-to-End Secure' }
          ].map((feat, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#71717A', fontSize: 13, fontWeight: 500 }}>
              {feat.icon}
              {feat.label}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
