import { FeatureGrid } from "@/components/landing/feature-grid";
import { Hero } from "@/components/landing/hero";
import { Navbar } from "@/components/layout/navbar";
import { Container } from "@/components/layout/container";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeatureGrid />
        <section className="pb-24">
          <Container className="grid gap-6 rounded-[32px] border border-emerald-100/80 bg-white/80 px-8 py-12 text-muted-foreground shadow-[0_30px_120px_rgba(16,185,129,0.12)]">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Coming Next
            </div>
            <div className="text-3xl font-semibold text-foreground">
              Adaptive meal planning, pantry sync, and AI-powered swaps.
            </div>
            <p className="max-w-2xl text-sm text-muted-foreground">
              This foundation is ready for smart grocery integrations, coaching
              sequences, and personalized nutrition plans.
            </p>
          </Container>
        </section>
      </main>
    </div>
  );
}
