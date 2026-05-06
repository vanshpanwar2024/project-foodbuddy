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
import { nutritionTrend } from "@/data/insights";

export const NutritionTrend = () => (
  <Card className="glass-panel border-white/10 bg-white/5">
    <CardHeader>
      <CardTitle className="text-base">Weekly Alignment</CardTitle>
    </CardHeader>
    <CardContent className="h-60">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={nutritionTrend}>
          <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
          <YAxis stroke="rgba(255,255,255,0.3)" />
          <Tooltip
            contentStyle={{
              background: "rgba(15,23,42,0.9)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              color: "white",
            }}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="rgba(56,189,248,0.9)"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 0, fill: "rgba(56,189,248,1)" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);
