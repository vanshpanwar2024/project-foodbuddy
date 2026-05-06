import { Progress } from "@/components/ui/progress";

type HealthScoreProps = {
  score: number;
};

export const HealthScore = ({ score }: HealthScoreProps) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        Health score
      </span>
      <span className="text-lg font-semibold text-foreground">{score}</span>
    </div>
    <Progress value={score} />
  </div>
);
