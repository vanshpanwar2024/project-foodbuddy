"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { Navbar } from "@/components/layout/navbar";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const years = [2024, 2025, 2026, 2027, 2028];

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type FoodLogEntry = {
  month: string;
  date: string;
  breakfast: string;
  lunch: string;
  snacks: string;
  dinner: string;
  hydration: string;
  additional: string;
};

const initialEntry: Omit<FoodLogEntry, "month" | "date"> = {
  breakfast: "",
  lunch: "",
  snacks: "",
  dinner: "",
  hydration: "",
  additional: "",
};

const formatDateKey = (year: number, month: number, day: number) =>
  `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

export default function FoodLogPage() {
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [logEntries, setLogEntries] = useState<Record<string, FoodLogEntry>>(() => {
    if (typeof window === "undefined") return {};
    const saved = localStorage.getItem("foodLogEntries");
    if (!saved) return {};
    try {
      return JSON.parse(saved);
    } catch {
      return {};
    }
  });

  const selectedDateKey = formatDateKey(selectedYear, selectedMonth, selectedDay);

  const [entry, setEntry] = useState<Omit<FoodLogEntry, "month" | "date">>(() => {
    if (typeof window === "undefined") return initialEntry;
    const saved = localStorage.getItem("foodLogEntries");
    if (!saved) return initialEntry;
    try {
      const parsed = JSON.parse(saved) as Record<string, FoodLogEntry>;
      const key = formatDateKey(today.getFullYear(), today.getMonth(), today.getDate());
      const savedEntry = parsed[key];
      return savedEntry
        ? {
            breakfast: savedEntry.breakfast,
            lunch: savedEntry.lunch,
            snacks: savedEntry.snacks,
            dinner: savedEntry.dinner,
            hydration: savedEntry.hydration,
            additional: savedEntry.additional,
          }
        : initialEntry;
    } catch {
      return initialEntry;
    }
  });

  useEffect(() => {
    localStorage.setItem("foodLogEntries", JSON.stringify(logEntries));
  }, [logEntries]);

  const daysInMonth = useMemo(
    () => new Date(selectedYear, selectedMonth + 1, 0).getDate(),
    [selectedMonth, selectedYear]
  );

  const startWeekday = useMemo(
    () => new Date(selectedYear, selectedMonth, 1).getDay(),
    [selectedMonth, selectedYear]
  );

  const currentEntry = logEntries[selectedDateKey];

  const handleDaySelect = (day: number) => {
    const key = formatDateKey(selectedYear, selectedMonth, day);
    setSelectedDay(day);
    const savedEntry = logEntries[key];
    setEntry(
      savedEntry
        ? {
            breakfast: savedEntry.breakfast,
            lunch: savedEntry.lunch,
            snacks: savedEntry.snacks,
            dinner: savedEntry.dinner,
            hydration: savedEntry.hydration,
            additional: savedEntry.additional,
          }
        : initialEntry
    );
  };

  const handleChange = (field: keyof typeof initialEntry, value: string) => {
    setEntry((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const dayKey = selectedDateKey;
    setLogEntries((prev) => ({
      ...prev,
      [dayKey]: {
        month: months[selectedMonth],
        date: dayKey,
        ...entry,
      },
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <Container>
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-semibold text-foreground">Food Logger</h1>
              <p className="text-sm text-muted-foreground">
                Pick a month and year, then click a date to log breakfast, lunch, snacks, dinner, and extras.
              </p>
            </div>
            <Link href="/food">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to foodBuddy
              </Button>
            </Link>
          </div>

          <Card className="glass-panel border-emerald-100/60 bg-emerald-50/40">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Month & Year Selector</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-muted-foreground">
                Month
                <select
                  value={selectedMonth}
                  onChange={(event) => {
                    const monthValue = Number(event.target.value);
                    const maxDay = new Date(selectedYear, monthValue + 1, 0).getDate();
                    setSelectedMonth(monthValue);
                    setSelectedDay((current) => Math.min(current, maxDay));
                  }}
                  className="w-full rounded-2xl border border-emerald-100/60 bg-white/90 px-4 py-3 text-foreground outline-none focus:border-emerald-300"
                >
                  {months.map((month, index) => (
                    <option key={month} value={index}>
                      {month}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2 text-sm text-muted-foreground">
                Year
                <select
                  value={selectedYear}
                  onChange={(event) => {
                    const yearValue = Number(event.target.value);
                    const maxDay = new Date(yearValue, selectedMonth + 1, 0).getDate();
                    setSelectedYear(yearValue);
                    setSelectedDay((current) => Math.min(current, maxDay));
                  }}
                  className="w-full rounded-2xl border border-emerald-100/60 bg-white/90 px-4 py-3 text-foreground outline-none focus:border-emerald-300"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </label>
            </CardContent>
          </Card>

          <section className="mt-6">
            <div className="mb-4 flex items-center justify-between gap-4 rounded-3xl border border-emerald-100/60 bg-white/90 p-4 text-sm text-muted-foreground shadow-sm">
              <div>
                <div className="font-semibold text-foreground">{months[selectedMonth]} {selectedYear}</div>
                <div>{weekdays.join(" • ")}</div>
              </div>
              <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                Selected: {selectedDay} {months[selectedMonth]}
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {weekdays.map((day) => (
                <div key={day} className="text-center text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  {day}
                </div>
              ))}

              {Array.from({ length: startWeekday }).map((_, index) => (
                <div key={`blank-${index}`} className="h-14 rounded-2xl bg-transparent" />
              ))}

              {Array.from({ length: daysInMonth }, (_, index) => {
                const day = index + 1;
                const dayKey = formatDateKey(selectedYear, selectedMonth, day);
                const hasEntry = Boolean(logEntries[dayKey]);
                const isActive = selectedDay === day;

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleDaySelect(day)}
                    className={`group h-14 rounded-3xl border px-2 transition focus:outline-none ${
                      isActive
                        ? "border-emerald-500 bg-emerald-100 text-emerald-900 shadow-inner"
                        : "border-emerald-100/60 bg-white/90 text-foreground hover:border-emerald-300"
                    }`}
                  >
                    <div className="flex h-full flex-col items-center justify-center gap-1">
                      <span className="text-sm font-semibold">{day}</span>
                      {hasEntry ? (
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      ) : (
                        <span className="h-2 w-2 rounded-full bg-transparent" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <Card className="glass-panel border-emerald-100/60 bg-emerald-50/40">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Log for {months[selectedMonth]} {selectedDay}, {selectedYear}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  {([
                    "breakfast",
                    "lunch",
                    "snacks",
                    "dinner",
                    "hydration",
                    "additional",
                  ] as const).map((field) => (
                    <label key={field} className="space-y-2 text-sm text-muted-foreground">
                      {field === "hydration" ? "Hydration (L)" : field.charAt(0).toUpperCase() + field.slice(1)}
                      {field === "hydration" ? (
                        <input
                          type="number"
                          min="0"
                          step="0.1"
                          value={entry[field]}
                          onChange={(event) => handleChange(field, event.target.value)}
                          placeholder="Litres drunk today"
                          className="w-full rounded-2xl border border-emerald-100/60 bg-white/90 px-4 py-3 text-foreground outline-none focus:border-emerald-300"
                        />
                      ) : (
                        <textarea
                          value={entry[field]}
                          onChange={(event) => handleChange(field, event.target.value)}
                          rows={field === "additional" ? 4 : 3}
                          placeholder={`Write your ${field} here...`}
                          className="w-full resize-none rounded-2xl border border-emerald-100/60 bg-white/90 px-4 py-3 text-foreground outline-none focus:border-emerald-300"
                        />
                      )}
                    </label>
                  ))}
                </div>
                <div className="flex justify-end">
                  <Button className="w-full md:w-auto" onClick={handleSave}>
                    Save Log
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel border-emerald-100/60 bg-emerald-50/40">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Entry Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-foreground">
                {currentEntry ? (
                  <div className="space-y-4">
                    {([
                      "breakfast",
                      "lunch",
                      "snacks",
                      "dinner",
                      "hydration",
                      "additional",
                    ] as const).map((field) => (
                      <div key={field} className="rounded-2xl border border-emerald-100/60 bg-white/80 p-4">
                        <div className="font-semibold text-foreground capitalize">
                          {field === "hydration" ? "Hydration (L)" : field}
                        </div>
                        <div className="mt-2 text-muted-foreground">
                          {field === "hydration"
                            ? currentEntry[field] || "No hydration logged."
                            : currentEntry[field] || "No entry yet."}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-emerald-100/60 bg-white/80 p-4 text-muted-foreground">
                    No saved log for this date yet. Start typing and click Save Log.
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
        </Container>
      </main>
    </div>
  );
}
