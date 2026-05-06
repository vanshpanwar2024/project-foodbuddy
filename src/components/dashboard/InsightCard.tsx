import { BadgeCheck, AlertTriangle, Sparkles } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Insight } from "@/types";

const severityMap = {
  low: { icon: Sparkles, label: "Low" },
  medium: { icon: BadgeCheck, label: "Medium" },
  high: { icon: AlertTriangle, label: "High" },
};

export const InsightCard = ({ insight }: { insight: Insight }) => {
  const config = severityMap[insight.severity];
  const Icon = config.icon;

  return (
    <Card className="glass-panel border-emerald-100/60 bg-emerald-50/40 text-foreground">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm text-muted-foreground">Behavior insight</CardTitle>
        <div className="inline-flex items-center gap-1 rounded-full border border-emerald-100/60 bg-emerald-50/60 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          <Icon className="h-3 w-3" /> {config.label}
        </div>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        {insight.message}
      </CardContent>
    </Card>
  );
};
