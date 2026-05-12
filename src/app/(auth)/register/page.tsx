"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import { registerSchema, type RegisterInput } from "@/schemas/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import type { ApiResponse, AuthPayload } from "@/types/api";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await api.post<ApiResponse<AuthPayload>>("/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      const email = response.data.data.user.email;
      router.push(`/login?registered=true&email=${encodeURIComponent(email)}`);
    } catch (error) {
      const err = error as AxiosError<{ message?: string; error?: string }>;
      setError(
        err.response?.data?.message ??
        err.response?.data?.error ??
        "Registration failed. Try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container relative flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0 min-h-[calc(100vh-14rem)]">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-[var(--gradient-card)]" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          CareerPilot AI
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Joining CareerPilot was the best decision for my tech career. The roadmap generator is brilliant.&rdquo;
            </p>
            <footer className="text-sm">Alex Chen</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8 flex items-center justify-center h-full pt-12 pb-12">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your details below to get started
            </p>
          </div>

          <GlassCard>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {error && (
                  <div className="p-3 text-sm bg-destructive/10 text-destructive rounded-md">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none" htmlFor="name">Full Name</label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    {...register("name")}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none" htmlFor="email">Email</label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    {...register("email")}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none" htmlFor="password">Password</label>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                    className={errors.password ? "border-destructive" : ""}
                  />
                  {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none" htmlFor="confirmPassword">Confirm Password</label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword")}
                    className={errors.confirmPassword ? "border-destructive" : ""}
                  />
                  {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>}
                </div>

                <Button className="w-full" type="submit" disabled={isLoading} variant="premium">
                  {isLoading ? "Creating account..." : "Sign Up"}
                </Button>
              </form>
            </CardContent>
          </GlassCard>

          <p className="px-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="underline underline-offset-4 hover:text-primary">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
