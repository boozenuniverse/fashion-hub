import Link from "next/link";
import type { ReactNode } from "react";

interface Props { title: string; description?: ReactNode; action?: { label: string; href: string }; align?: "left" | "center"; as?: "h1" | "h2"; onDark?: boolean }

export function SectionHeading({ title, description, action, align = "left", as: Tag = "h2", onDark }: Props) {
  const center = align === "center";
  return (
    <div className={`mb-10 flex flex-col gap-4 ${center ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between"}`}>
      <div className={center ? "max-w-2xl" : "max-w-2xl"}>
        <Tag className={`h-section ${onDark ? "text-cream!" : ""}`}>{title}</Tag>
        {description && <p className={`mt-3 ${onDark ? "text-sand" : "lead"} ${center ? "mx-auto" : ""}`}>{description}</p>}
      </div>
      {action && <Link href={action.href} className={`link-quiet shrink-0 font-ui text-[12px] font-semibold uppercase tracking-[0.12em] ${onDark ? "text-cream!" : ""}`}>{action.label}</Link>}
    </div>
  );
}
