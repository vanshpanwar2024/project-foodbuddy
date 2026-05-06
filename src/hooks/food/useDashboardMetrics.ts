import { useMemo } from "react";

import { FOODS } from "@/data/foods";
import type { FoodLog } from "@/types";

const normalize = (value: string) => value.trim().toLowerCase();

const toDate = (value: unknown): Date | null => {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === "string") {
    if (value.toLowerCase() === "today") return new Date();
    if (value.toLowerCase() === "yesterday") {
      const date = new Date();
      date.setDate(date.getDate() - 1);
      return date;
    }
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
  if (typeof value === "object" && value && "toDate" in value) {
    const maybe = (value as { toDate: () => Date }).toDate();
    return maybe instanceof Date ? maybe : null;
  }
  return null;
};

const getFoodNutrition = (foodName: string) =>
  FOODS.find((food) => normalize(food.name) === normalize(foodName));

const getDailyKey = (date: Date) =>
  date.toLocaleDateString("en-US", { weekday: "short" });

export const useDashboardMetrics = (logs: FoodLog[]) =>
  useMemo(() => {
    const normalizedLogs = logs.map((log) => ({
      ...log,
      date: toDate(log.timestamp) ?? new Date(),
    }));

    const averageScore = normalizedLogs.length
      ? Math.round(
          normalizedLogs.reduce((acc, log) => acc + log.healthScore, 0) /
            normalizedLogs.length
        )
      : 0;

    const healthyCount = normalizedLogs.filter((log) => log.healthScore >= 70)
      .length;
    const unhealthyCount = normalizedLogs.length - healthyCount;

    const caloriesByDay = normalizedLogs.reduce<Record<string, number>>(
      (acc, log) => {
        const key = getDailyKey(log.date);
        const nutrition =
          getFoodNutrition(log.food) ?? log.recommendation.nutritionComparison.current;
        acc[key] = (acc[key] ?? 0) + nutrition.calories;
        return acc;
      },
      {}
    );

    const calorieTrend = Object.entries(caloriesByDay).map(([day, calories]) => ({
      day,
      calories,
    }));

    const streaks = normalizedLogs
      .map((log) => log.date)
      .sort((a, b) => b.getTime() - a.getTime())
      .reduce<Date[]>((unique, date) => {
        if (!unique.find((item) => item.toDateString() === date.toDateString())) {
          unique.push(date);
        }
        return unique;
      }, []);

    let currentStreak = 0;
    let streakBroken = false;
    for (let i = 0; i < streaks.length; i += 1) {
      if (streakBroken) break;
      const dayLogs = normalizedLogs.filter(
        (log) => log.date.toDateString() === streaks[i].toDateString()
      );
      const dayAvg =
        dayLogs.reduce((sum, log) => sum + log.healthScore, 0) / dayLogs.length;
      if (dayAvg >= 70) {
        currentStreak += 1;
      } else {
        streakBroken = true;
      }
    }

    return {
      averageScore,
      healthyCount,
      unhealthyCount,
      calorieTrend,
      currentStreak,
      totalLogs: normalizedLogs.length,
    };
  }, [logs]);
