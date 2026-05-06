import { useMemo, useState } from "react";

export const useOnboardingState = (totalSteps: number) => {
  const [step, setStep] = useState(0);

  const next = () => setStep((prev) => Math.min(prev + 1, totalSteps - 1));
  const back = () => setStep((prev) => Math.max(prev - 1, 0));
  const goTo = (index: number) => {
    setStep(Math.min(Math.max(index, 0), totalSteps - 1));
  };

  const progress = useMemo(
    () => ((step + 1) / totalSteps) * 100,
    [step, totalSteps]
  );

  return { step, next, back, goTo, progress };
};
