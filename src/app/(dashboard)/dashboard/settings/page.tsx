"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { User, Bell, Lock, Palette, CheckCircle2, Sparkles } from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  bio: z.string().optional(),
  skills: z.string().optional(),
  github: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  portfolio: z.string().url().optional().or(z.literal("")),
});

type ProfileForm = z.infer<typeof profileSchema>;

const sections = [
  { icon: User, label: "Profile" },
  { icon: Bell, label: "Notifications" },
  { icon: Lock, label: "Security" },
  { icon: Palette, label: "Appearance" },
];

export default function SettingsPage() {
  const { user } = useAuthStore();
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      bio: "",
      skills: "React, TypeScript, Next.js",
      github: "",
      linkedin: "",
      portfolio: "",
    },
  });

  const onSave = async (data: ProfileForm) => {
    void data;
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <section className="surface-subtle relative overflow-hidden px-6 py-6 md:px-8">
        <div className="hero-wash pointer-events-none absolute inset-0 opacity-90" />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <Badge variant="premium" className="gap-1.5 px-3 py-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Account preferences
            </Badge>
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Settings</h1>
              <p className="mt-2 text-sm leading-6 text-muted-foreground md:text-base">
                Update your public profile, keep account details current, and make sure the information employers see still fits the role you want next.
              </p>
            </div>
          </div>
          <div className="metric-tile max-w-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Profile readiness</p>
            <p className="mt-3 text-3xl font-semibold">84%</p>
            <p className="mt-1 text-sm text-muted-foreground">A fuller bio and links will strengthen your profile surface.</p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <nav className="space-y-2">
          {sections.map((section, index) => (
            <button
              key={section.label}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${index === 0 ? "bg-primary/10 text-primary" : "bg-card/65 text-muted-foreground hover:bg-muted/70 hover:text-foreground"}`}
            >
              <section.icon className="h-4 w-4" />
              {section.label}
            </button>
          ))}
        </nav>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details and public profile.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSave)} className="space-y-5">
                <div className="flex flex-col gap-5 border-b border-border/60 pb-6 sm:flex-row sm:items-center">
                  <div className="relative">
                    <div className="bg-gradient-cta flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold text-white">
                      {user?.name?.[0] ?? "U"}
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{user?.name}</p>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                    <Badge variant="secondary" className="mt-2 capitalize">{user?.role}</Badge>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input {...register("name")} className={errors.name ? "border-destructive" : ""} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Email</label>
                    <Input {...register("email")} type="email" className={errors.email ? "border-destructive" : ""} />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium">Bio</label>
                  <textarea
                    {...register("bio")}
                    rows={4}
                    placeholder="Tell us a bit about yourself..."
                    className="flex w-full resize-none rounded-2xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium">Skills</label>
                  <Input {...register("skills")} placeholder="e.g. Python, React, Data Analysis" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">LinkedIn Profile</label>
                    <Input {...register("linkedin")} placeholder="https://linkedin.com/in/..." />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">GitHub Profile</label>
                    <Input {...register("github")} placeholder="https://github.com/..." />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium">Portfolio</label>
                  <Input {...register("portfolio")} placeholder="https://yourportfolio.com" />
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="premium" type="submit">Save Changes</Button>
                  {saved && (
                    <span className="flex items-center gap-1.5 text-sm text-success">
                      <CheckCircle2 className="h-4 w-4" />
                      Saved successfully
                    </span>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password to keep your account secure.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Current Password</label>
                <Input type="password" placeholder="Enter current password" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">New Password</label>
                <Input type="password" placeholder="Enter new password" />
              </div>
              <Button variant="outline">Update Password</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
