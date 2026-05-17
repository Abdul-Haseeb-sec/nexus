const DB_USERS = 'nexus_elite_users';

// Simulated backend delay
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const authService = {
  async register({ email, username, password }) {
    await delay(800);
    const users = JSON.parse(window.localStorage.getItem(DB_USERS) || '{}');
    
    // Check if email or username exists
    for (const [id, u] of Object.entries(users)) {
      if (u.email === email) throw new Error("Email already registered.");
      if (u.username === username) throw new Error("Username taken.");
    }

    const tag = "@" + username.toLowerCase().replace(/[^a-z0-9_.]/g, "").slice(0, 15);
    const id = "usr_" + Date.now().toString(36);
    
    // In a real app, password would be hashed. We simulate real auth here.
    const newUser = { id, email, username, tag, password, joined: new Date().toISOString() };
    users[id] = newUser;
    window.localStorage.setItem(DB_USERS, JSON.stringify(users));
    
    const { password: _, ...safeUser } = newUser;
    return safeUser;
  },

  async login({ loginId, password }) {
    await delay(600);
    const users = JSON.parse(window.localStorage.getItem(DB_USERS) || '{}');
    
    for (const u of Object.values(users)) {
      if ((u.email === loginId || u.username === loginId) && u.password === password) {
        const { password: _, ...safeUser } = u;
        return safeUser;
      }
    }
    throw new Error("Invalid credentials.");
  }
};
