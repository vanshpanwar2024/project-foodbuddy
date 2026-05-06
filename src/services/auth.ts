import { signInAnonymously, signInWithPopup, signOut } from "firebase/auth";

import { auth, googleProvider } from "@/lib/firebase";

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};

export const signInAsGuest = async () => {
  const result = await signInAnonymously(auth);
  return result.user;
};

export const signOutUser = async () => {
  await signOut(auth);
};
