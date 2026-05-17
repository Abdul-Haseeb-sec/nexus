import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { Eye, EyeOff, Mail, Lock, User, Zap, LogIn, UserPlus } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { firebaseAuthService as authService } from '../firebaseAuthService';

const InteractiveBear = ({ isBlind, smoothMouseX, smoothMouseY }) => {
  const headX = useTransform(smoothMouseX, [-0.5, 0.5], [-6, 6]);
  const headY = useTransform(smoothMouseY, [-0.5, 0.5], [-6, 6]);
  const eyeX = useTransform(smoothMouseX, [-0.5, 0.5], [-2, 2]);
  const eyeY = useTransform(smoothMouseY, [-0.5, 0.5], [-2, 2]);

  return (
    <div style={{ position: 'absolute', top: -85, left: '50%', transform: 'translateX(-50%) translateZ(40px)', width: 120, height: 120, zIndex: 200, pointerEvents: 'none' }}>
      <svg viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
        
        {/* Legs (Dangling and gently kicking) */}
        <motion.g animate={{ y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}>
          <rect x="35" y="75" width="10" height="25" rx="5" fill="#8B4513" />
          <circle cx="40" cy="100" r="6" fill="#A0522D" />
        </motion.g>
        <motion.g animate={{ y: [2, -2, 2] }} transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}>
          <rect x="55" y="75" width="10" height="25" rx="5" fill="#8B4513" />
          <circle cx="60" cy="100" r="6" fill="#A0522D" />
        </motion.g>

        {/* Body (Small and chubby) */}
        <ellipse cx="50" cy="75" rx="24" ry="20" fill="#A0522D" />
        <ellipse cx="50" cy="78" rx="14" ry="14" fill="#DEB887" />

        {/* Head (Big and Cute) */}
        <motion.g style={{ x: headX, y: headY }}>
          {/* Ears */}
          <circle cx="24" cy="22" r="14" fill="#A0522D" />
          <circle cx="24" cy="22" r="7" fill="#DEB887" />
          <circle cx="76" cy="22" r="14" fill="#A0522D" />
          <circle cx="76" cy="22" r="7" fill="#DEB887" />
          
          {/* Head Base */}
          <circle cx="50" cy="45" r="32" fill="#A0522D" />
          
          {/* Snout */}
          <ellipse cx="50" cy="54" rx="16" ry="12" fill="#DEB887" />
          <circle cx="50" cy="49" r="6" fill="#000" />
          <path d="M 50 55 L 50 58" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 44 58 Q 50 62 56 58" stroke="#000" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* Eyes */}
          <motion.g style={{ x: eyeX, y: eyeY }}>
            <circle cx="36" cy="38" r="5" fill="#000" />
            <circle cx="64" cy="38" r="5" fill="#000" />
            <circle cx="34" cy="36" r="2" fill="#fff" />
            <circle cx="62" cy="36" r="2" fill="#fff" />
          </motion.g>
        </motion.g>

        {/* Left Paw (Slides up to cover eye) */}
        <motion.g 
          animate={{ x: isBlind ? 12 : 0, y: isBlind ? -38 : 0 }} 
          transition={{ type: 'spring', stiffness: 120, damping: 15 }}
        >
          <circle cx="24" cy="76" r="11" fill="#A0522D" />
          <circle cx="24" cy="76" r="5" fill="#DEB887" opacity="0.8" />
        </motion.g>

        {/* Right Paw (Slides up to cover eye) */}
        <motion.g 
          animate={{ x: isBlind ? -12 : 0, y: isBlind ? -38 : 0 }} 
          transition={{ type: 'spring', stiffness: 120, damping: 15 }}
        >
          <circle cx="76" cy="76" r="11" fill="#A0522D" />
          <circle cx="76" cy="76" r="5" fill="#DEB887" opacity="0.8" />
        </motion.g>

      </svg>
    </div>
  )
};

export default function Auth({ onAuth }) {
  const { setUser } = useStore();
  
  // State for toggling panels
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  
  // Forms states
  const [signInForm, setSignInForm] = useState({ email: '', password: '' });
  const [signUpForm, setSignUpForm] = useState({ email: '', username: '', password: '' });
  
  const [err, setErr] = useState('');
  const [showPwdIn, setShowPwdIn] = useState(false);
  const [showPwdUp, setShowPwdUp] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Mascot logic
  const [pwdFocused, setPwdFocused] = useState(false);

  // Antigravity Interactive Background Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 40, stiffness: 100, mass: 2 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const bgX = useTransform(smoothMouseX, [-0.5, 0.5], [150, -150]);
  const bgY = useTransform(smoothMouseY, [-0.5, 0.5], [150, -150]);
  const cardX = useTransform(smoothMouseX, [-0.5, 0.5], [-20, 20]);
  const cardY = useTransform(smoothMouseY, [-0.5, 0.5], [-20, 20]);
  const cardRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [6, -6]);
  const cardRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-6, 6]);

  // Handlers
  const handleSignIn = async (e) => {
    e.preventDefault();
    setErr('');
    if (!signInForm.email || !signInForm.password) return setErr('Please fill all login fields');
    setLoading(true);
    try {
      const u = await authService.login(signInForm);
      if (onAuth) onAuth(u, false);
      else setUser(u);
    } catch (error) { setErr(error.message); }
    setLoading(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErr('');
    if (!signUpForm.email || !signUpForm.password || !signUpForm.username) return setErr('Please fill all registration fields');
    setLoading(true);
    try {
      const u = await authService.register(signUpForm);
      if (onAuth) onAuth(u, true);
      else setUser(u);
    } catch (error) { setErr(error.message); }
    setLoading(false);
  };

  const handleGoogleAuth = async () => {
    setErr(''); setLoading(true);
    try {
      const u = await authService.loginWithGoogle();
      if (onAuth) onAuth(u, false);
      else setUser(u);
    } catch (error) { setErr(error.message); }
    setLoading(false);
  };

  const togglePanel = (active) => {
    setErr('');
    setIsSignUpActive(active);
    // Clear forms to prevent visual bleeding
    setSignInForm({ email: '', password: '' });
    setSignUpForm({ email: '', username: '', password: '' });
  };

  return (
    <div onMouseMove={handleMouseMove} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', overflow: 'hidden', position: 'relative', fontFamily: "'Inter', sans-serif", perspective: 1500 }}>
      
      {/* Interactive Anti-Gravity Background */}
      <motion.div 
        style={{ 
          position: 'absolute', top: '50%', left: '50%', width: '150vw', height: '150vw', 
          marginLeft: '-75vw', marginTop: '-75vw', x: bgX, y: bgY,
          background: 'conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)', 
          filter: 'blur(150px)', opacity: 0.15, pointerEvents: 'none', 
          animation: 'spin 30s linear infinite' 
        }} 
      />

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        
        .auth-container {
          background-color: rgba(10, 10, 10, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 30px;
          box-shadow: 0 50px 100px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05);
          position: relative;
          overflow: hidden;
          width: 900px;
          max-width: 95vw;
          min-height: 600px;
          backdrop-filter: blur(60px);
          -webkit-backdrop-filter: blur(60px);
        }

        .auth-form-container {
          position: absolute;
          top: 0;
          height: 100%;
          transition: all 0.6s ease-in-out;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0 40px;
        }

        /* Sign In Panel */
        .auth-sign-in {
          left: 0;
          width: 50%;
          z-index: 2;
        }
        .auth-container.active .auth-sign-in {
          transform: translateX(100%);
          opacity: 0;
        }

        /* Sign Up Panel */
        .auth-sign-up {
          left: 0;
          width: 50%;
          opacity: 0;
          z-index: 1;
        }
        .auth-container.active .auth-sign-up {
          transform: translateX(100%);
          opacity: 1;
          z-index: 5;
          animation: auth-move 0.6s;
        }

        @keyframes auth-move {
          0%, 49.99% { opacity: 0; z-index: 1; }
          50%, 100% { opacity: 1; z-index: 5; }
        }

        /* Toggle Container Overlay */
        .auth-toggle-container {
          position: absolute;
          top: 0;
          left: 50%;
          width: 50%;
          height: 100%;
          overflow: hidden;
          transition: all 0.6s ease-in-out;
          border-radius: 150px 0 0 100px;
          z-index: 1000;
          box-shadow: -10px 0 30px rgba(0,0,0,0.5);
        }
        .auth-container.active .auth-toggle-container {
          transform: translateX(-100%);
          border-radius: 0 150px 100px 0;
          box-shadow: 10px 0 30px rgba(0,0,0,0.5);
        }

        /* Toggle Background */
        .auth-toggle {
          background: linear-gradient(135deg, rgba(42,138,246,0.9), rgba(168,83,186,0.9), rgba(233,42,103,0.9));
          backdrop-filter: blur(40px);
          color: #fff;
          position: relative;
          left: -100%;
          height: 100%;
          width: 200%;
          transform: translateX(0);
          transition: all 0.6s ease-in-out;
        }
        .auth-container.active .auth-toggle {
          transform: translateX(50%);
        }

        /* Toggle Inner Panels */
        .auth-toggle-panel {
          position: absolute;
          width: 50%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0 40px;
          text-align: center;
          top: 0;
          transform: translateX(0);
          transition: all 0.6s ease-in-out;
        }

        .auth-toggle-left {
          transform: translateX(-200%);
        }
        .auth-container.active .auth-toggle-left {
          transform: translateX(0);
        }

        .auth-toggle-right {
          right: 0;
          transform: translateX(0);
        }
        .auth-container.active .auth-toggle-right {
          transform: translateX(200%);
        }

        .auth-input {
          width: 100%;
          padding: 16px 16px 16px 48px;
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          color: #fff;
          font-size: 14px;
          outline: none;
          transition: all 0.3s ease;
          margin-bottom: 12px;
        }
        .auth-input:focus {
          border-color: rgba(255,255,255,0.3);
        }
        
        .social-btn {
          width: 100%;
          padding: 14px;
          background: rgba(255,255,255,0.03);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: all 0.3s ease;
          margin-bottom: 20px;
        }
        .social-btn:hover {
          background: rgba(255,255,255,0.08);
        }

        .submit-btn {
          width: 100%;
          padding: 16px;
          background: #fff;
          color: #000;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: transform 0.2s ease, opacity 0.2s;
        }
        .submit-btn:active {
          transform: scale(0.98);
        }
        
        .overlay-btn {
          padding: 14px 45px;
          background: transparent;
          color: #fff;
          border: 2px solid #fff;
          border-radius: 30px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .overlay-btn:hover {
          background: #fff;
          color: #000;
        }
      `}</style>

      {/* Main 3D Container */}
      <motion.div 
        style={{ position: 'relative', x: cardX, y: cardY, rotateX: cardRotateX, rotateY: cardRotateY, transformStyle: 'preserve-3d' }}
      >
        <InteractiveBear isBlind={pwdFocused} smoothMouseX={smoothMouseX} smoothMouseY={smoothMouseY} />
        
        <div className={`auth-container ${isSignUpActive ? 'active' : ''}`}>
          
          {/* SIGN UP FORM */}
          <div className="auth-form-container auth-sign-up">
            <h1 style={{ fontSize: 36, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Create Account</h1>
            
            <button type="button" onClick={handleGoogleAuth} disabled={loading} className="social-btn">
              <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Sign Up with Google
            </button>
            <span style={{ fontSize: 12, color: '#888', marginBottom: 16 }}>or register with email</span>

            <form onSubmit={handleSignUp} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative' }}>
                <User size={18} color="#666" style={{ position: 'absolute', left: 16, top: 16 }} />
                <input type="text" name="signup_username" autoComplete="off" value={signUpForm.username} onChange={e => setSignUpForm(p => ({...p, username: e.target.value}))} onFocus={() => setPwdFocused(false)} placeholder="Username" className="auth-input" />
              </div>
              <div style={{ position: 'relative' }}>
                <Mail size={18} color="#666" style={{ position: 'absolute', left: 16, top: 16 }} />
                <input type="email" name="signup_email" autoComplete="off" value={signUpForm.email} onChange={e => setSignUpForm(p => ({...p, email: e.target.value}))} onFocus={() => setPwdFocused(false)} placeholder="Email" className="auth-input" />
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={18} color="#666" style={{ position: 'absolute', left: 16, top: 16 }} />
                <input type={showPwdUp ? 'text' : 'password'} name="signup_password" value={signUpForm.password} onChange={e => setSignUpForm(p => ({...p, password: e.target.value}))} onFocus={() => setPwdFocused(true)} onBlur={() => setPwdFocused(false)} placeholder="Password" className="auth-input" />
                <button type="button" onClick={() => setShowPwdUp(!showPwdUp)} style={{ position: 'absolute', right: 16, top: 16, background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>
                  {showPwdUp ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {err && isSignUpActive && <div style={{ color: '#ff453a', fontSize: 13, textAlign: 'center', marginBottom: 8, padding: 8, background: 'rgba(255, 69, 58, 0.1)', borderRadius: 8 }}>{err}</div>}

              <button type="submit" disabled={loading} className="submit-btn" style={{ opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Creating...' : 'Sign Up'} <UserPlus size={18} />
              </button>
            </form>
          </div>

          {/* SIGN IN FORM */}
          <div className="auth-form-container auth-sign-in">
            <h1 style={{ fontSize: 36, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Sign In</h1>
            
            <button type="button" onClick={handleGoogleAuth} disabled={loading} className="social-btn">
              <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Sign In with Google
            </button>
            <span style={{ fontSize: 12, color: '#888', marginBottom: 16 }}>or use your email account</span>

            <form onSubmit={handleSignIn} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative' }}>
                <Mail size={18} color="#666" style={{ position: 'absolute', left: 16, top: 16 }} />
                <input type="email" name="signin_email" autoComplete="off" value={signInForm.email} onChange={e => setSignInForm(p => ({...p, email: e.target.value}))} onFocus={() => setPwdFocused(false)} placeholder="Email" className="auth-input" />
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={18} color="#666" style={{ position: 'absolute', left: 16, top: 16 }} />
                <input type={showPwdIn ? 'text' : 'password'} name="signin_password" value={signInForm.password} onChange={e => setSignInForm(p => ({...p, password: e.target.value}))} onFocus={() => setPwdFocused(true)} onBlur={() => setPwdFocused(false)} placeholder="Password" className="auth-input" />
                <button type="button" onClick={() => setShowPwdIn(!showPwdIn)} style={{ position: 'absolute', right: 16, top: 16, background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>
                  {showPwdIn ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {err && !isSignUpActive && <div style={{ color: '#ff453a', fontSize: 13, textAlign: 'center', marginBottom: 8, padding: 8, background: 'rgba(255, 69, 58, 0.1)', borderRadius: 8 }}>{err}</div>}

              <button type="submit" disabled={loading} className="submit-btn" style={{ opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Authenticating...' : 'Sign In'} <LogIn size={18} />
              </button>
            </form>
          </div>

          {/* TOGGLE OVERLAY CONTAINER */}
          <div className="auth-toggle-container">
            <div className="auth-toggle">
              
              {/* Overlay Content Left (Seen when active: Sign Up) */}
              <div className="auth-toggle-panel auth-toggle-left">
                <Zap size={48} color="#fff" fill="#fff" style={{ marginBottom: 20, filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.3))' }} />
                <h1 style={{ fontSize: 36, fontWeight: 800, textShadow: '0 5px 15px rgba(0,0,0,0.3)' }}>Welcome Back!</h1>
                <p style={{ fontSize: 15, margin: '20px 0', lineHeight: 1.6, opacity: 0.9 }}>Enter your personal details to access all the features of the Nexus OS workspace.</p>
                <button className="overlay-btn" onClick={() => togglePanel(false)}>Sign In</button>
              </div>

              {/* Overlay Content Right (Seen when inactive: Sign In) */}
              <div className="auth-toggle-panel auth-toggle-right">
                <Zap size={48} color="#fff" fill="#fff" style={{ marginBottom: 20, filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.3))' }} />
                <h1 style={{ fontSize: 36, fontWeight: 800, textShadow: '0 5px 15px rgba(0,0,0,0.3)' }}>Hello, Friend!</h1>
                <p style={{ fontSize: 15, margin: '20px 0', lineHeight: 1.6, opacity: 0.9 }}>Register your digital identity to begin your journey within our premium ecosystem.</p>
                <button className="overlay-btn" onClick={() => togglePanel(true)}>Sign Up</button>
              </div>

            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
