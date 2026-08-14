import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

export function Eyebrow({
  children,
  tone = "rose",
}: {
  children: ReactNode;
  tone?: "rose" | "sage" | "plum";
}) {
  const color = { rose: "text-rose", sage: "text-sage", plum: "text-plum" }[tone];
  const bg = { rose: "bg-rose", sage: "bg-sage", plum: "bg-plum" }[tone];
  return (
    <div className={`flex items-center gap-3 font-sans text-[11px] tracking-[0.25em] uppercase font-medium ${color}`}>
      <span className={`h-px w-6 ${bg}`} />
      {children}
    </div>
  );
}

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-pill font-sans text-xs tracking-[0.15em] uppercase font-semibold px-7 py-4 transition-colors";

type ButtonVariant = "solid" | "outline" | "outlineDark" | "ghost";

const variants: Record<ButtonVariant, string> = {
  solid: "bg-rose text-deep hover:bg-cream",
  outline: "bg-transparent text-cream border border-cream/40 hover:border-cream",
  outlineDark: "bg-transparent text-ink border border-ink hover:bg-ink hover:text-cream",
  ghost: "bg-transparent text-ink hover:bg-ink/5",
};

export function ButtonLink({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  return (
    <Link href={href} className={`${buttonBase} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "solid",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return (
    <button className={`${buttonBase} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function Pill({ children, tone = "sage" }: { children: ReactNode; tone?: "sage" | "rose" | "plum" | "deep" }) {
  const styles: Record<string, string> = {
    sage: "bg-sage/15 text-sage",
    rose: "bg-rose/20 text-rose",
    plum: "bg-plum/15 text-plum",
    deep: "bg-deep text-cream",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-pill px-3 py-1 font-sans text-[10px] tracking-widest uppercase font-semibold ${styles[tone]}`}>
      {children}
    </span>
  );
}

export function SectionEyebrowHeading({
  eyebrow,
  eyebrowTone = "sage",
  title,
  dark = false,
  className = "",
}: {
  eyebrow: ReactNode;
  eyebrowTone?: "rose" | "sage" | "plum";
  title: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>
      <h2
        className={`font-display font-normal text-4xl md:text-5xl mt-4 tracking-tight leading-[1.05] ${
          dark ? "text-cream" : "text-ink"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
