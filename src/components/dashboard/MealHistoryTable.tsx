import type { FoodLog } from "@/types";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formatTimestamp = (value: unknown) => {
  if (!value) return "-";
  if (value instanceof Date) return value.toLocaleDateString();
  if (typeof value === "string") return value;
  if (typeof value === "object" && value && "toDate" in value) {
    const date = (value as { toDate: () => Date }).toDate();
    return date.toLocaleDateString();
  }
  return "-";
};

export const MealHistoryTable = ({ logs }: { logs: FoodLog[] }) => (
  <Card className="glass-panel border-emerald-100/60 bg-emerald-50/40 text-foreground">
    <CardHeader>
      <CardTitle className="text-sm text-muted-foreground">Meal history</CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      {logs.map((log) => (
        <div
          key={`${log.food}-${String(log.timestamp)}`}
          className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-100/60 bg-emerald-50/20 px-4 py-3 text-sm"
        >
          <div className="space-y-1">
            <div className="font-semibold text-foreground">{log.food}</div>
            <div className="text-xs text-muted-foreground/70">
              {log.context.timeOfDay} • {log.context.mood} • {log.context.goal}
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            {formatTimestamp(log.timestamp)} • Score {log.healthScore}
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
);
