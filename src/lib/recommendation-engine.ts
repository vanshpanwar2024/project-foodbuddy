import { FOODS } from "@/data/foods";
import type {
  FoodItem,
  FoodRecommendation,
  NutritionComparison,
  RecommendationInput,
} from "@/types";

const normalize = (value: string) => value.trim().toLowerCase();

const getFallbackFood = (name: string): FoodItem => ({
  name: normalize(name) || "custom meal",
  category: "snack",
  calories: 380,
  protein: 10,
  sugar: 12,
  fat: 14,
  healthyAlternative: "greek yogurt bowl",
});

const findFoodMatch = (foodName: string) => {
  const needle = normalize(foodName);
  return (
    FOODS.find((food) => normalize(food.name) === needle) ||
    FOODS.find((food) => needle.includes(normalize(food.name))) ||
    FOODS.find((food) => normalize(food.name).includes(needle)) ||
    null
  );
};

const buildAlternative = (food: FoodItem) => {
  const alt = FOODS.find(
    (item) => normalize(item.name) === normalize(food.healthyAlternative)
  );
  if (alt) {
    return alt;
  }

  return {
    ...food,
    name: food.healthyAlternative,
    calories: Math.max(120, Math.round(food.calories * 0.75)),
    sugar: Math.max(0, Math.round(food.sugar * 0.6)),
    fat: Math.max(0, Math.round(food.fat * 0.7)),
    protein: Math.round(food.protein * 1.2),
  } as FoodItem;
};

const scoreFood = (food: FoodItem, input: RecommendationInput) => {
  let score = 75;

  if (food.calories > 800) score -= 22;
  else if (food.calories > 600) score -= 15;
  else if (food.calories < 350) score += 6;

  if (food.sugar > 35) score -= 18;
  else if (food.sugar > 20) score -= 10;
  else if (food.sugar < 8) score += 4;

  if (food.protein < 10) score -= 8;
  else if (food.protein > 25) score += 8;

  if (food.category === "dessert" || food.category === "beverage") score -= 6;
  if (food.category === "healthy" || food.category === "protein") score += 6;

  const goal = normalize(input.goal);
  if (goal === "lose weight") {
    if (food.calories > 500) score -= 10;
    if (food.protein > 20) score += 4;
  }

  if (goal === "gain muscle") {
    if (food.protein < 20) score -= 12;
    if (food.protein > 30) score += 6;
  }

  if (goal === "reduce sugar" && food.sugar > 15) score -= 12;

  if (goal === "improve energy" && food.sugar > 20) score -= 6;

  const time = normalize(input.timeOfDay);
  if (time === "late night" && food.calories > 450) score -= 8;

  const mood = normalize(input.mood);
  if ((mood === "stressed" || mood === "emotional") && food.sugar > 18) {
    score -= 8;
  }

  return Math.min(95, Math.max(25, Math.round(score)));
};

const buildExplanation = (
  food: FoodItem,
  swap: FoodItem,
  input: RecommendationInput
) => {
  const messages = [];
  if (swap.calories < food.calories) {
    messages.push("Lower calories without sacrificing flavor.");
  }
  if (swap.protein > food.protein) {
    messages.push("Higher protein to keep you fuller longer.");
  }
  if (normalize(input.timeOfDay) === "late night") {
    messages.push("Lighter for late-night digestion.");
  }
  if (normalize(input.mood) === "stressed") {
    messages.push("More balanced macros to avoid sugar spikes.");
  }
  if (!messages.length) {
    messages.push("Balanced macro profile for steady energy.");
  }
  return messages.join(" ");
};

const buildTip = (food: FoodItem, input: RecommendationInput) => {
  const mood = normalize(input.mood);
  const goal = normalize(input.goal);
  if (mood === "craving") return "Pair cravings with a high-protein side.";
  if (mood === "stressed") return "Try a 5-minute pause before ordering.";
  if (goal === "reduce sugar") return "Swap sugary drinks for sparkling water.";
  if (food.protein < 12) return "Add a protein booster like chicken or tofu.";
  return "Aim for 2 colors of veggies on the plate.";
};

const buildNutritionComparison = (
  current: FoodItem,
  swap: FoodItem
): NutritionComparison => ({
  current: {
    calories: current.calories,
    protein: current.protein,
    sugar: current.sugar,
    fat: current.fat,
  },
  swap: {
    calories: swap.calories,
    protein: swap.protein,
    sugar: swap.sugar,
    fat: swap.fat,
  },
});

export const recommendMeal = (input: RecommendationInput): FoodRecommendation => {
  const food = findFoodMatch(input.foodName) ?? getFallbackFood(input.foodName);
  const swap = buildAlternative(food);

  const foodScore = scoreFood(food, input);
  const swapScore = scoreFood(swap, input);

  const bestChoice = swapScore > foodScore ? swap.name : food.name;

  return {
    bestChoice,
    healthierSwap: swap.name,
    explanation: buildExplanation(food, swap, input),
    quickTip: buildTip(food, input),
    healthScore: Math.max(foodScore, swapScore),
    nutritionComparison: buildNutritionComparison(food, swap),
  };
};
