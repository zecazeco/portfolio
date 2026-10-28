import Link from "next/link";
import { profile } from "@/data/profile";
import { vitrines } from "@/data/vitrines";

export function SiteHeader({ active }: { active?: string }) {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link href="/" className="brand">
          {profile.name}
        </Link>
        <nav aria-label="Áreas">
          {vitrines.map((v) => (
            <Link
              key={v.slug}
              href={v.slug === "geral" ? "/" : `/${v.slug}/`}
              aria-current={v.slug === active ? "page" : undefined}
            >
              {v.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
