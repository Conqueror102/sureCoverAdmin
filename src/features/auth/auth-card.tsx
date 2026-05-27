"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Activity, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const schema = z.object({
  email: z.string().email("Use a valid work email"),
  password: z.string().min(6, "Use at least 6 characters").optional(),
  otp: z.string().min(6, "Enter the 6-digit code").optional(),
});

type AuthValues = z.infer<typeof schema>;

export function AuthCard({
  mode,
  title,
  description,
}: {
  mode: "login" | "forgot" | "reset" | "otp";
  title: string;
  description: string;
}) {
  const form = useForm<AuthValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "admin@surecova.com", password: "", otp: "" },
  });

  return (
    <Card className="w-full max-w-md rounded-xl border-white/60 bg-white/90 shadow-2xl shadow-teal-950/10 backdrop-blur">
      <CardHeader>
        <div className="mb-5 flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600 text-white">
            <Activity className="h-5 w-5" />
          </span>
          <span className="font-semibold tracking-tight text-slate-950">SureCova</span>
        </div>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <p className="text-sm text-slate-500">{description}</p>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={form.handleSubmit(() => undefined)}>
          {mode !== "otp" ? (
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">Work email</span>
              <Input {...form.register("email")} type="email" />
            </label>
          ) : null}
          {mode === "login" || mode === "reset" ? (
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">{mode === "reset" ? "New password" : "Password"}</span>
              <Input {...form.register("password")} type="password" placeholder="••••••••" />
            </label>
          ) : null}
          {mode === "otp" ? (
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">Verification code</span>
              <Input {...form.register("otp")} inputMode="numeric" placeholder="123456" />
            </label>
          ) : null}
          {mode === "login" ? (
            <div className="rounded-lg border border-teal-100 bg-teal-50 p-3 text-sm text-teal-800">
              <ShieldCheck className="mr-2 inline h-4 w-4" />
              MFA and role-based session controls are enabled for admin access.
            </div>
          ) : null}
          <Button className="w-full">
            {mode === "login" ? "Sign in securely" : mode === "forgot" ? "Send recovery link" : mode === "reset" ? "Reset password" : "Verify session"}
          </Button>
        </form>
        <div className="mt-5 flex justify-between text-sm">
          <Link href="/login" className="font-medium text-teal-700">Login</Link>
          <Link href="/" className="text-slate-500">Return to dashboard</Link>
        </div>
      </CardContent>
    </Card>
  );
}
