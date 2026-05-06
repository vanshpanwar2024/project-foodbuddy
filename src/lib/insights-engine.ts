import { FOODS } from "@/data/foods";
import type { FoodLog, Insight } from "@/types";

const normalize = (value: string) => value.trim().toLowerCase();

const findFood = (name: string) =>
  FOODS.find((food) => normalize(food.name) === normalize(name)) ?? null;

const countBy = <T>(items: T[], predicate: (item: T) => boolean) =>
  items.filter(predicate).length;

const getSugarScore = (log: FoodLog) => {
  const food = findFood(log.food);
  return food?.sugar ?? log.recommendation.nutritionComparison.current.sugar;
};

const getProteinScore = (log: FoodLog) => {
  const food = findFood(log.food);
  return food?.protein ?? log.recommendation.nutritionComparison.current.protein;
};

export const buildInsights = (logs: FoodLog[]): Insight[] => {
  if (!logs.length) return [];

  const insights: Insight[] = [];
  const lateNightLogs = logs.filter(
    (log) => normalize(log.context.timeOfDay) === "late night"
  );
  const sugaryLateNight = countBy(lateNightLogs, (log) => getSugarScore(log) > 20);

  if (lateNightLogs.length >= 2 && sugaryLateNight >= 2) {
    insights.push({
      type: "late-night-sugar",
      severity: "high",
      message:
        "You often consume sugary foods late at night. Consider a lighter, high-protein snack to reduce cravings.",
      createdAt: new Date(),
    });
  }

  const afternoonLogs = logs.filter(
    (log) => normalize(log.context.timeOfDay) === "afternoon"
  );
  const lowProteinLunch = countBy(afternoonLogs, (log) => getProteinScore(log) < 12);
  if (afternoonLogs.length >= 3 && lowProteinLunch >= 2) {
    insights.push({
      type: "low-protein-lunch",
      severity: "medium",
      message:
        "Protein intake is low around lunch time. Add a lean protein to keep energy stable.",
      createdAt: new Date(),
    });
  }

  const stressedLogs = logs.filter(
    (log) => normalize(log.context.mood) === "stressed"
  );
  const stressedUnhealthy = countBy(stressedLogs, (log) => log.healthScore < 70);
  if (stressedLogs.length >= 2 && stressedUnhealthy >= 2) {
    insights.push({
      type: "stress-eating",
      severity: "high",
      message:
        "Stress-related choices are trending less healthy. Try planning a calming snack ahead of time.",
      createdAt: new Date(),
    });
  }

  const sugaryLogs = countBy(logs, (log) => getSugarScore(log) > 25);
  if (sugaryLogs >= 3) {
    insights.push({
      type: "sugar-frequency",
      severity: "medium",
      message:
        "Sugary snacks show up often this week. Swap one for a lower-sugar alternative.",
      createdAt: new Date(),
    });
  }

  const unhealthyLogs = countBy(logs, (log) => log.healthScore < 65);
  if (unhealthyLogs >= 4) {
    insights.push({
      type: "unhealthy-pattern",
      severity: "high",
      message:
        "Unhealthy choices increased this week. Small swaps can lift your weekly score quickly.",
      createdAt: new Date(),
    });
  }

  return insights;
};
