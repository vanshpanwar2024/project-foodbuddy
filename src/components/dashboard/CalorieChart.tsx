"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CalorieChartProps = {
  data: Array<{ day: string; calories: number }>;
};

export const CalorieChart = ({ data }: CalorieChartProps) => (
  <Card className="glass-panel border-emerald-100/60 bg-emerald-50/40 text-foreground">
    <CardHeader>
      <CardTitle className="text-sm text-muted-foreground">Calorie trend</CardTitle>
    </CardHeader>
    <CardContent className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="day" stroke="rgba(16,185,129,0.5)" />
          <YAxis stroke="rgba(16,185,129,0.3)" />
          <Tooltip
            contentStyle={{
              background: "rgba(240,253,250,0.95)",
              border: "1px solid rgba(16,185,129,0.2)",
              borderRadius: 12,
              color: "#065f46",
            }}
          />
          <Line
            type="monotone"
            dataKey="calories"
            stroke="rgba(16,185,129,0.9)"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 0, fill: "rgba(16,185,129,1)" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);
