import { cn } from "@/lib/utils";

type SelectionCardProps = {
  title: string;
  description?: string;
  isSelected?: boolean;
  onClick?: () => void;
};

export const SelectionCard = ({
  title,
  description,
  isSelected,
  onClick,
}: SelectionCardProps) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "glass-panel flex w-full flex-col gap-1 rounded-2xl border border-emerald-100/80 p-4 text-left transition",
      "hover:border-emerald-200 hover:bg-emerald-50/70",
      isSelected && "border-emerald-400/60 bg-emerald-50"
    )}
  >
    <span className="text-sm font-semibold text-foreground">{title}</span>
    {description ? (
      <span className="text-xs text-muted-foreground">{description}</span>
    ) : null}
  </button>
);
