import { DARK, LIGHT } from './themeTokens';

export { DARK, LIGHT };

export const makeCSS = (dark) => `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { 
  background: ${dark ? '#000000' : '#FAFAFA'}; 
  color: ${dark ? '#EDEDED' : '#09090B'};
  transition: background 0.4s, color 0.4s; 
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@keyframes fadeUp { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }
@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
@keyframes scaleIn { from { opacity: 0; transform: scale(0.97) } to { opacity: 1; transform: scale(1) } }
@keyframes slideInRight { from { opacity: 0; transform: translateX(20px) } to { opacity: 1; transform: translateX(0) } }

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: ${dark ? '#27272A' : '#E4E4E7'}; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: ${dark ? '#3F3F46' : '#D4D4D8'}; }

input::placeholder, textarea::placeholder { color: ${dark ? '#52525B' : '#A1A1AA'}; }
input, textarea, select { 
  font-family: 'Inter', sans-serif; 
  outline: none; 
}
input:focus, textarea:focus, select:focus {
  border-color: ${dark ? '#52525B' : '#A1A1AA'} !important;
}

textarea { resize: none; }
button { font-family: 'Inter', sans-serif; }

.font-mono {
  font-family: 'JetBrains Mono', monospace;
}

.glass-panel {
  background: ${dark ? 'rgba(10,10,10,0.6)' : 'rgba(255,255,255,0.6)'};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid ${dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'};
}
`;
