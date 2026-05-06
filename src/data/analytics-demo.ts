import type { FoodLog, Insight } from "@/types";
import { SAMPLE_RECOMMENDATION } from "@/data/mock";

const makeLog = (
  food: string,
  timeOfDay: string,
  mood: string,
  goal: string,
  score: number,
  timestamp: string
): FoodLog => ({
  uid: "demo",
  food,
  context: { timeOfDay, location: "Home", mood, goal },
  recommendation: {
    ...SAMPLE_RECOMMENDATION,
    healthScore: score,
  },
  healthScore: score,
  timestamp,
});

export const DEMO_LOGS = {
  weightLoss: [
    makeLog("burger and fries", "Evening", "Craving", "Lose weight", 58, "Today"),
    makeLog("salad", "Afternoon", "Hungry", "Lose weight", 82, "Yesterday"),
    makeLog("soda", "Late Night", "Stressed", "Lose weight", 52, "2024-05-01"),
  ],
  muscleGain: [
    makeLog("protein bowl", "Morning", "Hungry", "Gain muscle", 86, "Today"),
    makeLog("pasta alfredo", "Evening", "Craving", "Gain muscle", 62, "Yesterday"),
    makeLog("protein smoothie", "Afternoon", "Hungry", "Gain muscle", 80, "2024-05-02"),
  ],
  stressEater: [
    makeLog("ice cream", "Late Night", "Stressed", "Reduce sugar", 54, "Today"),
    makeLog("donut", "Morning", "Emotional", "Reduce sugar", 49, "Yesterday"),
    makeLog("coffee", "Afternoon", "Tired", "Improve energy", 70, "2024-05-03"),
  ],
};

export const DEMO_INSIGHTS: Record<string, Insight[]> = {
  weightLoss: [
    {
      type: "late-night-sugar",
      severity: "high",
      message:
        "Late-night sugary choices are common. Try a protein-forward snack to reduce cravings.",
      createdAt: new Date(),
    },
  ],
  muscleGain: [
    {
      type: "low-protein-lunch",
      severity: "medium",
      message:
        "Lunch protein dips mid-week. Add a lean protein to support muscle goals.",
      createdAt: new Date(),
    },
  ],
  stressEater: [
    {
      type: "stress-eating",
      severity: "high",
      message:
        "Stress-driven choices spiked. Keep a mindful snack ready for late nights.",
      createdAt: new Date(),
    },
  ],
};
