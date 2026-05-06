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
import type { Insight, InsightInput } from "@/types";

const COLLECTION_NAME = "insights";

export const addInsight = async (uid: string, insight: InsightInput) => {
  await addDoc(collection(db, COLLECTION_NAME), {
    uid,
    ...insight,
    createdAt: serverTimestamp(),
  });
};

export const listenToInsights = (
  uid: string,
  onUpdate: (insights: Insight[]) => void
) => {
  const insightsQuery = query(
    collection(db, COLLECTION_NAME),
    where("uid", "==", uid),
    orderBy("createdAt", "desc"),
    limit(6)
  );

  return onSnapshot(insightsQuery, (snapshot) => {
    const insights = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Insight),
    }));
    onUpdate(insights);
  });
};
