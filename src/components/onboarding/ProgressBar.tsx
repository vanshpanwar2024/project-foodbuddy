import { cn } from "@/lib/utils";

type ProgressBarProps = {
  value: number;
  className?: string;
};

export const ProgressBar = ({ value, className }: ProgressBarProps) => (
  <div className={cn("h-2 w-full rounded-full bg-emerald-100/70", className)}>
    <div
      className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-green-400 to-lime-400 transition-all"
      style={{ width: `${value}%` }}
    />
  </div>
);
