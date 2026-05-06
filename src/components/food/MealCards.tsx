import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

type MealCardsProps = {
  meals: string[];
  selected?: string;
  onSelect: (meal: string) => void;
};

export const MealCards = ({ meals, selected, onSelect }: MealCardsProps) => (
  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
    {meals.map((meal) => (
      <button
        key={meal}
        type="button"
        onClick={() => onSelect(meal)}
        className={cn(
          "glass-panel flex items-center justify-between rounded-2xl border border-emerald-100/60 px-4 py-3 text-sm font-semibold text-foreground/80 transition",
          "hover:border-emerald-200/80 hover:bg-emerald-50/70",
          selected?.toLowerCase() === meal.toLowerCase() &&
            "border-emerald-400/60 bg-emerald-50 text-emerald-900"
        )}
      >
        <span>{meal}</span>
        <Sparkles className="h-4 w-4 text-muted-foreground" />
      </button>
    ))}
  </div>
);
