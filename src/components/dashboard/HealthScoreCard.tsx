"use client";

import {
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type HealthScoreCardProps = {
  score: number;
  delta: number;
};

export const HealthScoreCard = ({ score, delta }: HealthScoreCardProps) => (
  <Card className="glass-panel border-emerald-100/60 bg-emerald-50/40 text-foreground">
    <CardHeader>
      <CardTitle className="text-sm text-muted-foreground">Weekly Health</CardTitle>
    </CardHeader>
    <CardContent className="flex items-center gap-6">
      <div className="h-28 w-28">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="70%"
            outerRadius="100%"
            data={[{ value: score }]}
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar dataKey="value" fill="url(#scoreGradient)" />
            <defs>
              <linearGradient id="scoreGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#6ee7b7" />
              </linearGradient>
            </defs>
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <div className="text-3xl font-semibold">{score}</div>
        <p className="text-xs text-muted-foreground">{delta >= 0 ? "+" : ""}{delta} vs last week</p>
      </div>
    </CardContent>
  </Card>
);
