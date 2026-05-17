import { useEffect } from 'react';
import { useStore } from '../store';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, collection } from 'firebase/firestore';

export function useCloudSync() {
  const { setUser, setSel, setCustom, setDark, setEvents, setNotes, setTodos, setFriends, setLanguage, setThemeColor, setSoundEnabled, setSoundProfile, setVolume, setAllMute, setFocusMode, setCustomSound, setSidebarOpen } = useStore();

  useEffect(() => {
    let unsubPrefs = () => {};
    let unsubData = () => {};

    const unsubAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        
        // 1. Sync Settings/Prefs
        unsubPrefs = onSnapshot(doc(db, 'users', uid, 'settings', 'prefs'), (docSnap) => {
          if (docSnap.exists()) {
            const d = docSnap.data();
            if (d.sel) setSel(d.sel);
            if (d.custom) setCustom(d.custom);
            if (d.dark !== undefined) setDark(d.dark);
            if (d.language) setLanguage(d.language);
            if (d.themeColor) setThemeColor(d.themeColor);
            if (d.soundEnabled !== undefined) setSoundEnabled(d.soundEnabled);
            if (d.soundProfile) setSoundProfile(d.soundProfile);
            if (d.volume !== undefined) setVolume(d.volume);
            if (d.allMute !== undefined) setAllMute(d.allMute);
            if (d.focusMode !== undefined) setFocusMode(d.focusMode);
            if (d.customSound !== undefined) setCustomSound(d.customSound);
            if (d.sidebarOpen !== undefined) setSidebarOpen(d.sidebarOpen);
          }
        });

        // 2. Sync Data Collections (Events, Notes, Todos, Friends)
        unsubData = onSnapshot(doc(db, 'users', uid, 'data', 'collections'), (docSnap) => {
          if (docSnap.exists()) {
            const d = docSnap.data();
            if (d.events) setEvents(d.events);
            if (d.notes) setNotes(d.notes);
            if (d.todos) setTodos(d.todos);
            if (d.friends) setFriends(d.friends);
          }
        });

      } else {
        // Logged out
        unsubPrefs();
        unsubData();
      }
    });

    return () => {
      unsubAuth();
      unsubPrefs();
      unsubData();
    };
  }, [setSel, setCustom, setDark, setLanguage, setThemeColor, setSoundEnabled, setSoundProfile, setVolume, setAllMute, setFocusMode, setCustomSound, setSidebarOpen, setEvents, setNotes, setTodos, setFriends]);
}
