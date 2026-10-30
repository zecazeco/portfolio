import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const mono = Roboto_Mono({ subsets: ["latin"], variable: "--font-mono" });

const GA_ID = "G-MVBVY3HF97";

export const metadata: Metadata = {
  title: "José Luís Haas — Creative Developer",
  description: "Portfólio de José Luís Haas: realidade aumentada, realidade virtual, 3D na web, front-end e jogos.",
  // Not indexed: also sent as X-Robots-Tag by Netlify
  robots: { index: false, follow: false, nocache: true },
  icons: { icon: { url: "/jlhaas/icon.svg", type: "image/svg+xml" } },
  // Link preview (LinkedIn, WhatsApp, X): contour lines from the hero shader with the name
  metadataBase: new URL("https://vangrog.com"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/jlhaas/",
    siteName: "José Luís Haas",
    title: "José Luís Haas — Creative Developer",
    description: "Portfólio de José Luís Haas: realidade aumentada, realidade virtual, 3D na web, front-end e jogos.",
    images: [{ url: "/jlhaas/og.png", width: 1200, height: 627, alt: "José Luís Haas, Creative Developer" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-filter on <html> is set before hydration by the home page script (HomePage.tsx)
    <html lang="pt-BR" className={mono.variable} suppressHydrationWarning>
      <body>
        {children}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="gtag" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
        </Script>
      </body>
    </html>
  );
}
