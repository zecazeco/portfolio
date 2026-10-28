import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VitrinePage } from "@/components/VitrinePage";
import { getVitrine, homeVitrine, vitrines } from "@/data/vitrines";

type Props = { params: Promise<{ vitrine: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return vitrines.filter((v) => v !== homeVitrine).map((v) => ({ vitrine: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const vitrine = getVitrine((await params).vitrine);
  return { title: `José Luís Haas — ${vitrine?.title}` };
}

export default async function Page({ params }: Props) {
  const vitrine = getVitrine((await params).vitrine);
  if (!vitrine || vitrine === homeVitrine) notFound();
  return <VitrinePage vitrine={vitrine} />;
}
