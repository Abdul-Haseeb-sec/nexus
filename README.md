# 🌌 NEXUS OS — Your Digital Universe. Centralized.

Welcome to **NEXUS OS**, a premium, state-of-the-art "Quiet Luxury" SaaS workstation designed to unify your digital assets, productivity toolkits, and real-time social workspaces into a single, cohesive, ultra-high-performance interface.

Inspired by premium physical design systems and ultra-sleek, clean aesthetics, NEXUS OS offers a clutter-free, real-time workspace that syncs seamlessly across devices.

---

## 🚀 Core Functionalities

### 1. **GX Control Panel (Elastic Sidebar)**
* **Edge-Hover Trigger**: A smart, invisible 16px sensor on the left edge of the screen reveals the side drawer dynamically on hover, collapsing gracefully when not in use to maximize active workspace.
* **Control Dashboard**: Integrated toggles for **Focus Mode** (mutes all system sounds and browser notification alerts) and **All Mute** (completely silences the custom micro-interaction acoustic system).
* **Live Aesthetic Clock**: A clean digital clock and calendar display updating down to the second.
* **Quick Launch Grid**: Displays a customized list of your most active daily applications for lightning-fast access.

### 2. **Real-Time Social Hub & Secure Direct Messages**
* **Global User Search**: Query the Firestore cloud database dynamically to find other NEXUS users using exact `@tag` lookups.
* **Friend Connections**: Form cloud-synced digital friendships.
* **Instant Encrypted Messaging**: Initiating a chat opens a dedicated, real-time channel (`onSnapshot` websocket connection) directly mapped to `chats/{chatId}/messages`. Messages update in milliseconds as users type and send.
* **Simulated Rich Presence**: Dynamic status tracking (e.g. *Listening to Spotify*, *Playing Valorant*, *Online*) mapping presence indicators based on user identity profiles.
* **Jitsi Video Integration**: Create instant encrypted group calls via Jitsi Meet in a single click.

### 3. **Integrated Productivity Suite**
* **Dynamic Apps Hub (Home)**: Pin, search, and categorize custom widgets, personal links, or workspace channels (Socials, Work, Games, Entertainment). Includes a premium Settings Command Center to append custom links seamlessly.
* **Real-Time Calendar**: A comprehensive event scheduler synced globally. Implements a client-side **60-Second Alarm Engine** that cross-references active events every minute, triggering system push notifications and glass chimes automatically.
* **The Secretary**: A clean workspace designed to instantly sync private Markdown notes and task checklists.

### 4. **Modern SaaS UI Engine**
* **Glassmorphism Design**: Backed by HSL tailored custom color systems, clean dark modes, conic-gradient interactive backgrounds, and heavy CSS backdrops.
* **Micro-Interaction Sound System**: Every button hover, card click, and navigation transition produces high-fidelity sound feedbacks. Users can choose between multiple acoustic profiles:
  * *Minimal Pop*
  * *Soft Swoosh*
  * *Mechanical Click*
  * *Glass Chime*
  * *Digital Wave*

---

## 🛠️ System Architecture & Tech Stack

NEXUS OS has been engineered from the ground up for developer speed, security, and extreme responsiveness:

* **Build Tooling:** Migrated from `create-react-app` to **Vite** for sub-second Hot Module Replacement (HMR) and optimized building.
* **State Management:** Powered by **Zustand**. All active states (settings, event sheets, workspace lists) are managed globally in a central, light, debounced state.
* **Database & Auth:** Supported by **Firebase Firestore & Authentication**. Implements secure authenticated sessions (supporting Google Auth and Password credentials) and handles real-time syncing.
* **Acoustics & UI Animations:** Engineered using a modular `useAudioEngine` architecture and **Framer Motion** physics-based animation models.
* **Mobile Responsiveness:** Uses pure Vanilla CSS media queries to dynamically swap the desktop left-panel sidebar for an iOS-inspired, thumb-friendly **Glassmorphic Bottom Navigation Bar** on mobile viewports.
* **Accessibility (A11y):** Optimized for screen readers and keyboard navigation using semantic markup, dedicated `aria-labels`, `aria-pressed` states, and modal `dialog` structures.

---

## 📂 Project Directory Structure

```bash
nexus/
├── public/                 # Static assets & public media files
├── src/
│   ├── components/         # Modular micro-components
│   │   ├── Dashboard/      # SettingsModal, Sidebar, BottomNav, NewsTab, HomeTab, AddAppModal
│   │   ├── Auth.jsx        # Glassmorphic 3D Sign In/Sign Up Panel with Interactive Mascot
│   │   ├── Calendar.jsx    # Real-time event tracking sheets
│   │   ├── Friends.jsx     # Social Hub panel (chat streams, user queries, friend lists)
│   │   └── Secretary.jsx   # Notebook grids & checklists
│   ├── hooks/
│   │   ├── useAudioEngine.js # decoupled sound feedback engine
│   │   └── useCloudSync.js   # Main Firestore real-time synchronization hook
│   ├── firebase.js         # Firebase client-side database config
│   ├── firebaseAuthService.js # Secure user session helper
│   ├── store.js            # Debounced global state manager (Zustand)
│   ├── index.css           # Global layout styles & mobile media queries
│   └── index.jsx           # App entry point
├── index.html              # Main HTML skeleton
├── vite.config.js          # Optimized bundler configuration
└── package.json            # Active project dependencies
```

---

## 🚦 Getting Started

### 1. Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 3. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application in the browser.

---

## 🔒 Firestore Security Rules
To secure the database, copy and paste the following rules into your **Firebase console -> Firestore Database -> Rules**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow logged-in users to search profile tags
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
      
      // Allow users to only read/write their own private settings and data
      match /{document=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
    
    // Allow users to read/write chats if their UID is part of the chatId string
    match /chats/{chatId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid in chatId.split('_');
    }
  }
}
```
