"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/ui/card";
import { Mail, Phone, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1200));
    setSuccess(true);
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Get in Touch</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">Have a question, idea, or just want to say hello? We'd love to hear from you.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          {[
            { icon: Mail, label: "Email Us", value: "hello@careerpilot.ai" },
            { icon: Phone, label: "Call Us", value: "+1 (555) 000-0000" },
            { icon: MessageSquare, label: "Live Chat", value: "Available 9am–6pm EST" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-xl text-primary">
                <item.icon size={22} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="font-medium">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <GlassCard className="p-8">
          {success ? (
            <div className="text-center space-y-4 py-8">
              <CheckCircle2 className="h-16 w-16 text-success mx-auto" />
              <h3 className="text-2xl font-bold">Message Sent!</h3>
              <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Name</label>
                  <Input {...register("name")} placeholder="John Doe" className={errors.name ? "border-destructive" : ""} />
                  {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Email</label>
                  <Input {...register("email")} type="email" placeholder="john@example.com" className={errors.email ? "border-destructive" : ""} />
                  {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Subject</label>
                <Input {...register("subject")} placeholder="What's on your mind?" className={errors.subject ? "border-destructive" : ""} />
                {errors.subject && <p className="text-xs text-destructive">{errors.subject.message}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Message</label>
                <textarea
                  {...register("message")}
                  rows={5}
                  placeholder="Tell us more..."
                  className={`flex w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 resize-none ${errors.message ? "border-destructive" : "border-input"}`}
                />
                {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
              </div>
              <Button variant="premium" className="w-full" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : <><Send className="mr-2 h-4 w-4" /> Send Message</>}
              </Button>
            </form>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
