"use client";

import { useEffect, useMemo, useState } from "react";

import { listenToFoodLogs } from "@/services/firestore/foodLogService";
import type { FoodLog } from "@/types";

export const useFoodLogs = (uid?: string) => {
  const [logs, setLogs] = useState<FoodLog[]>([]);

  useEffect(() => {
    if (!uid) return;

    const unsubscribe = listenToFoodLogs(uid, (nextLogs) => {
      setLogs(nextLogs);
    });

    return () => unsubscribe();
  }, [uid]);

  const loading = useMemo(() => Boolean(uid) && logs.length === 0, [uid, logs]);

  return { logs: uid ? logs : [], loading };
};
