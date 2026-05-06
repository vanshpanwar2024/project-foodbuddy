import { Navbar } from "@/components/layout/navbar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => (
  <div className="flex min-h-screen flex-col">
    <Navbar />
    <main className="flex-1 px-6 py-10 lg:px-10">{children}</main>
  </div>
);
