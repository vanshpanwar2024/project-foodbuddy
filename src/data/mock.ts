import type { FoodLog, FoodRecommendation } from "@/types";

export const SAMPLE_RECOMMENDATION: FoodRecommendation = {
  bestChoice: "grilled chicken bowl",
  healthierSwap: "salmon quinoa bowl",
  explanation:
    "Swapping to lean protein and whole grains cuts calories while boosting protein for steady energy.",
  quickTip: "Aim for half your plate to be veggies for late-day meals.",
  healthScore: 82,
  nutritionComparison: {
    current: { calories: 720, protein: 28, sugar: 6, fat: 34 },
    swap: { calories: 430, protein: 34, sugar: 5, fat: 14 },
  },
};

export const SAMPLE_LOGS: FoodLog[] = [
  {
    uid: "demo",
    food: "burger and fries",
    context: {
      timeOfDay: "Evening",
      location: "Restaurant",
      mood: "Craving",
      goal: "Lose weight",
    },
    recommendation: SAMPLE_RECOMMENDATION,
    healthScore: 62,
    timestamp: "Today",
  },
  {
    uid: "demo",
    food: "soda",
    context: {
      timeOfDay: "Afternoon",
      location: "Office",
      mood: "Tired",
      goal: "Reduce sugar",
    },
    recommendation: {
      ...SAMPLE_RECOMMENDATION,
      bestChoice: "sparkling water",
      healthierSwap: "sparkling water",
      healthScore: 88,
    },
    healthScore: 88,
    timestamp: "Yesterday",
  },
];
