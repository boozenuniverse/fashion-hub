import type { SelectHTMLAttributes } from "react";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> { label: string; id: string; error?: string; options: readonly string[] | { value: string; label: string }[]; placeholder?: string; hideLabel?: boolean }

export function Select({ label, id, error, options, placeholder, hideLabel, className = "", ...rest }: Props) {
  const items = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  return (
    <div className={className}>
      <label htmlFor={id} className={hideLabel ? "sr-only" : "mb-1.5 block text-[13px] font-semibold text-ink"}>{label}</label>
      <select id={id} className="field appearance-none bg-[length:16px] pr-10" aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-error` : undefined} {...rest}>
        {placeholder && <option value="">{placeholder}</option>}
        {items.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {error && <p id={`${id}-error`} className="mt-1.5 text-[13px] font-medium text-[#9b2c2c]">{error}</p>}
    </div>
  );
}
