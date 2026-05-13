"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { User, Bell, Lock, Palette, CheckCircle2, Sparkles } from "lucide-react";
import { fetchCurrentUser, updateCurrentUser, type CurrentUser } from "@/lib/dashboard";

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
  const { user: authUser, token, setAuth } = useAuthStore();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      skills: "",
      github: "",
      linkedin: "",
      portfolio: "",
    },
  });

  useEffect(() => {
    let active = true;

    async function loadUser() {
      try {
        setIsBootstrapping(true);
        const user = await fetchCurrentUser();

        if (!active) return;

        setCurrentUser(user);
        reset({
          name: user.name,
          email: user.email,
          bio: user.bio ?? "",
          skills: user.profile?.skills?.join(", ") ?? "",
          github: user.profile?.github ?? "",
          linkedin: user.profile?.linkedin ?? "",
          portfolio: user.profile?.portfolio ?? "",
        });
      } catch {
        if (!active) return;
        setError("We could not load your profile details.");
      } finally {
        if (active) {
          setIsBootstrapping(false);
        }
      }
    }

    void loadUser();

    return () => {
      active = false;
    };
  }, [reset]);

  const onSave = async (data: ProfileForm) => {
    if (!currentUser || !token) return;

    try {
      setIsSaving(true);
      setError("");

      const updatedUser = await updateCurrentUser(currentUser.id, {
        name: data.name,
        bio: data.bio ?? "",
        skills: (data.skills ?? "")
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean),
        github: data.github ?? "",
        linkedin: data.linkedin ?? "",
        portfolio: data.portfolio ?? "",
      });

      setCurrentUser(updatedUser);
      setAuth({
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        avatar: updatedUser.avatar,
      }, token);

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("We could not save your profile changes.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <section className="surface-subtle relative overflow-hidden px-6 py-6 md:px-8">
        <div className="hero-wash pointer-events-none absolute inset-0 opacity-90" />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <Badge variant="premium" className="gap-1.5 px-3 py-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Live profile settings
            </Badge>
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Settings</h1>
              <p className="mt-2 text-sm leading-6 text-muted-foreground md:text-base">
                Edit your real account profile from the backend, including bio, links, and skill tags.
              </p>
            </div>
          </div>
          <div className="metric-tile max-w-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Skills on profile</p>
            <p className="mt-3 text-3xl font-semibold">{currentUser?.profile?.skills?.length ?? 0}</p>
            <p className="mt-1 text-sm text-muted-foreground">The backend uses these fields to enrich your account profile.</p>
          </div>
        </div>
      </section>

      {error && (
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

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
              <CardDescription>These fields are loaded from and saved to the backend.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSave)} className="space-y-5">
                <div className="flex flex-col gap-5 border-b border-border/60 pb-6 sm:flex-row sm:items-center">
                  <div className="relative">
                    <div className="bg-gradient-cta flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold text-white">
                      {(currentUser?.name ?? authUser?.name ?? "U")[0]}
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{currentUser?.name ?? authUser?.name}</p>
                    <p className="text-sm text-muted-foreground">{currentUser?.email ?? authUser?.email}</p>
                    <Badge variant="secondary" className="mt-2 capitalize">{currentUser?.role ?? authUser?.role}</Badge>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input {...register("name")} className={errors.name ? "border-destructive" : ""} disabled={isBootstrapping} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Email</label>
                    <Input {...register("email")} type="email" className={errors.email ? "border-destructive" : ""} disabled />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium">Bio</label>
                  <textarea
                    {...register("bio")}
                    rows={4}
                    placeholder="Tell us a bit about yourself..."
                    className="flex w-full resize-none rounded-2xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    disabled={isBootstrapping}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium">Skills</label>
                  <Input {...register("skills")} placeholder="e.g. Python, React, Data Analysis" disabled={isBootstrapping} />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">LinkedIn Profile</label>
                    <Input {...register("linkedin")} placeholder="https://linkedin.com/in/..." disabled={isBootstrapping} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">GitHub Profile</label>
                    <Input {...register("github")} placeholder="https://github.com/..." disabled={isBootstrapping} />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium">Portfolio</label>
                  <Input {...register("portfolio")} placeholder="https://yourportfolio.com" disabled={isBootstrapping} />
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="premium" type="submit" disabled={isBootstrapping || isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
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
              <CardDescription>Password updates are not yet wired in this frontend flow.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Current Password</label>
                <Input type="password" placeholder="Enter current password" disabled />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">New Password</label>
                <Input type="password" placeholder="Enter new password" disabled />
              </div>
              <Button variant="outline" disabled>Update Password</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
