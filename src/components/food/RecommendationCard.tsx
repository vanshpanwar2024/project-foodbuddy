"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Sparkles } from "lucide-react";

import { HealthScore } from "@/components/food/HealthScore";
import { NutritionComparison } from "@/components/food/NutritionComparison";
import { QuickTips } from "@/components/food/QuickTips";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FoodRecommendation } from "@/types";

type RecommendationCardProps = {
  recommendation: FoodRecommendation;
};

export const RecommendationCard = ({
  recommendation,
}: RecommendationCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    <Card className="glass-panel border-emerald-100/60 bg-emerald-50/40 text-foreground">
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <Sparkles className="h-4 w-4" /> Smart recommendation
        </div>
        <CardTitle className="text-2xl text-foreground">
          Best choice: {recommendation.bestChoice}
        </CardTitle>
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          <BadgeCheck className="h-3.5 w-3.5" />
          Healthier swap: {recommendation.healthierSwap}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-sm text-muted-foreground">{recommendation.explanation}</p>
        <HealthScore score={recommendation.healthScore} />
        <NutritionComparison comparison={recommendation.nutritionComparison} />
        <QuickTips tip={recommendation.quickTip} />
      </CardContent>
    </Card>
  </motion.div>
);
