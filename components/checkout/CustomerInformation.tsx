import { Input } from "@/components/ui/Input";
import type { CheckoutErrors, CheckoutValues } from "@/types/cart";

interface Props { values: CheckoutValues; errors: CheckoutErrors; onChange: (patch: Partial<CheckoutValues>) => void }

export function CustomerInformation({ values, errors, onChange }: Props) {
  return (
    <fieldset className="space-y-5">
      <legend className="mb-5 font-serif text-[1.9rem] text-ink">Your details</legend>
      <Input id="fullName" label="Full name" autoComplete="name" value={values.fullName} error={errors.fullName} onChange={(e) => onChange({ fullName: e.target.value })} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Input id="email" label="Email" type="email" autoComplete="email" inputMode="email" value={values.email} error={errors.email} onChange={(e) => onChange({ email: e.target.value })} />
        <Input id="phone" label="Phone number" type="tel" autoComplete="tel" inputMode="tel" hint="For example 024 000 0000" value={values.phone} error={errors.phone} onChange={(e) => onChange({ phone: e.target.value })} />
      </div>
    </fieldset>
  );
}
