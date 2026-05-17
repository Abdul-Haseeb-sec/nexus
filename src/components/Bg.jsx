import React from 'react';

export default function Bg({ accent, dark }) {
  const a = accent || (dark ? "#00E5FF" : "#0099BB");
  return (
    <>
      <div style={{ position:"fixed", inset:0, backgroundImage:`linear-gradient(${a}04 1px,transparent 1px),linear-gradient(90deg,${a}04 1px,transparent 1px)`, backgroundSize:"60px 60px", pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"fixed", top:"5%", right:"10%", width:440, height:440, borderRadius:"50%", background:`radial-gradient(circle,${a}07 0%,transparent 70%)`, filter:"blur(60px)", pointerEvents:"none", zIndex:0, animation:"f1 13s ease-in-out infinite" }} />
      <div style={{ position:"fixed", bottom:"8%", left:"4%", width:360, height:360, borderRadius:"50%", background:"radial-gradient(circle,rgba(157,78,221,0.07) 0%,transparent 70%)", filter:"blur(60px)", pointerEvents:"none", zIndex:0, animation:"f2 16s ease-in-out infinite" }} />
      <div style={{ position:"fixed", top:"40%", left:"40%", width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,107,157,0.04) 0%,transparent 70%)", filter:"blur(70px)", pointerEvents:"none", zIndex:0, animation:"f3 11s ease-in-out infinite" }} />
    </>
  );
}
