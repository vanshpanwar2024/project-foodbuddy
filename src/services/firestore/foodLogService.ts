import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import type { FoodLog, FoodLogInput } from "@/types";

const COLLECTION_NAME = "food_logs";

export const addFoodLog = async (uid: string, data: FoodLogInput) => {
  await addDoc(collection(db, COLLECTION_NAME), {
    uid,
    ...data,
    timestamp: serverTimestamp(),
  });
};

export const listenToFoodLogs = (
  uid: string,
  onUpdate: (logs: FoodLog[]) => void
) => {
  const logsQuery = query(
    collection(db, COLLECTION_NAME),
    where("uid", "==", uid),
    orderBy("timestamp", "desc"),
    limit(10)
  );

  return onSnapshot(logsQuery, (snapshot) => {
    const logs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as FoodLog),
    }));
    onUpdate(logs);
  });
};
