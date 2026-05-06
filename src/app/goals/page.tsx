"use client";

import { useState } from "react";
import { ArrowLeft, Target } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { Navbar } from "@/components/layout/navbar";

const initialGoals = [
  {
    title: "Steps Goal",
    description: "Walk 8,000+ steps each day to stay active.",
    icon: "👟",
  },
  {
    title: "Protein Goal",
    description: "Hit 100g of protein daily for stronger muscles.",
    icon: "💪",
  },
  {
    title: "Hydration Goal",
    description: "Drink at least 2.5L of water every day.",
    icon: "💧",
  },
];

type Goal = {
  title: string;
  description: string;
  icon: string;
};

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalDescription, setNewGoalDescription] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleAddGoal = () => {
    if (!newGoalTitle.trim() || !newGoalDescription.trim()) return;

    setGoals((current) => [
      ...current,
      {
        title: newGoalTitle.trim(),
        description: newGoalDescription.trim(),
        icon: "🎯",
      },
    ]);

    setNewGoalTitle("");
    setNewGoalDescription("");
  };

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
    setEditTitle(goals[index].title);
    setEditDescription(goals[index].description);
  };

  const handleSaveEdit = () => {
    if (editingIndex === null) return;
    if (!editTitle.trim() || !editDescription.trim()) return;

    setGoals((current) =>
      current.map((goal, index) =>
        index === editingIndex
          ? { ...goal, title: editTitle.trim(), description: editDescription.trim() }
          : goal
      )
    );
    setEditingIndex(null);
    setEditTitle("");
    setEditDescription("");
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditTitle("");
    setEditDescription("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <Container>
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-semibold text-foreground">Your Goals</h1>
              <p className="text-sm text-muted-foreground">
                Track key wellness goals and add new targets that fit your routine.
              </p>
            </div>
            <Link href="/food">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to foodBuddy
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {goals.map((goal, index) => {
              const isEditing = editingIndex === index;
              return (
                <Card key={`${goal.title}-${index}`} className="glass-panel border-emerald-100/60 bg-emerald-50/40">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        {isEditing ? (
                          <div className="space-y-3">
                            <input
                              type="text"
                              value={editTitle}
                              onChange={(event) => setEditTitle(event.target.value)}
                              className="w-full rounded-2xl border border-emerald-100/60 bg-white/90 px-4 py-2 text-foreground focus:outline-none focus:border-emerald-300"
                            />
                            <textarea
                              value={editDescription}
                              onChange={(event) => setEditDescription(event.target.value)}
                              rows={3}
                              className="w-full resize-none rounded-2xl border border-emerald-100/60 bg-white/90 px-4 py-3 text-foreground focus:outline-none focus:border-emerald-300"
                            />
                          </div>
                        ) : (
                          <>
                            <CardTitle className="text-lg text-foreground">{goal.title}</CardTitle>
                            <p className="mt-2 text-sm text-muted-foreground">{goal.description}</p>
                          </>
                        )}
                      </div>
                      <span className="text-2xl">{goal.icon}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {isEditing ? (
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-3">
                          <Button className="w-full" variant="secondary" onClick={handleSaveEdit}>
                            Save
                          </Button>
                          <Button className="w-full" variant="ghost" onClick={handleCancelEdit}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <Button className="w-full" variant="secondary">
                          <Target className="mr-2 h-4 w-4" />
                          View Goal
                        </Button>
                        <Button className="w-full" variant="outline" onClick={() => handleEditClick(index)}>
                          Edit Goal
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="mt-8 glass-panel border-emerald-100/60 bg-emerald-50/40">
            <CardHeader>
              <CardTitle className="text-foreground">Create New Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <input
                  type="text"
                  value={newGoalTitle}
                  onChange={(event) => setNewGoalTitle(event.target.value)}
                  placeholder="Goal title (e.g., 'Limit added sugar')"
                  className="w-full rounded-lg border border-emerald-100/60 bg-white/70 px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
                <textarea
                  value={newGoalDescription}
                  onChange={(event) => setNewGoalDescription(event.target.value)}
                  placeholder="Goal description..."
                  className="w-full rounded-lg border border-emerald-100/60 bg-white/70 px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  rows={4}
                />
                <Button className="w-full" onClick={handleAddGoal}>
                  + Add Goal
                </Button>
              </div>
            </CardContent>
          </Card>
        </Container>
      </main>
    </div>
  );
}
