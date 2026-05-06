export type NavLink = {
  label: string;
  href: string;
  disabled?: boolean;
};

export type InsightPoint = {
  name: string;
  score: number;
};

export type AuthUser = {
  uid: string;
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
  isAnonymous?: boolean;
};

export type DietaryPreference =
  | "vegetarian"
  | "vegan"
  | "non-vegetarian"
  | "gluten-free"
  | "keto"
  | "high-protein";

export type GoalPreference =
  | "lose weight"
  | "gain muscle"
  | "eat balanced"
  | "reduce sugar"
  | "improve energy";

export type OnboardingFormValues = {
  ageRange: string;
  gender?: string;
  activityLevel: string;
  dietaryPreferences: DietaryPreference[];
  goals: GoalPreference[];
  allergies: string;
  restrictions: string;
  budget: string;
};

export type UserProfile = OnboardingFormValues & {
  uid: string;
  createdAt: unknown;
  updatedAt?: unknown;
};

export type UserProfileInput = Omit<UserProfile, "uid" | "createdAt" | "updatedAt">;

export type FoodCategory =
  | "fast_food"
  | "beverage"
  | "healthy"
  | "dessert"
  | "snack"
  | "protein"
  | "breakfast";

export type FoodItem = {
  name: string;
  category: FoodCategory;
  calories: number;
  protein: number;
  sugar: number;
  fat: number;
  healthyAlternative: string;
};

export type NutritionSnapshot = {
  calories: number;
  protein: number;
  sugar: number;
  fat: number;
};

export type NutritionComparison = {
  current: NutritionSnapshot;
  swap: NutritionSnapshot;
};

export type FoodRecommendation = {
  bestChoice: string;
  healthierSwap: string;
  explanation: string;
  quickTip: string;
  healthScore: number;
  nutritionComparison: NutritionComparison;
};

export type RecommendationInput = {
  foodName: string;
  goal: string;
  timeOfDay: string;
  mood: string;
};

export type MealContext = {
  timeOfDay: string;
  location: string;
  mood: string;
  goal: string;
};

export type FoodLog = {
  id?: string;
  uid: string;
  food: string;
  context: MealContext;
  recommendation: FoodRecommendation;
  healthScore: number;
  timestamp: unknown;
};

export type FoodLogInput = Omit<FoodLog, "uid" | "timestamp" | "id">;

export type InsightSeverity = "low" | "medium" | "high";

export type Insight = {
  id?: string;
  uid?: string;
  type: string;
  message: string;
  severity: InsightSeverity;
  createdAt: unknown;
};

export type InsightInput = Omit<Insight, "id" | "uid" | "createdAt">;
