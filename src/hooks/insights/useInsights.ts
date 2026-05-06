"use client";

import { useEffect, useMemo, useState } from "react";

import { listenToInsights } from "@/services/firestore/insightService";
import type { Insight } from "@/types";

export const useInsights = (uid?: string, fallback: Insight[] = []) => {
  const [insights, setInsights] = useState<Insight[]>(fallback);

  useEffect(() => {
    if (!uid) return;

    const unsubscribe = listenToInsights(uid, (nextInsights) => {
      setInsights(nextInsights);
    });

    return () => unsubscribe();
  }, [uid]);

  const active = useMemo(() => (uid ? insights : fallback), [fallback, insights, uid]);

  return { insights: active };
};
