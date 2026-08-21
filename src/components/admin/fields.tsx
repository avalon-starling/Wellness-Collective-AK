export function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required,
  placeholder,
  min,
  max,
  step,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number | null;
  required?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <label className="block">
      <span className="font-sans text-[11px] uppercase tracking-widest text-inkSoft">
        {label}
        {required && <span className="text-rose"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue ?? undefined}
        required={required}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        className="mt-1.5 w-full rounded-lg border border-rule bg-white px-3.5 py-2.5 font-sans text-sm text-ink outline-none focus:border-plum"
      />
    </label>
  );
}

export function TextAreaField({
  label,
  name,
  defaultValue,
  required,
  placeholder,
  rows = 4,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="font-sans text-[11px] uppercase tracking-widest text-inkSoft">
        {label}
        {required && <span className="text-rose"> *</span>}
      </span>
      <textarea
        name={name}
        defaultValue={defaultValue ?? undefined}
        required={required}
        placeholder={placeholder}
        rows={rows}
        className="mt-1.5 w-full resize-y rounded-lg border border-rule bg-white px-3.5 py-2.5 font-sans text-sm text-ink outline-none focus:border-plum"
      />
    </label>
  );
}

export function SelectField({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  options: [string, string][];
}) {
  return (
    <label className="block">
      <span className="font-sans text-[11px] uppercase tracking-widest text-inkSoft">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="mt-1.5 w-full rounded-lg border border-rule bg-white px-3.5 py-2.5 font-sans text-sm text-ink outline-none focus:border-plum"
      >
        {options.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
    </label>
  );
}

export function Checkbox({
  label,
  name,
  defaultChecked,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2.5 font-sans text-sm text-ink">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="h-4 w-4 accent-plum" />
      {label}
    </label>
  );
}

export function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="rounded-pill bg-deep px-7 py-3 font-sans text-xs font-semibold uppercase tracking-widest text-cream"
    >
      {children}
    </button>
  );
}
