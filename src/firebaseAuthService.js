import { auth, db } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const firebaseAuthService = {
  async register({ email, username, password }) {
    try {
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const tag = "@" + username.toLowerCase().replace(/[^a-z0-9_.]/g, "").slice(0, 15);
      
      // 2. Store user profile in Firestore database
      const userProfile = {
        id: user.uid,
        email: user.email,
        username,
        tag,
        joined: new Date().toISOString()
      };
      
      await setDoc(doc(db, "users", user.uid), userProfile);
      return userProfile;
      
    } catch (error) {
      if (error.code === 'auth/invalid-api-key') {
        throw new Error("Missing Firebase API Keys. Add them to .env to enable real database.");
      }
      if (error.code === 'auth/email-already-in-use') {
        throw new Error("This email is already registered. Please click 'Sign In' instead.");
      }
      if (error.code === 'auth/weak-password') {
        throw new Error("Password is too weak. It must be at least 6 characters.");
      }
      throw new Error(error.message.replace("Firebase: ", ""));
    }
  },

  async login({ email, password }) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Fetch user profile from Firestore
      const docSnap = await getDoc(doc(db, "users", user.uid));
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        // The user wiped their Firestore database but not their Firebase Auth!
        // We will seamlessly recover their profile to prevent them from getting stuck.
        const username = user.displayName ? user.displayName.replace(/\s+/g, '') : user.email.split('@')[0];
        const tag = "@" + username.toLowerCase().replace(/[^a-z0-9_.]/g, "").slice(0, 15);
        const userProfile = {
          id: user.uid,
          email: user.email,
          username,
          tag,
          joined: new Date().toISOString()
        };
        await setDoc(doc(db, "users", user.uid), userProfile);
        return userProfile;
      }
    } catch (error) {
      if (error.code === 'auth/invalid-api-key') {
        throw new Error("Missing Firebase API Keys. Add them to .env to enable real database.");
      }
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        throw new Error("Invalid email or password.");
      }
      throw new Error(error.message.replace("Firebase: ", ""));
    }
  },

  async loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const docSnap = await getDoc(doc(db, "users", user.uid));
      if (!docSnap.exists()) {
        const username = user.displayName ? user.displayName.replace(/\s+/g, '') : user.email.split('@')[0];
        const tag = "@" + username.toLowerCase().replace(/[^a-z0-9_.]/g, "").slice(0, 15);
        
        const userProfile = {
          id: user.uid,
          email: user.email,
          username,
          tag,
          joined: new Date().toISOString()
        };
        await setDoc(doc(db, "users", user.uid), userProfile);
        return userProfile;
      }
      return docSnap.data();
    } catch (error) {
      if (error.code === 'auth/invalid-api-key') {
        throw new Error("Missing Firebase API Keys. Add them to .env to enable real database.");
      }
      if (error.code === 'auth/popup-closed-by-user') {
        throw new Error("Sign-in cancelled.");
      }
      throw new Error(error.message.replace("Firebase: ", ""));
    }
  }
};
