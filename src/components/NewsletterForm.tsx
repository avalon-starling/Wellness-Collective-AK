"use client";

import { FormEvent, useState } from "react";

export function NewsletterForm({ source = "footer" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return <p className="font-serif italic text-sm text-cream/80">You&rsquo;re on the list — welcome.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className="min-w-0 flex-1 rounded-pill border border-cream/25 bg-transparent px-4 py-2.5 font-sans text-sm text-cream placeholder:text-cream/40 outline-none focus:border-cream/60"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="shrink-0 rounded-pill bg-rose px-5 py-2.5 font-sans text-[11px] tracking-widest uppercase font-semibold text-deep disabled:opacity-60"
      >
        {status === "loading" ? "…" : "Join"}
      </button>
      {status === "error" && <span className="sr-only">Something went wrong — try again.</span>}
    </form>
  );
}
