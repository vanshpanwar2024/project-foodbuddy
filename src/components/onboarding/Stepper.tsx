import { cn } from "@/lib/utils";

type StepperProps = {
  steps: string[];
  activeStep: number;
};

export const Stepper = ({ steps, activeStep }: StepperProps) => (
  <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
    {steps.map((label, index) => (
      <span
        key={label}
        className={cn(
          "rounded-full border border-emerald-100/80 px-3 py-1",
          index === activeStep && "bg-emerald-50 text-emerald-900"
        )}
      >
        {label}
      </span>
    ))}
  </div>
);
