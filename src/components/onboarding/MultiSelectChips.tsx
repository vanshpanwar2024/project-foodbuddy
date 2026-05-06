import { cn } from "@/lib/utils";

type MultiSelectChipsProps = {
  options: string[];
  values: string[];
  onChange: (next: string[]) => void;
};

export const MultiSelectChips = ({
  options,
  values,
  onChange,
}: MultiSelectChipsProps) => (
  <div className="flex flex-wrap gap-2">
    {options.map((option) => {
      const active = values.includes(option);
      return (
        <button
          key={option}
          type="button"
          onClick={() => {
            const next = active
              ? values.filter((item) => item !== option)
              : [...values, option];
            onChange(next);
          }}
          className={cn(
            "rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/70 transition",
            "hover:border-white/30 hover:text-white",
            active && "border-sky-300/60 bg-white/20 text-white"
          )}
        >
          {option}
        </button>
      );
    })}
  </div>
);
