import React from 'react';
import { Home, Calendar, Users, FileText, Globe } from 'lucide-react';

export default function BottomNav({ theme, activeTab, setTab, playHoverSound, t }) {
  const navItems = [
    { id: 'home', icon: Home, labelKey: 'dashboard.apps', label: 'Apps' },
    { id: 'calendar', icon: Calendar, labelKey: 'dashboard.calendar', label: 'Calendar' },
    { id: 'friends', icon: Users, labelKey: 'dashboard.friends', label: 'Friends' },
    { id: 'secretary', icon: FileText, labelKey: 'dashboard.secretary', label: 'Tasks' },
    { id: 'news', icon: Globe, labelKey: 'dashboard.news', label: 'News' }
  ];

  return (
    <nav className="nexus-bottom-nav" style={{ background: theme.nav }}>
      <div className="nexus-bottom-nav-inner">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                playHoverSound();
                setTab(item.id);
              }}
              className={`nexus-bottom-nav-item ${isActive ? 'active' : ''}`}
              style={{ color: isActive ? theme.acc : '#71717A' }}
              aria-label={t(item.labelKey) || item.label}
              tabIndex={0}
            >
              <Icon size={24} color={isActive ? theme.acc : '#71717A'} />
              <span style={{ fontSize: 10, marginTop: 4 }}>{t(item.labelKey) || item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
