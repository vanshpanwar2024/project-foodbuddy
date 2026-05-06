export const AGE_RANGES = [
  "18-24",
  "25-34",
  "35-44",
  "45-54",
  "55-64",
  "65+",
];

export const GENDERS = ["Female", "Male", "Non-binary", "Prefer not to say"];

export const ACTIVITY_LEVELS = [
  {
    value: "low",
    label: "Low",
    description: "Mostly seated routines",
  },
  {
    value: "moderate",
    label: "Moderate",
    description: "Light daily movement",
  },
  {
    value: "high",
    label: "High",
    description: "Active lifestyle",
  },
];

export const DIETARY_PREFERENCES = [
  "vegetarian",
  "vegan",
  "non-vegetarian",
  "gluten-free",
  "keto",
  "high-protein",
];

export const GOALS = [
  "lose weight",
  "gain muscle",
  "eat balanced",
  "reduce sugar",
  "improve energy",
];

export const BUDGETS = [
  { value: "flexible", label: "Flexible" },
  { value: "balanced", label: "Balanced" },
  { value: "budget", label: "Budget-focused" },
];

export const DEMO_PREFERENCES = {
  ageRange: "25-34",
  gender: "Prefer not to say",
  activityLevel: "moderate",
  dietaryPreferences: ["high-protein", "non-vegetarian"],
  goals: ["eat balanced", "improve energy"],
  allergies: "Peanuts",
  restrictions: "Low sodium",
  budget: "balanced",
};
