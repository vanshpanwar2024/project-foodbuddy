"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { AnimatedStep } from "@/components/onboarding/AnimatedStep";
import { MultiSelectChips } from "@/components/onboarding/MultiSelectChips";
import { ProgressBar } from "@/components/onboarding/ProgressBar";
import { SelectionCard } from "@/components/onboarding/SelectionCard";
import { Stepper } from "@/components/onboarding/Stepper";
import { SummaryCard } from "@/components/onboarding/SummaryCard";
import { Container } from "@/components/layout/container";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ACTIVITY_LEVELS,
  AGE_RANGES,
  BUDGETS,
  DEMO_PREFERENCES,
  DIETARY_PREFERENCES,
  GENDERS,
  GOALS,
} from "@/constants/onboarding";
import { useOnboardingState } from "@/hooks/onboarding/useOnboardingState";
import { auth } from "@/lib/firebase";
import { signInAsGuest } from "@/services/auth";
import { saveUserProfile } from "@/services/firestore/userService";
import type { OnboardingFormValues } from "@/types";
import { toast } from "sonner";

const schema = z.object({
  ageRange: z.string().min(1, "Select an age range."),
  gender: z.string().optional(),
  activityLevel: z.string().min(1, "Select an activity level."),
  dietaryPreferences: z.array(z.string()).min(1, "Select preferences."),
  goals: z.array(z.string()).min(1, "Select goals."),
  allergies: z.string().optional(),
  restrictions: z.string().optional(),
  budget: z.string().min(1, "Select a budget preference."),
});

const steps = [
  "Welcome",
  "Basics",
  "Diet",
  "Goals",
  "Limits",
  "Summary",
];

export default function OnboardingPage() {
  const { step, next, back, goTo, progress } = useOnboardingState(steps.length);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      ageRange: "",
      gender: "",
      activityLevel: "",
      dietaryPreferences: [],
      goals: [],
      allergies: "",
      restrictions: "",
      budget: "",
    },
  });

  const { control, setValue, trigger, handleSubmit } = form;
  const values = useWatch({ control });

  const stepFields = useMemo(
    () => [
      [],
      ["ageRange", "gender", "activityLevel"],
      ["dietaryPreferences"],
      ["goals"],
      ["allergies", "restrictions", "budget"],
      [],
    ],
    []
  );

  const handleNext = async () => {
    const fields = stepFields[step] as Array<keyof OnboardingFormValues>;
    const valid = await trigger(fields);
    if (valid) {
      next();
    }
  };

  const handleDemo = () => {
    form.reset(DEMO_PREFERENCES);
    goTo(steps.length - 1);
  };

  const onSubmit = async (data: OnboardingFormValues) => {
    try {
      setSubmitting(true);
      const user = auth.currentUser ?? (await signInAsGuest());
      if (!user) {
        toast.error("Please sign in to save your profile.");
        return;
      }
      await saveUserProfile(user.uid, data);
      toast.success("Preferences saved!");
    } catch {
      toast.error("Unable to save preferences right now.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Container className="py-12">
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          <div className="space-y-4">
            <Stepper steps={steps} activeStep={step} />
            <ProgressBar value={progress} />
          </div>

          <Card className="glass-panel border-white/10 bg-white/10 text-white">
            <CardContent className="min-h-[480px] p-8">
              <AnimatePresence mode="wait">
                {step === 0 ? (
                  <AnimatedStep key="welcome">
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                        <Sparkles className="h-3.5 w-3.5" />
                        Smart onboarding
                      </div>
                      <h1 className="text-3xl font-semibold">
                        Let’s personalize your coaching experience.
                      </h1>
                      <p className="text-sm text-white/70">
                        Answer a few quick questions so we can tailor smarter
                        meal guidance and habit nudges.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Button size="lg" onClick={handleNext}>
                          Start onboarding
                        </Button>
                        <Button variant="secondary" size="lg" onClick={handleDemo}>
                          Use demo preferences
                        </Button>
                      </div>
                    </div>
                  </AnimatedStep>
                ) : null}

                {step === 1 ? (
                  <AnimatedStep key="basics">
                    <div className="space-y-6">
                      <CardHeader className="px-0">
                        <CardTitle className="text-xl">
                          Tell us about your baseline.
                        </CardTitle>
                      </CardHeader>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                            Age range
                          </p>
                          <Select
                            value={values.ageRange}
                            onValueChange={(value) =>
                              setValue("ageRange", value, {
                                shouldValidate: true,
                              })
                            }
                          >
                            <SelectTrigger className="bg-white/10">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {AGE_RANGES.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                            Gender (optional)
                          </p>
                          <Select
                            value={values.gender ?? ""}
                            onValueChange={(value) =>
                              setValue("gender", value, {
                                shouldValidate: true,
                              })
                            }
                          >
                            <SelectTrigger className="bg-white/10">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {GENDERS.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                          Activity level
                        </p>
                        <div className="grid gap-3 md:grid-cols-3">
                          {ACTIVITY_LEVELS.map((option) => (
                            <SelectionCard
                              key={option.value}
                              title={option.label}
                              description={option.description}
                              isSelected={values.activityLevel === option.value}
                              onClick={() =>
                                setValue("activityLevel", option.value, {
                                  shouldValidate: true,
                                })
                              }
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </AnimatedStep>
                ) : null}

                {step === 2 ? (
                  <AnimatedStep key="diet">
                    <div className="space-y-6">
                      <CardHeader className="px-0">
                        <CardTitle className="text-xl">
                          Pick your dietary preferences.
                        </CardTitle>
                      </CardHeader>
                      <MultiSelectChips
                        options={DIETARY_PREFERENCES}
                        values={values.dietaryPreferences}
                        onChange={(nextValue) =>
                          setValue("dietaryPreferences", nextValue, {
                            shouldValidate: true,
                          })
                        }
                      />
                    </div>
                  </AnimatedStep>
                ) : null}

                {step === 3 ? (
                  <AnimatedStep key="goals">
                    <div className="space-y-6">
                      <CardHeader className="px-0">
                        <CardTitle className="text-xl">
                          What goals are most important right now?
                        </CardTitle>
                      </CardHeader>
                      <MultiSelectChips
                        options={GOALS}
                        values={values.goals}
                        onChange={(nextValue) =>
                          setValue("goals", nextValue, {
                            shouldValidate: true,
                          })
                        }
                      />
                    </div>
                  </AnimatedStep>
                ) : null}

                {step === 4 ? (
                  <AnimatedStep key="limits">
                    <div className="space-y-6">
                      <CardHeader className="px-0">
                        <CardTitle className="text-xl">
                          Any allergies, restrictions, or budget notes?
                        </CardTitle>
                      </CardHeader>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                            Allergies
                          </p>
                          <Input
                            value={values.allergies}
                            onChange={(event) =>
                              setValue("allergies", event.target.value)
                            }
                            placeholder="Peanuts, shellfish"
                            className="bg-white/10"
                          />
                        </div>
                        <div className="space-y-2">
                          <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                            Restrictions
                          </p>
                          <Input
                            value={values.restrictions}
                            onChange={(event) =>
                              setValue("restrictions", event.target.value)
                            }
                            placeholder="Low sodium"
                            className="bg-white/10"
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                          Budget preference
                        </p>
                        <div className="grid gap-3 md:grid-cols-3">
                          {BUDGETS.map((option) => (
                            <SelectionCard
                              key={option.value}
                              title={option.label}
                              isSelected={values.budget === option.value}
                              onClick={() =>
                                setValue("budget", option.value, {
                                  shouldValidate: true,
                                })
                              }
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </AnimatedStep>
                ) : null}

                {step === 5 ? (
                  <AnimatedStep key="summary">
                    <div className="space-y-6">
                      <CardHeader className="px-0">
                        <CardTitle className="text-xl">
                          Review your preferences.
                        </CardTitle>
                      </CardHeader>
                      <div className="grid gap-4 md:grid-cols-2">
                        <SummaryCard title="Age range" value={values.ageRange} />
                        <SummaryCard
                          title="Activity level"
                          value={values.activityLevel}
                        />
                        <SummaryCard
                          title="Dietary preferences"
                          value={values.dietaryPreferences}
                        />
                        <SummaryCard title="Goals" value={values.goals} />
                        <SummaryCard title="Allergies" value={values.allergies} />
                        <SummaryCard
                          title="Restrictions"
                          value={values.restrictions}
                        />
                        <SummaryCard title="Budget" value={values.budget} />
                      </div>
                      <Button
                        size="lg"
                        onClick={handleSubmit(onSubmit)}
                        disabled={submitting}
                      >
                        {submitting ? "Saving..." : "Save preferences"}
                      </Button>
                    </div>
                  </AnimatedStep>
                ) : null}
              </AnimatePresence>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <Button variant="ghost" disabled={step === 0} onClick={back}>
              Back
            </Button>
            {step < steps.length - 1 ? (
              <Button onClick={handleNext}>Next</Button>
            ) : null}
          </div>
        </div>
      </Container>
    </div>
  );
}
