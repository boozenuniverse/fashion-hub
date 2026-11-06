import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface FieldProps { label: string; error?: string; hint?: string; id: string }

const describedBy = (id: string, error?: string, hint?: string) => [error ? `${id}-error` : "", hint ? `${id}-hint` : ""].filter(Boolean).join(" ") || undefined;

export function Input({ label, error, hint, id, className = "", ...rest }: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-semibold text-ink">{label}</label>
      <input id={id} className="field" aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, error, hint)} {...rest} />
      {hint && !error && <p id={`${id}-hint`} className="mt-1.5 text-[13px] text-muted">{hint}</p>}
      {error && <p id={`${id}-error`} className="mt-1.5 text-[13px] font-medium text-[#9b2c2c]">{error}</p>}
    </div>
  );
}

export function TextArea({ label, error, hint, id, className = "", ...rest }: FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-semibold text-ink">{label}</label>
      <textarea id={id} className="field min-h-[110px]" aria-invalid={error ? true : undefined} aria-describedby={describedBy(id, error, hint)} {...rest} />
      {hint && !error && <p id={`${id}-hint`} className="mt-1.5 text-[13px] text-muted">{hint}</p>}
      {error && <p id={`${id}-error`} className="mt-1.5 text-[13px] font-medium text-[#9b2c2c]">{error}</p>}
    </div>
  );
}
