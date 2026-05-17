import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../store';
import { LayoutGrid, Calendar as CalIcon, FileText, Users, Globe } from 'lucide-react';
import Calendar from './Calendar';
import Secretary from './Secretary';
import Friends from './Friends';
import { ALL_APPS, CATS } from '../data';
import { DARK, LIGHT } from '../theme';

// Extracted Components
import { useAudioEngine } from '../hooks/useAudioEngine';
import Sidebar from './Dashboard/Sidebar';
import SettingsModal from './Dashboard/SettingsModal';
import AddAppModal from './Dashboard/AddAppModal';
import NotificationsToast from './Dashboard/NotificationsToast';
import NewsTab from './Dashboard/NewsTab';
import HomeTab from './Dashboard/HomeTab';
import BottomNav from './Dashboard/BottomNav';

const TABS = [
  { id: 'home', icon: LayoutGrid, labelKey: 'dashboard.apps', label: 'Apps' },
  { id: 'calendar', icon: CalIcon, labelKey: 'dashboard.calendar', label: 'Calendar' },
  { id: 'secretary', icon: FileText, labelKey: 'dashboard.secretary', label: 'Secretary' },
  { id: 'friends', icon: Users, labelKey: 'dashboard.friends', label: 'Friends' },
  { id: 'news', icon: Globe, labelKey: 'dashboard.news', label: 'World News' },
];

export default function Dashboard({ onLogout }) {
// ... keeping standard hooks unchanged
  const { t } = useTranslation();
  const { 
    user, sel, custom, dark, setCustom, 
    themeColor, setThemeColor, soundEnabled, setSoundEnabled,
    soundProfile, setSoundProfile, volume, setVolume,
    allMute, setAllMute, focusMode, setFocusMode,
    notifications, addNotification, removeNotification, events
  } = useStore();
  
  const theme = { ...(dark ? DARK : LIGHT), acc: themeColor };

  const [tab, setTab] = useState('home');
  const [appModal, setAppModal] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState('appearance');
  const [newApp, setNewApp] = useState({ name: '', url: '' });
  const [realNews, setRealNews] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const { playHoverSound } = useAudioEngine();

  // Fetch Real News
  useEffect(() => {
    fetch('https://hn.algolia.com/api/v1/search?tags=front_page')
      .then(r => r.json())
      .then(d => {
        if(d.hits) setRealNews(d.hits.slice(0, 15));
      })
      .catch(e => console.log('News fetch error', e));
  }, []);

  // Live clock for sidebar
  useEffect(() => {
    const clockInterval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(clockInterval);
  }, []);

  // Request Notification Permission
  useEffect(() => {
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, []);

  // Calendar Event Alarms
  useEffect(() => {
    const int = setInterval(() => {
      const now = new Date();
      const currentDateStr = now.toISOString().split('T')[0];
      const currentTimeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      
      events.forEach(ev => {
        if (ev.date === currentDateStr && ev.time === currentTimeStr) {
          addNotification({
            id: 'cal_' + ev.id,
            appName: 'Calendar Alarm',
            title: ev.title,
            message: `Event starting now: ${ev.desc || ''}`,
            color: ev.color || '#3B82F6'
          });
          if (soundEnabled && !allMute) playHoverSound(true);
        }
      });
    }, 60000); // Check every minute
    return () => clearInterval(int);
  }, [events, addNotification, soundEnabled, allMute, playHoverSound]);

  // Clear notifications
  useEffect(() => {
    if (notifications.length > 0) {
      const latest = notifications[notifications.length - 1];
      const timer = setTimeout(() => {
        removeNotification(latest.id);
      }, 8000); // stay longer
      return () => clearTimeout(timer);
    }
  }, [notifications, removeNotification]);

  const getApps = (catKey) => {
    const fromCat = sel[catKey].map(id => {
      for (const list of Object.values(ALL_APPS)) { const f = list.find(a => a.id === id); if (f) return f; }
      return null;
    }).filter(Boolean);
    return [...fromCat, ...custom.filter(a => a.cat === catKey)];
  };

  const launch = (app) => { window.open(app.url, '_blank'); };

  const addApp = (catKey) => {
    if (!newApp.name || !newApp.url) return;
    const url = newApp.url.startsWith('http') ? newApp.url : 'https://' + newApp.url;
    let domain = ''; try { domain = new URL(url).hostname; } catch (e) { console.log(e); }
    setCustom([...custom, { id: 'c' + Date.now(), name: newApp.name, url, domain, color: themeColor, cat: catKey }]);
    setNewApp({ name: '', url: '' }); setAppModal(null);
  };

  const quickApps = [...getApps('socials'), ...getApps('work')].slice(0, 8);

  return (
    <div className="nexus-dashboard-layout" style={{ background: theme.bg, color: theme.text }}>
      
      <div className="nexus-sidebar">
        <Sidebar 
          theme={theme}
          quickApps={quickApps}
          launch={launch}
          playHoverSound={playHoverSound}
          focusMode={focusMode}
          setFocusMode={setFocusMode}
          allMute={allMute}
          setAllMute={setAllMute}
          currentTime={currentTime}
          onLogout={onLogout}
          setSettingsOpen={setSettingsOpen}
        />
      </div>

      {/* Main Content */}
      <main className="nexus-main-content" style={{ background: theme.bg }}>
        
        {/* Navigation Tabs (Hidden on mobile via CSS if we choose, but let's just keep it for now or hide if bottom nav is active) */}
        <div style={{ position: 'sticky', top: 0, zIndex: 50, background: theme.nav, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${theme.border}`, padding: '0 40px', display: 'flex', gap: 32, overflowX: 'auto' }}>
          {TABS.map(tb => {
            const Icon = tb.icon;
            const active = tab === tb.id;
            return (
              <button 
                key={tb.id} 
                onClick={() => { playHoverSound(); setTab(tb.id); }}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: 8, padding: '20px 0', 
                  border: 'none', background: 'transparent', color: active ? theme.text : theme.muted, 
                  fontSize: 14, fontWeight: 600, cursor: 'pointer',
                  borderBottom: active ? `2px solid ${theme.acc}` : '2px solid transparent',
                  transition: 'all 0.2s', position: 'relative'
                }}
              >
                <Icon size={18} color={active ? theme.acc : theme.muted} /> {t(tb.labelKey) || tb.label}
              </button>
            )
          })}
        </div>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 40px' }}>
          {tab === 'home' && (
            <HomeTab 
              theme={theme}
              CATS={CATS}
              getApps={getApps}
              setAppModal={setAppModal}
              launch={launch}
              playHoverSound={playHoverSound}
            />
          )}
          {tab === 'calendar' && <Calendar t={theme} playHoverSound={playHoverSound} />}
          {tab === 'secretary' && <Secretary t={theme} user={user} playHoverSound={playHoverSound} />}
          {tab === 'friends' && <Friends t={theme} user={user} playHoverSound={playHoverSound} />}
          {tab === 'news' && (
            <NewsTab theme={theme} realNews={realNews} playHoverSound={playHoverSound} />
          )}
        </div>
      </main>

      <BottomNav 
        theme={theme} 
        activeTab={tab} 
        setTab={setTab} 
        playHoverSound={playHoverSound} 
        t={t} 
      />

      <SettingsModal 
        theme={theme}
        settingsOpen={settingsOpen}
        setSettingsOpen={setSettingsOpen}
        settingsTab={settingsTab}
        setSettingsTab={setSettingsTab}
        themeColor={themeColor}
        setThemeColor={setThemeColor}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        soundProfile={soundProfile}
        setSoundProfile={setSoundProfile}
        playHoverSound={playHoverSound}
        volume={volume}
        setVolume={setVolume}
        focusMode={focusMode}
        setFocusMode={setFocusMode}
      />

      <AddAppModal 
        theme={theme}
        appModal={appModal}
        setAppModal={setAppModal}
        newApp={newApp}
        setNewApp={setNewApp}
        addApp={addApp}
      />

      <NotificationsToast 
        theme={theme}
        focusMode={focusMode}
        notifications={notifications}
        removeNotification={removeNotification}
      />
    </div>
  );
}
