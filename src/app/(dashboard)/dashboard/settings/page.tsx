"use client";

import { useAuthStore } from "@/store/authStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { User, Bell, Lock, Palette, CheckCircle2 } from "lucide-react";
import { useState } from "react";

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

export default function SettingsPage() {
  const { user } = useAuthStore();
  const [saved, setSaved] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      bio: "",
      skills: "React, TypeScript, Next.js",
      github: "",
      linkedin: "",
      portfolio: ""
    },
  });

  const onSave = async (_data: ProfileForm) => {
    void _data;
    await new Promise((r) => setTimeout(r, 800));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const sections = [
    { icon: User, label: "Profile" },
    { icon: Bell, label: "Notifications" },
    { icon: Lock, label: "Security" },
    { icon: Palette, label: "Appearance" },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        <nav className="md:col-span-1 space-y-1">
          {sections.map((s, i) => (
            <button key={i} className={`flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${i === 0 ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"}`}>
              <s.icon className="h-4 w-4" /> {s.label}
            </button>
          ))}
        </nav>

        <div className="md:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details and public profile.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSave)} className="space-y-5">
                <div className="flex items-center gap-6 pb-6 border-b border-border">
                  <div className="relative group">
                    <div className="h-20 w-20 rounded-full bg-[var(--gradient-cta)] flex items-center justify-center text-white font-bold text-2xl shrink-0 cursor-pointer overflow-hidden">
                      {user?.name?.[0] ?? "U"}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-xs font-medium">
                        Upload
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-lg">{user?.name}</p>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                    <Badge variant="secondary" className="mt-1 capitalize">{user?.role}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                    rows={3}
                    placeholder="Tell us a bit about yourself..."
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium">Skills (comma separated)</label>
                  <Input {...register("skills")} placeholder="e.g. Python, React, Data Analysis" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">LinkedIn Profile</label>
                    <Input {...register("linkedin")} placeholder="https://linkedin.com/in/..." />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">GitHub Profile</label>
                    <Input {...register("github")} placeholder="https://github.com/..." />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Button variant="premium" type="submit">Save Changes</Button>
                  {saved && (
                    <span className="flex items-center gap-1.5 text-sm text-success">
                      <CheckCircle2 className="h-4 w-4" /> Saved successfully
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
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">New Password</label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <Button variant="outline">Update Password</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
