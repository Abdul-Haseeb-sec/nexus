import { create } from 'zustand';

const STORAGE_KEY = 'nexus_session_v4';

// Debounce utility — prevents excessive localStorage writes during rapid state changes
let saveTimer = null;
const debouncedSave = (fn) => {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(fn, 300);
};

export const useStore = create((set, get) => ({
  // ─── State ────────────────────────────────────────
  user: null,
  sel: { socials: [], work: [], games: [], entertainment: [] },
  custom: [],
  dark: true,
  events: [],
  notes: [],
  todos: [],
  friends: [],
  language: 'en',
  themeColor: '#3b82f6',
  soundEnabled: true,
  soundProfile: 'pop',
  volume: 0.5,
  allMute: false,
  focusMode: false,
  customSound: null,
  sidebarOpen: true,
  notifications: [],
  unreadCounts: {},

  // ─── Setters ──────────────────────────────────────
  setUser: (u) => { set({ user: u }); get().save(); },
  setSel: (s) => { set({ sel: s }); get().save(); },
  setCustom: (c) => { set({ custom: c }); get().save(); },
  setDark: (d) => { set({ dark: d }); get().save(); },
  setEvents: (e) => { set({ events: typeof e === 'function' ? e(get().events) : e }); get().save(); },
  setNotes: (n) => { set({ notes: typeof n === 'function' ? n(get().notes) : n }); get().save(); },
  setTodos: (t) => { set({ todos: typeof t === 'function' ? t(get().todos) : t }); get().save(); },
  setFriends: (f) => { set({ friends: typeof f === 'function' ? f(get().friends) : f }); get().save(); },
  setLanguage: (l) => { set({ language: l }); get().save(); },
  setThemeColor: (c) => { set({ themeColor: c }); get().save(); },
  setSoundEnabled: (s) => { set({ soundEnabled: s }); get().save(); },
  setSoundProfile: (p) => { set({ soundProfile: p }); get().save(); },
  setVolume: (v) => { set({ volume: v }); get().save(); },
  setAllMute: (m) => { set({ allMute: m }); get().save(); },
  setFocusMode: (f) => { set({ focusMode: f }); get().save(); },
  setCustomSound: (s) => { set({ customSound: s }); get().save(); },
  setSidebarOpen: (o) => { set({ sidebarOpen: o }); get().save(); },
  addNotification: (n) => set((state) => {
    const unread = { ...state.unreadCounts };
    if (n.appId) unread[n.appId] = (unread[n.appId] || 0) + 1;
    return { notifications: [...state.notifications, { ...n, id: Date.now() }], unreadCounts: unread };
  }),
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),
  clearUnread: (appId) => set((state) => {
    const unread = { ...state.unreadCounts };
    unread[appId] = 0;
    return { unreadCounts: unread };
  }),

  // ─── Persist ──────────────────────────────────────
  // ─── Persist to Firestore ─────────────────────────
  save: () => {
    debouncedSave(async () => {
      const state = get();
      if (!state.user?.id) return;
      try {
        const { sel, custom, dark, language, themeColor, soundEnabled, soundProfile, volume, allMute, focusMode, customSound, sidebarOpen } = state;
        const { doc, setDoc } = await import('firebase/firestore');
        const { db } = await import('./firebase');
        
        await setDoc(doc(db, "users", state.user.id, "settings", "prefs"), {
          sel, custom, dark, language, themeColor, soundEnabled, soundProfile, volume, allMute, focusMode, customSound, sidebarOpen
        }, { merge: true });
        
        // Also save arrays (events, notes, todos, friends) to a separate doc to avoid hitting 1MB limit on a single doc if they grow
        await setDoc(doc(db, "users", state.user.id, "data", "collections"), {
          events: state.events,
          notes: state.notes,
          todos: state.todos,
          friends: state.friends
        }, { merge: true });

      } catch (e) {
        console.error('Failed to save to cloud:', e);
      }
    });
  },

  // loadSession is now just an initializer for Auth. The actual data is synced via useCloudSync hook.
  loadSession: () => {
    // Session is handled by Firebase Auth listener in useCloudSync
  },

  logout: async () => {
    try {
      const { signOut } = await import('firebase/auth');
      const { auth } = await import('./firebase');
      await signOut(auth);
    } catch (e) { console.error('Sign out error', e); }
    
    set({
      user: null,
      sel: { socials: [], work: [], games: [], entertainment: [] },
      custom: [],
      events: [],
      notes: [],
      todos: [],
      friends: [],
      notifications: [],
      unreadCounts: {}
    });
  }
}));
