"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/firebase";
import { setCookie, deleteCookie } from "@/utils/cookies";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

// Simple localStorage persistence helper functions
const saveToLocalStorage = (key, value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

const loadFromLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : null;
  }
  return null;
};

export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage if available
  const [user, setUser] = useState(() => loadFromLocalStorage("auth_user"));
  const [loading, setLoading] = useState(true);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      saveToLocalStorage("auth_user", user);
    } else {
      localStorage.removeItem("auth_user");
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Set user session cookie
        setCookie("user_session", firebaseUser.uid, {
          maxAge: 30 * 24 * 60 * 60, // 30 days
          path: "/",
          secure: process.env.NODE_ENV === "production",
        });

        let userData;

        // First, check if user is an admin
        try {
          const adminRef = doc(db, "admins", firebaseUser.uid);
          const adminDoc = await getDoc(adminRef);

          if (adminDoc.exists()) {
            // Set admin session cookie
            setCookie("admin_session", firebaseUser.uid, {
              maxAge: 30 * 24 * 60 * 60,
              path: "/",
              secure: process.env.NODE_ENV === "production",
            });

            // Set user state with admin role
            userData = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              role: "admin",
              ...adminDoc.data(),
            };

            // console.log(
            //   "Admin document exists. Setting user data with admin role:",
            //   userData
            // );

            // Update state
            setUser(userData);
            setLoading(false);
            return; // Exit early since we found admin status
          }
        } catch (adminError) {
          console.log(
            "Admin check error (this is expected if not admin):",
            adminError.message
          );
          // Continue to regular user check
        }

        // If we get here, not an admin or had error checking admin status
        // Try getting regular user data
        try {
          const userRef = doc(db, "users", firebaseUser.uid);
          const userDoc = await getDoc(userRef);

          userData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            role: "user",
            ...(userDoc.exists() ? userDoc.data() : {}),
          };
        } catch (userError) {
          console.error("Error checking user data:", userError);

          // Fallback to basic user data
          userData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            role: "user",
          };
        }

        // Update state
        setUser(userData);
      } else {
        // Clear user state
        setUser(null);

        // Clear cookies
        deleteCookie("user_session");
        deleteCookie("admin_session");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });

      // The onAuthStateChanged listener will handle updating the state
      return userCredential.user;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // The onAuthStateChanged listener will handle updating the state
      return userCredential.user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    // Clear cookies
    deleteCookie("user_session");
    deleteCookie("admin_session");

    // Clear user state
    setUser(null);

    // Sign out from Firebase
    await signOut(auth);
  };

  const updateUserProfile = (userData) => {
    setUser((currentUser) => ({
      ...currentUser,
      ...userData,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        loading,
        updateProfile: updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
