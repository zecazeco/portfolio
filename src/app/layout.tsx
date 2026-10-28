import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = Roboto_Mono({ subsets: ["latin"], variable: "--font-mono" });

const GA_ID = "G-MVBVY3HF97";

export const metadata: Metadata = {
  title: "José Luís Haas — Creative Developer",
  description: "Portfólio de José Luís Haas: realidade aumentada, realidade virtual, 3D na web, front-end e jogos.",
  // Not indexed: also sent as X-Robots-Tag by Netlify
  robots: { index: false, follow: false, nocache: true },
  icons: { icon: "/jlhaas/favicon-32x32.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${mono.variable}`}>
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
