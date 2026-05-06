"use client";

import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type HabitChartProps = {
  healthy: number;
  unhealthy: number;
};

export const HabitChart = ({ healthy, unhealthy }: HabitChartProps) => {
  const data = [
    { name: "Healthy", value: healthy, fill: "#10b981" },
    { name: "Unhealthy", value: unhealthy, fill: "#ef4444" },
  ];

  return (
    <Card className="glass-panel border-emerald-100/60 bg-emerald-50/40 text-foreground">
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">Choice balance</CardTitle>
      </CardHeader>
      <CardContent className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" innerRadius={55} outerRadius={80} />
            <Tooltip
              contentStyle={{
                background: "rgba(240,253,250,0.95)",
                border: "1px solid rgba(16,185,129,0.2)",
                borderRadius: 12,
                color: "#065f46",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 flex justify-center gap-4 text-xs text-muted-foreground">
          <span>Healthy: {healthy}</span>
          <span>Unhealthy: {unhealthy}</span>
        </div>
      </CardContent>
    </Card>
  );
};
