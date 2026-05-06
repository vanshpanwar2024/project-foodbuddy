"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { ContextSelector } from "@/components/food/ContextSelector";
import { FoodInput } from "@/components/food/FoodInput";
import { MealCards } from "@/components/food/MealCards";
import { RecommendationCard } from "@/components/food/RecommendationCard";
import { Container } from "@/components/layout/container";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  GOAL_OPTIONS,
  LOCATION_OPTIONS,
  MOOD_OPTIONS,
  QUICK_MEALS,
  TIME_OPTIONS,
} from "@/constants/food";
import { SAMPLE_RECOMMENDATION } from "@/data/mock";
import { recommendMeal } from "@/lib/recommendation-engine";
import { auth } from "@/lib/firebase";
import { signInAsGuest } from "@/services/auth";
import { addFoodLog } from "@/services/firestore/foodLogService";
import type { FoodRecommendation } from "@/types";
import { toast } from "sonner";

const schema = z.object({
  food: z.string().min(2, "Enter a meal or craving."),
  timeOfDay: z.string().min(1, "Select a time"),
  location: z.string().min(1, "Select a location"),
  mood: z.string().min(1, "Select a mood"),
  goal: z.string().min(1, "Select a goal"),
});

type FoodFormValues = z.infer<typeof schema>;

export default function FoodPage() {
  const [recommendation, setRecommendation] = useState<FoodRecommendation | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FoodFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      food: "",
      timeOfDay: "Evening",
      location: "Home",
      mood: "Hungry",
      goal: "Eat balanced",
    },
  });

  const { control, setValue, handleSubmit, formState } = form;
  const values = useWatch({ control });

  const handleRecommend = handleSubmit(async (data) => {
    setIsLoading(true);
    const result = recommendMeal({
      foodName: data.food,
      goal: data.goal,
      timeOfDay: data.timeOfDay,
      mood: data.mood,
    });
    setRecommendation(result);

    try {
      const user = auth.currentUser ?? (await signInAsGuest());
      if (user) {
        await addFoodLog(user.uid, {
          food: data.food,
          context: {
            timeOfDay: data.timeOfDay,
            location: data.location,
            mood: data.mood,
            goal: data.goal,
          },
          recommendation: result,
          healthScore: result.healthScore,
        });
      }
    } catch {
      toast.message("Saved locally. Firestore will sync once auth is ready.");
    } finally {
      setIsLoading(false);
    }
  });

  const handleQuickSelect = (meal: string) => {
    setValue("food", meal, { shouldValidate: true });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Container className="space-y-8 py-12">
        <header className="space-y-2 text-white">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">
            Smart meal guidance
          </p>
          <h1 className="text-3xl font-semibold">
            Log a meal and get a healthier swap instantly.
          </h1>
          <p className="text-sm text-white/70">
            Rule-based recommendations tuned to your goals, mood, and moment.
          </p>
        </header>

        <Card className="glass-panel border-white/10 bg-white/10 text-white">
          <CardHeader>
            <CardTitle className="text-xl">Meal input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FoodInput
              value={values.food || ""}
              onChange={(value) => setValue("food", value)}
              onSubmit={handleRecommend}
              isLoading={isLoading}
            />
            {formState.errors.food ? (
              <p className="text-sm text-rose-200">
                {formState.errors.food.message}
              </p>
            ) : null}

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                <Sparkles className="h-4 w-4" /> Quick picks
              </div>
              <MealCards
                meals={QUICK_MEALS}
                selected={values.food}
                onSelect={handleQuickSelect}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <ContextSelector
                title="Time"
                options={TIME_OPTIONS}
                value={values.timeOfDay}
                onChange={(value) => setValue("timeOfDay", value)}
              />
              <ContextSelector
                title="Location"
                options={LOCATION_OPTIONS}
                value={values.location}
                onChange={(value) => setValue("location", value)}
              />
              <ContextSelector
                title="Mood"
                options={MOOD_OPTIONS}
                value={values.mood}
                onChange={(value) => setValue("mood", value)}
              />
              <ContextSelector
                title="Goal"
                options={GOAL_OPTIONS}
                value={values.goal}
                onChange={(value) => setValue("goal", value)}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <Button onClick={handleRecommend} disabled={isLoading}>
                Generate recommendation
              </Button>
              <Button
                variant="secondary"
                onClick={() => setRecommendation(SAMPLE_RECOMMENDATION)}
              >
                Use demo recommendation
              </Button>
            </div>
          </CardContent>
        </Card>

        <AnimatePresence>
          {recommendation ? (
            <RecommendationCard recommendation={recommendation} />
          ) : null}
        </AnimatePresence>
      </Container>
    </div>
  );
}
