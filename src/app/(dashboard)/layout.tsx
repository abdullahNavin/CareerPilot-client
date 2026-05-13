"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="page-shell min-h-[calc(100vh-4rem)] bg-background">
        <div className="section-wrap py-4 md:py-6">
          <div className="flex min-h-[calc(100vh-7rem)] gap-4 lg:gap-6">
            <Sidebar />
            <main className="surface-panel relative flex min-w-0 flex-1 flex-col overflow-visible">
              <div className="hero-wash pointer-events-none absolute inset-x-0 top-0 h-40 opacity-80" />
              <div className="relative flex-1 p-4 md:p-6 lg:p-8">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
