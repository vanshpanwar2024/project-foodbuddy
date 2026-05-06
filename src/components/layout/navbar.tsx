"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { LogOut, BarChart3, Target } from "lucide-react";

import { APP_NAME, NAV_LINKS } from "@/constants/app";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { useAuth } from "@/hooks/useAuth";
import { signOutUser } from "@/services/auth";

export const Navbar = () => {
  const { user, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await signOutUser();
      setIsOpen(false);
    } catch {
      console.error("Logout failed");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-100/80 bg-background/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight">
              {APP_NAME}
            </span>
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {loading ? null : user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-full border border-emerald-100/80 bg-emerald-50/70 px-3 py-1 transition hover:bg-emerald-100/50"
              >
                <div className="h-8 w-8 overflow-hidden rounded-full border border-emerald-100/80 bg-white">
                  {user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt={user.displayName ?? "User avatar"}
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-emerald-900">
                      {user.displayName?.[0]?.toUpperCase() ?? "U"}
                    </div>
                  )}
                </div>
                <span className="text-xs font-semibold text-emerald-900/80">
                  {user.displayName ?? "Guest"}
                </span>
              </button>

              {/* Dropdown Menu */}
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-emerald-100/80 bg-white/95 shadow-xl backdrop-blur">
                  <div className="border-b border-emerald-100/60 px-4 py-3">
                    <p className="text-xs text-muted-foreground">Signed in as</p>
                    <p className="text-sm font-semibold text-foreground">{user.displayName || "Guest"}</p>
                  </div>
                  <div className="space-y-1 p-2">
                    <Link
                      href="/goals"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition hover:bg-emerald-50/60"
                    >
                      <Target className="h-4 w-4 text-emerald-600" />
                      My Goals
                    </Link>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition hover:bg-emerald-50/60"
                    >
                      <BarChart3 className="h-4 w-4 text-emerald-600" />
                      My Dashboard
                    </Link>
                  </div>
                  <div className="border-t border-emerald-100/60 p-2">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50/60"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Button variant="ghost" className="hidden md:inline-flex" asChild>
                <Link href="/dashboard">Live Demo</Link>
              </Button>
              <Button asChild>
                <Link href="/auth">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </Container>
    </header>
  );
};
