import { notFound } from "next/navigation";

// Old area pages, kept so links already sent still work: they redirect to the filtered home
const redirects: Record<string, string> = { xr: "xr", frontend: "front" };

type Props = { params: Promise<{ vitrine: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(redirects).map((vitrine) => ({ vitrine }));
}

export const metadata = { robots: { index: false, follow: false } };

export default async function Page({ params }: Props) {
  const param = redirects[(await params).vitrine];
  if (!param) notFound();
  const href = `/jlhaas/?${param}`;
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${href}`} />
      <script dangerouslySetInnerHTML={{ __html: `location.replace(${JSON.stringify(href)})` }} />
      <p className="container">
        <a href={href}>Ver projetos</a>
      </p>
    </>
  );
}
