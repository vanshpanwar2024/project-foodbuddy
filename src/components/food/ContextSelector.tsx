import { cn } from "@/lib/utils";

type ContextSelectorProps = {
  title: string;
  options: string[];
  value?: string;
  onChange: (value: string) => void;
};

export const ContextSelector = ({
  title,
  options,
  value,
  onChange,
}: ContextSelectorProps) => (
  <div className="space-y-2">
    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{title}</p>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={cn(
            "rounded-full border border-emerald-100/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/70 transition",
            "hover:border-emerald-200/80 hover:text-foreground",
            option === value && "border-emerald-400/60 bg-emerald-50/80 text-emerald-900"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);
