"use client";

import { Apple, Sparkles, User } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { signInAsGuest, signInWithGoogle } from "@/services/auth";
import { toast } from "sonner";

export default function AuthPage() {
  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
      toast.success("Signed in with Google.");
    } catch {
      toast.error("Unable to sign in with Google yet.");
    }
  };

  const handleGuest = async () => {
    try {
      await signInAsGuest();
      toast.success("Signed in as guest.");
    } catch {
      toast.error("Unable to sign in as guest yet.");
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Container className="flex flex-1 items-center justify-center py-16">
        <Card className="glass-panel w-full max-w-xl border-emerald-100/80 bg-white/80 text-foreground">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome to Smart Food Coach</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Sign in to unlock personalized nudges, habit tracking, and
              adaptive meal insights.
            </p>
            <div className="grid gap-3">
              <Button className="w-full" onClick={handleGoogle}>
                <Sparkles className="mr-2 h-4 w-4" /> Continue with Google
              </Button>
              <Button variant="secondary" className="w-full" onClick={handleGuest}>
                <User className="mr-2 h-4 w-4" /> Continue as Guest
              </Button>
            </div>
            <div className="rounded-2xl border border-emerald-100/80 bg-emerald-50/60 p-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Apple className="h-4 w-4" />
                Firebase Auth is ready. Add OAuth credentials to enable Google
                login.
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
