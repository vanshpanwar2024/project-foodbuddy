import Link from "next/link";
import { LayoutDashboard, Sparkles, User } from "lucide-react";

import { DASHBOARD_NAV } from "@/constants/app";
import { cn } from "@/lib/utils";

const icons = [LayoutDashboard, Sparkles, User, Sparkles];

export const Sidebar = () => (
  <aside className="hidden w-64 flex-col gap-4 border-r border-emerald-100/80 bg-emerald-50/40 px-5 py-6 backdrop-blur lg:flex">
    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
      Coach Suite
    </div>
    <nav className="flex flex-col gap-2">
      {DASHBOARD_NAV.map((item, index) => {
        const Icon = icons[index % icons.length];
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-xl border border-transparent px-3 py-2 text-sm font-medium text-muted-foreground transition",
              "hover:border-emerald-100/70 hover:bg-emerald-50/70 hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  </aside>
);
