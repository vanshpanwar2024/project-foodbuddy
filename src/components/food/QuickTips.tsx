import { Lightbulb } from "lucide-react";

type QuickTipsProps = {
  tip: string;
};

export const QuickTips = ({ tip }: QuickTipsProps) => (
  <div className="flex items-start gap-3 rounded-2xl border border-emerald-100/60 bg-emerald-50/20 p-4 text-sm text-muted-foreground">
    <Lightbulb className="mt-0.5 h-4 w-4 text-muted-foreground" />
    <span>{tip}</span>
  </div>
);
