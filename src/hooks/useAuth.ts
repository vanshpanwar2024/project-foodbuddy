"use client";

import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import type { AuthUser } from "@/types";
import { auth } from "@/lib/firebase";

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(
        currentUser
          ? {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              email: currentUser.email,
              photoURL: currentUser.photoURL,
              isAnonymous: currentUser.isAnonymous,
            }
          : null
      );
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};
