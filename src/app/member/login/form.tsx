"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, Button } from "@/components/ui";

async function handleLogin(email: string, password: string) {
  const res = await fetch("/api/member/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Login failed");
  }

  return res.json();
}

export function MemberLoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const email = new FormData(form).get("email") as string;
    const password = new FormData(form).get("password") as string;

    try {
      await handleLogin(email, password);
      router.push("/member/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-4">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <Field
        label="Email"
        name="email"
        type="email"
        required
        disabled={loading}
      />

      <Field
        label="Password"
        name="password"
        type="password"
        required
        disabled={loading}
      />

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Logging in..." : "Log in"}
      </Button>
    </form>
  );
}
