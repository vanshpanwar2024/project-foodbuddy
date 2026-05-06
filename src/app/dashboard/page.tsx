"use client";

import { useMemo, useState } from "react";

import { CalorieChart } from "@/components/dashboard/CalorieChart";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { HabitChart } from "@/components/dashboard/HabitChart";
import { HealthScoreCard } from "@/components/dashboard/HealthScoreCard";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { MealHistoryTable } from "@/components/dashboard/MealHistoryTable";
import { StreakCard } from "@/components/dashboard/StreakCard";
import { WeeklySummary } from "@/components/dashboard/WeeklySummary";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DEMO_INSIGHTS, DEMO_LOGS } from "@/data/analytics-demo";
import { buildInsights } from "@/lib/insights-engine";
import { useDashboardMetrics } from "@/hooks/food/useDashboardMetrics";
import { useFoodLogs } from "@/hooks/food/useFoodLogs";
import { useInsights } from "@/hooks/insights/useInsights";
import { useAuth } from "@/hooks/useAuth";

const profiles = [
  { key: "weightLoss", label: "Weight loss" },
  { key: "muscleGain", label: "Muscle gain" },
  { key: "stressEater", label: "Stress eater" },
] as const;

export default function DashboardPage() {
  const { user } = useAuth();
  const [demoProfile, setDemoProfile] = useState<(typeof profiles)[number]["key"]>(
    "weightLoss"
  );

  const { logs } = useFoodLogs(user?.uid);
  const demoLogs = DEMO_LOGS[demoProfile];
  const activeLogs = logs.length ? logs : demoLogs;
  const metrics = useDashboardMetrics(activeLogs);

  const fallbackInsights = useMemo(
    () => DEMO_INSIGHTS[demoProfile] ?? buildInsights(activeLogs),
    [activeLogs, demoProfile]
  );
  const { insights } = useInsights(user?.uid, fallbackInsights);

  return (
    <div className="space-y-10 text-white">
      <DashboardHeader />

      <div className="flex flex-wrap items-center gap-3">
        {profiles.map((profile) => (
          <Button
            key={profile.key}
            variant={demoProfile === profile.key ? "default" : "secondary"}
            onClick={() => setDemoProfile(profile.key)}
            size="sm"
          >
            {profile.label}
          </Button>
        ))}
      </div>

      <WeeklySummary
        averageScore={metrics.averageScore}
        healthyCount={metrics.healthyCount}
        totalLogs={metrics.totalLogs}
      />

      <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr_1fr]">
        <HealthScoreCard score={metrics.averageScore} delta={6} />
        <HabitChart
          healthy={metrics.healthyCount}
          unhealthy={metrics.unhealthyCount}
        />
        <StreakCard streak={metrics.currentStreak} />
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <CalorieChart data={metrics.calorieTrend} />
        <Card className="glass-panel border-white/10 bg-white/10 text-white">
          <CardHeader>
            <CardTitle className="text-sm text-white/70">Smart insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {insights.length ? (
              insights.map((insight) => (
                <InsightCard key={`${insight.type}-${String(insight.createdAt)}`} insight={insight} />
              ))
            ) : (
              <div className="text-sm text-white/60">
                Log more meals to unlock insights.
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      <MealHistoryTable logs={activeLogs} />
    </div>
  );
}
