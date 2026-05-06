import { Activity, Leaf, Sparkles } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type WeeklySummaryProps = {
  averageScore: number;
  healthyCount: number;
  totalLogs: number;
};

export const WeeklySummary = ({
  averageScore,
  healthyCount,
  totalLogs,
}: WeeklySummaryProps) => (
  <section className="grid gap-4 md:grid-cols-3">
    {[
      {
        title: "Average Score",
        value: averageScore,
        icon: Sparkles,
        note: "Weekly average",
      },
      {
        title: "Healthy Choices",
        value: `${healthyCount}/${totalLogs || 0}`,
        icon: Leaf,
        note: "Meals logged",
      },
      {
        title: "Consistency",
        value: `${Math.round((healthyCount / Math.max(totalLogs, 1)) * 100)}%`,
        icon: Activity,
        note: "Healthier balance",
      },
    ].map((metric) => {
      const Icon = metric.icon;
      return (
        <Card key={metric.title} className="glass-panel border-emerald-100/60 bg-emerald-50/20">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm text-muted-foreground">{metric.title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-semibold text-foreground">
              {metric.value}
            </div>
            <p className="text-xs text-muted-foreground/60">{metric.note}</p>
          </CardContent>
        </Card>
      );
    })}
  </section>
);
