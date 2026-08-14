"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/content";
import { Logo } from "./Logo";

export function Nav({ dark = true }: { dark?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const fg = dark ? "text-cream" : "text-ink";
  const fgSoft = dark ? "text-cream/65" : "text-inkSoft";

  return (
    <header className="relative z-20">
      <div className="flex items-center justify-between gap-6 px-6 py-6 md:px-14">
        <Logo dark={dark} />

        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.href || pathname?.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative py-2 font-sans text-[11px] tracking-[0.18em] uppercase ${
                  active ? fg : fgSoft
                } ${dark ? "hover:text-cream" : "hover:text-ink"}`}
              >
                {l.label}
                {active && (
                  <span className="absolute left-1/2 -bottom-0.5 h-1 w-1 -translate-x-1/2 rounded-full bg-rose" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/apply"
            className={`rounded-pill border px-4 py-2.5 font-sans text-[11px] tracking-[0.15em] uppercase ${
              dark ? "border-cream/40 text-cream" : "border-ink/30 text-ink"
            }`}
          >
            Apply
          </Link>
          <Link
            href="/join-the-collective"
            className="rounded-pill bg-rose px-4 py-2.5 font-sans text-[11px] tracking-[0.15em] uppercase font-semibold text-deep"
          >
            Join the Collective
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className={`lg:hidden flex h-10 w-10 items-center justify-center rounded-full border ${
            dark ? "border-cream/40 text-cream" : "border-ink/30 text-ink"
          }`}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className={`lg:hidden mx-6 mb-6 rounded-2xl border p-6 ${dark ? "bg-deep border-cream/15" : "bg-paper border-rule"}`}>
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`font-serif italic text-xl ${fg}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/apply"
              onClick={() => setOpen(false)}
              className={`rounded-pill border px-4 py-3 text-center font-sans text-xs tracking-[0.15em] uppercase ${
                dark ? "border-cream/40 text-cream" : "border-ink/30 text-ink"
              }`}
            >
              Apply
            </Link>
            <Link
              href="/join-the-collective"
              onClick={() => setOpen(false)}
              className="rounded-pill bg-rose px-4 py-3 text-center font-sans text-xs tracking-[0.15em] uppercase font-semibold text-deep"
            >
              Join the Collective
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
