"use client";

import { useEffect, useState } from "react";
import { LifeBuoy } from "lucide-react";

import { AdminHeader, EmptyState } from "@/components/admin/AdminUI";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchSupportTickets, updateSupportTicket, type SupportStatus, type SupportTicket } from "@/lib/admin";

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    try {
      setIsLoading(true);
      const result = await fetchSupportTickets();
      setTickets(result.data);
      setError("");
    } catch {
      setError("We could not load support tickets.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let active = true;
    void (async () => {
      try {
        setIsLoading(true);
        const result = await fetchSupportTickets();
        if (!active) return;
        setTickets(result.data);
        setError("");
      } catch {
        if (!active) return;
        setError("We could not load support tickets.");
      } finally {
        if (active) setIsLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  async function changeStatus(id: string, status: SupportStatus) {
    try {
      await updateSupportTicket(id, { status });
      await load();
    } catch {
      setError("We could not update this support ticket.");
    }
  }

  return (
    <div className="space-y-8">
      <AdminHeader
        eyebrow="Support center"
        title="Support Management"
        description="Review support requests, move tickets through the workflow, and keep response load visible."
        icon={LifeBuoy}
        aside={
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Open tickets</p>
            <p className="mt-3 text-3xl font-semibold">{isLoading ? "..." : tickets.filter((ticket) => ticket.status === "OPEN").length}</p>
            <p className="mt-1 text-sm text-muted-foreground">Tickets currently waiting for first action.</p>
          </>
        }
      />

      {error ? <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">{error}</div> : null}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Support Queue</CardTitle>
          <CardDescription>Status, priority, assignee, and customer context.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">{Array.from({ length: 5 }, (_, index) => <Skeleton key={index} className="h-24 w-full" />)}</div>
          ) : tickets.length === 0 ? (
            <EmptyState title="No support tickets yet" description="Support workflow is ready. It will populate as ticket records are created." />
          ) : (
            <div className="space-y-3">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="surface-subtle rounded-2xl p-4">
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                    <div className="max-w-3xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold">{ticket.subject}</p>
                        <Badge variant={ticket.status === "OPEN" ? "warning" : ticket.status === "RESOLVED" || ticket.status === "CLOSED" ? "success" : "outline"}>{ticket.status}</Badge>
                        <Badge variant={ticket.priority === "URGENT" ? "destructive" : ticket.priority === "HIGH" ? "warning" : "outline"}>{ticket.priority}</Badge>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{ticket.message}</p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        User: {ticket.user?.email ?? "anonymous"} • Assignee: {ticket.assignedTo?.email ?? "unassigned"}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" onClick={() => void changeStatus(ticket.id, "IN_PROGRESS")}>Start</Button>
                      <Button variant="outline" size="sm" onClick={() => void changeStatus(ticket.id, "RESOLVED")}>Resolve</Button>
                      <Button variant="destructive" size="sm" onClick={() => void changeStatus(ticket.id, "CLOSED")}>Close</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
