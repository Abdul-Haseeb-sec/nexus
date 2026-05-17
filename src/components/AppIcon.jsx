import React, { useState } from "react";
import { getFavicon } from "../utils";
import { useStore } from "../store";

export default function AppIcon({ app, size = 44 }) {
  const [err, setErr] = useState(false);
  const sz = size;
  const { unreadCounts } = useStore();
  const unread = unreadCounts[app.id] || 0;

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div style={{ width:sz, height:sz, borderRadius:Math.round(sz*0.26), overflow:"hidden", background:"rgba(128,128,128,0.1)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
        {!err
          ? <img src={getFavicon(app.domain || "google.com")} onError={() => setErr(true)} style={{ width:sz*0.58, height:sz*0.58, objectFit:"contain" }} alt={app.name} />
          : <span style={{ fontSize:sz*0.36, fontWeight:900, color:app.color || "#fff", fontFamily:"'Exo 2',sans-serif" }}>{app.name[0]}</span>
        }
      </div>
      {unread > 0 && (
        <div style={{ 
          position: 'absolute', top: -4, right: -4, 
          background: '#EF4444', color: '#fff', 
          fontSize: Math.max(10, sz * 0.25), fontWeight: 800, 
          minWidth: sz * 0.45, height: sz * 0.45, borderRadius: sz * 0.25, 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)', border: '2px solid #000',
          padding: '0 4px'
        }}>
          {unread > 99 ? '99+' : unread}
        </div>
      )}
    </div>
  );
}
