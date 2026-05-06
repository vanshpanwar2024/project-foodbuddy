import type { NutritionComparison as NutritionComparisonType } from "@/types";

const nutritionFields = ["calories", "protein", "sugar", "fat"] as const;

type NutritionComparisonProps = {
  comparison: NutritionComparisonType;
};

export const NutritionComparison = ({
  comparison,
}: NutritionComparisonProps) => (
  <div className="grid gap-4 md:grid-cols-2">
    <div className="space-y-2 rounded-2xl border border-emerald-100/60 bg-emerald-50/20 p-4">
      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        Current meal
      </div>
      {nutritionFields.map((field) => (
        <div key={field} className="flex items-center justify-between text-sm">
          <span className="capitalize text-muted-foreground">{field}</span>
          <span className="text-foreground">{comparison.current[field]}</span>
        </div>
      ))}
    </div>
    <div className="space-y-2 rounded-2xl border border-emerald-100/60 bg-emerald-50/20 p-4">
      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        Healthier swap
      </div>
      {nutritionFields.map((field) => (
        <div key={field} className="flex items-center justify-between text-sm">
          <span className="capitalize text-muted-foreground">{field}</span>
          <span className="text-foreground">{comparison.swap[field]}</span>
        </div>
      ))}
    </div>
  </div>
);
