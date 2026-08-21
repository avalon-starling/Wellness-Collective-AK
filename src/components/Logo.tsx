import Link from "next/link";
import { FlowerOfLife } from "./FlowerOfLife";

export function Logo({ dark = true, href = "/" }: { dark?: boolean; href?: string }) {
  const fg = dark ? "text-cream" : "text-ink";
  const fgSoft = dark ? "text-cream/60" : "text-inkSoft";
  return (
    <Link href={href} className="flex items-center gap-3">
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-full border ${
          dark ? "border-cream/40 bg-deep" : "border-ink/20 bg-cream"
        }`}
      >
        <FlowerOfLife size={26} stroke={dark ? "#c4978a" : "#3a2954"} opacity={1} strokeWidth={0.9} />
      </span>
      <span className="leading-[1.05]">
        <span className={`block font-display text-lg tracking-wide ${fg}`}>The Wellness Collective</span>
        <span className={`block font-sans text-[9px] tracking-[0.25em] uppercase mt-0.5 ${fgSoft}`}>
          Alaska · Est. 2026
        </span>
      </span>
    </Link>
  );
}
