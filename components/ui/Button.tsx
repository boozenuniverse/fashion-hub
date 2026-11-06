import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "light" | "ghost-light";
type Size = "md" | "sm";

interface Common { variant?: Variant; size?: Size; className?: string; children: ReactNode }
type AsLink = Common & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;
type AsButton = Common & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `btn btn-${variant}${size === "sm" ? " btn-sm" : ""} ${extra}`.trim();
}

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", size = "md", className = "", children, ...rest } = props;
  const cls = buttonClass(variant, size, className);
  if (typeof props.href === "string") {
    const { href, ...anchor } = rest as Omit<AsLink, keyof Common>;
    return <Link href={href} className={cls} {...anchor}>{children}</Link>;
  }
  const { href: _unused, type = "button", ...button } = rest as Omit<AsButton, keyof Common>;
  void _unused;
  return <button type={type} className={cls} {...button}>{children}</button>;
}
