import Link from "next/link";

import { Button } from "@/components/ui/button";

export const DashboardHeader = () => (
  <header className="flex flex-wrap items-center justify-between gap-4">
    <div className="space-y-2">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground/60">
        Smart Food Choice Coach
      </p>
      <h1 className="text-3xl font-semibold text-foreground">Health Analytics</h1>
      <p className="text-sm text-muted-foreground">
        Real-time coaching metrics and habit intelligence.
      </p>
    </div>
    <Button asChild>
      <Link href="/food">Log a meal</Link>
    </Button>
  </header>
);
