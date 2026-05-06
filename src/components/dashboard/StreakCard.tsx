import { Flame, ShieldCheck } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type StreakCardProps = {
  streak: number;
};

export const StreakCard = ({ streak }: StreakCardProps) => (
  <Card className="glass-panel border-emerald-100/60 bg-emerald-50/40 text-foreground">
    <CardHeader>
      <CardTitle className="text-sm text-muted-foreground">Habit streaks</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center gap-3">
        <Flame className="h-5 w-5 text-amber-300" />
        <div className="text-3xl font-semibold">{streak} days</div>
      </div>
      <div className="flex flex-wrap gap-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-100">
          <ShieldCheck className="h-3.5 w-3.5" /> Healthy week badge
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/30 bg-sky-300/10 px-3 py-1 text-xs font-semibold text-sky-100">
          <Flame className="h-3.5 w-3.5" /> Momentum boost
        </div>
      </div>
    </CardContent>
  </Card>
);
