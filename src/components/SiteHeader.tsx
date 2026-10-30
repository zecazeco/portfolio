import Link from "next/link";
import { profile } from "@/data/profile";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link href="/" className="brand">
          {profile.name}
        </Link>
      </div>
    </header>
  );
}
