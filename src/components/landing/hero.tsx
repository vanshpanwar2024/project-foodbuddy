"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link";

import { APP_TAGLINE } from "@/constants/app";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export const Hero = () => (
  <section className="relative overflow-hidden pb-20 pt-16">
    <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="space-y-6"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100/80 bg-emerald-50/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          <Sparkles className="h-3.5 w-3.5" />
          AI-guided nutrition coaching
        </div>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
          {APP_TAGLINE}
        </h1>
        <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
          Smart Food Choice Coach blends habit-friendly nudges with real-time
          analysis to keep every meal aligned with your health goals.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/dashboard">Preview Dashboard</Link>
          </Button>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass-panel relative rounded-[32px] border border-emerald-100/80 bg-white/80 p-6 shadow-[0_20px_80px_rgba(16,185,129,0.12)]"
      >
        <div className="space-y-4">
          <div className="rounded-2xl border border-emerald-100/80 bg-gradient-to-br from-emerald-50 to-white p-5">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Today
            </div>
            <div className="mt-3 text-3xl font-semibold text-foreground">84</div>
            <p className="mt-1 text-sm text-muted-foreground">
              Nutrition alignment score
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { label: "Hydration", value: "2.1L" },
              { label: "Protein", value: "108g" },
              { label: "Fiber", value: "26g" },
              { label: "Balance", value: "92%" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-emerald-100/80 bg-white/70 p-4"
              >
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {item.label}
                </div>
                <div className="mt-2 text-lg font-semibold text-foreground">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Container>
  </section>
);
