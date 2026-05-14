"use client";

import { useEffect, useState } from "react";
import { Briefcase, PencilLine, Plus, Trash2 } from "lucide-react";

import { AdminHeader, EmptyState } from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { createCareer, deleteCareer, fetchAdminCareers, updateCareer, type CareerAdminRecord } from "@/lib/admin";

type CareerDraft = {
  title: string;
  description: string;
  category: string;
  salaryRange: string;
  location: string;
  demandLevel: "LOW" | "MEDIUM" | "HIGH";
};

const emptyDraft: CareerDraft = {
  title: "",
  description: "",
  category: "",
  salaryRange: "",
  location: "",
  demandLevel: "MEDIUM",
};

export default function AdminCareersPage() {
  const [careers, setCareers] = useState<CareerAdminRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingCareer, setEditingCareer] = useState<CareerAdminRecord | null>(null);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<CareerDraft>(emptyDraft);

  async function load() {
    try {
      setIsLoading(true);
      const result = await fetchAdminCareers();
      setCareers(result.data);
      setError("");
    } catch {
      setError("We could not load the career catalog.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let active = true;
    void (async () => {
      try {
        setIsLoading(true);
        const result = await fetchAdminCareers();
        if (!active) return;
        setCareers(result.data);
        setError("");
      } catch {
        if (!active) return;
        setError("We could not load the career catalog.");
      } finally {
        if (active) setIsLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  function openCreate() {
    setEditingCareer(null);
    setDraft(emptyDraft);
    setOpen(true);
  }

  function openEdit(career: CareerAdminRecord) {
    setEditingCareer(career);
    setDraft({
      title: career.title,
      description: career.description,
      category: career.category,
      salaryRange: career.salaryRange,
      location: career.location,
      demandLevel: career.demandLevel,
    });
    setOpen(true);
  }

  async function handleSave() {
    try {
      if (editingCareer) {
        await updateCareer(editingCareer.id, draft);
      } else {
        await createCareer(draft);
      }
      setOpen(false);
      await load();
    } catch {
      setError("We could not save the career record.");
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteCareer(id);
      await load();
    } catch {
      setError("We could not delete the career record.");
    }
  }

  return (
    <div className="space-y-8">
      <AdminHeader
        eyebrow="Career management"
        title="Careers"
        description="Maintain the career catalog, category mix, demand labels, and inventory that feeds public discovery."
        icon={Briefcase}
        aside={
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Catalog size</p>
            <p className="mt-3 text-3xl font-semibold">{isLoading ? "..." : careers.length}</p>
            <p className="mt-1 text-sm text-muted-foreground">Career records currently loaded for admin review.</p>
          </>
        }
      />

      {error ? <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">{error}</div> : null}

      <Card>
        <CardHeader className="gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <CardTitle className="text-lg">Career Catalog</CardTitle>
            <CardDescription>Create, revise, and retire career entries.</CardDescription>
          </div>
          <Button variant="premium" onClick={openCreate}><Plus className="mr-2 h-4 w-4" /> New Career</Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">{Array.from({ length: 5 }, (_, index) => <Skeleton key={index} className="h-24 w-full" />)}</div>
          ) : careers.length === 0 ? (
            <EmptyState title="No careers yet" description="Add a first career record to start powering the public explorer and admin charts." />
          ) : (
            <div className="space-y-3">
              {careers.map((career) => (
                <div key={career.id} className="surface-subtle flex flex-col gap-4 rounded-2xl p-4 xl:flex-row xl:items-center xl:justify-between">
                  <div className="max-w-3xl">
                    <p className="font-semibold">{career.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{career.category} • {career.location} • {career.salaryRange}</p>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{career.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => openEdit(career)}><PencilLine className="mr-2 h-4 w-4" /> Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => void handleDelete(career.id)}><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCareer ? "Edit Career" : "Create Career"}</DialogTitle>
            <DialogDescription>Maintain the title, demand label, compensation framing, and descriptive copy.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Title"><Input value={draft.title} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} /></Field>
            <Field label="Category"><Input value={draft.category} onChange={(event) => setDraft((current) => ({ ...current, category: event.target.value }))} /></Field>
            <Field label="Salary Range"><Input value={draft.salaryRange} onChange={(event) => setDraft((current) => ({ ...current, salaryRange: event.target.value }))} /></Field>
            <Field label="Location"><Input value={draft.location} onChange={(event) => setDraft((current) => ({ ...current, location: event.target.value }))} /></Field>
            <Field label="Demand Level">
              <select
                value={draft.demandLevel}
                onChange={(event) => setDraft((current) => ({ ...current, demandLevel: event.target.value as CareerDraft["demandLevel"] }))}
                className="flex h-10 w-full rounded-xl border border-border/70 bg-card/75 px-3 text-sm"
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
              </select>
            </Field>
            <div className="md:col-span-2">
              <Field label="Description"><Textarea value={draft.description} onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))} /></Field>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="premium" onClick={() => void handleSave()}>Save Career</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}
