"use client";

import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function AdminHeader({
  eyebrow,
  title,
  description,
  icon: Icon,
  aside,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  aside?: React.ReactNode;
}) {
  return (
    <section className="surface-subtle relative overflow-hidden px-6 py-6 md:px-8">
      <div className="hero-wash pointer-events-none absolute inset-0 opacity-90" />
      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-3">
          <Badge variant="destructive" className="gap-1.5 px-3 py-1.5">
            <Icon className="h-3.5 w-3.5" />
            {eyebrow}
          </Badge>
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground md:text-base">{description}</p>
          </div>
        </div>
        {aside ? <div className="metric-tile max-w-sm">{aside}</div> : null}
      </div>
    </section>
  );
}

export function AdminStatCard({
  label,
  value,
  detail,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string | number;
  detail?: string;
  icon: LucideIcon;
  tone?: string;
}) {
  return (
    <Card className="overflow-hidden border-border/70 bg-card/80 backdrop-blur-xl">
      <CardContent className="pt-6">
        <div className="mb-3 flex items-center justify-between">
          <span className={cn("rounded-xl bg-muted p-3", tone)}>
            <Icon className="h-5 w-5" />
          </span>
          <Badge variant="outline">Live</Badge>
        </div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">{label}</p>
        {detail ? <p className="mt-2 text-xs text-muted-foreground">{detail}</p> : null}
      </CardContent>
    </Card>
  );
}

export function ChartCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="surface-subtle rounded-2xl p-6 text-sm text-muted-foreground">
      <p className="font-medium text-foreground">{title}</p>
      <p className="mt-2">{description}</p>
    </div>
  );
}
