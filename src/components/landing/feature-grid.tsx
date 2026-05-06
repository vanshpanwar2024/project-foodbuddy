import { Brain, Leaf, ShieldCheck } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/layout/container";

const features = [
  {
    title: "AI-Driven Nudges",
    description:
      "Context-aware guidance that adapts to your routines and cravings.",
    icon: Brain,
  },
  {
    title: "Sustainable Tracking",
    description:
      "Lightweight logging that highlights trends instead of perfection.",
    icon: Leaf,
  },
  {
    title: "Trusted Privacy",
    description:
      "Secure sign-in with privacy-first data controls built-in.",
    icon: ShieldCheck,
  },
];

export const FeatureGrid = () => (
  <section className="pb-24">
    <Container className="grid gap-6 lg:grid-cols-3">
      {features.map(({ title, description, icon: Icon }) => (
        <Card
          key={title}
          className="glass-panel border-emerald-100/80 bg-white/80 text-foreground"
        >
          <CardHeader>
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
              <Icon className="h-5 w-5" />
            </div>
            <CardTitle className="text-lg text-foreground">{title}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {description}
          </CardContent>
        </Card>
      ))}
    </Container>
  </section>
);
