import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

import { db } from "@/lib/firebase";
import type { UserProfile, UserProfileInput } from "@/types";

const COLLECTION_NAME = "userProfiles";

export const saveUserProfile = async (uid: string, data: UserProfileInput) => {
  const ref = doc(db, COLLECTION_NAME, uid);
  await setDoc(
    ref,
    {
      uid,
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
};

export const updateUserProfile = async (
  uid: string,
  data: Partial<UserProfileInput>
) => {
  const ref = doc(db, COLLECTION_NAME, uid);
  await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

export const fetchUserProfile = async (uid: string) => {
  const ref = doc(db, COLLECTION_NAME, uid);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as UserProfile;
};
