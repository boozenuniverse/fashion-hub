import { ghanaRegions } from "@/config/business";
import { Input, TextArea } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type { CheckoutErrors, CheckoutValues } from "@/types/cart";

interface Props { values: CheckoutValues; errors: CheckoutErrors; onChange: (patch: Partial<CheckoutValues>) => void }

export function DeliveryInformation({ values, errors, onChange }: Props) {
  return (
    <fieldset className="space-y-5">
      <legend className="mb-5 font-serif text-[1.9rem] text-ink">Delivery</legend>
      <div className="grid gap-5 sm:grid-cols-2">
        <Select id="region" label="Region" placeholder="Choose your region" options={ghanaRegions} value={values.region} error={errors.region} onChange={(e) => onChange({ region: e.target.value })} autoComplete="address-level1" />
        <Input id="city" label="City or town" autoComplete="address-level2" value={values.city} error={errors.city} onChange={(e) => onChange({ city: e.target.value })} />
      </div>
      <TextArea id="address" label="Delivery address" autoComplete="street-address" hint="Street, area and a nearby landmark or digital address if you have one." value={values.address} error={errors.address} onChange={(e) => onChange({ address: e.target.value })} />
      <TextArea id="instructions" label="Delivery instructions (optional)" maxLength={320} value={values.instructions} error={errors.instructions} onChange={(e) => onChange({ instructions: e.target.value })} />
    </fieldset>
  );
}
