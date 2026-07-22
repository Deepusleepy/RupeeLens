import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const socialImage = `${protocol}://${host}/og.png`;

  return {
    title: "RupeeLens — Follow the money trail",
    description: "A transparent workspace for UPI risk signals, payment-event investigation, and India Union Budget context.",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      title: "RupeeLens",
      description: "Follow the money trail. See every signal and source.",
      type: "website",
      images: [{ url: socialImage, width: 1536, height: 1024, alt: "RupeeLens — Follow the money. See the reason." }],
    },
    twitter: {
      card: "summary_large_image",
      title: "RupeeLens",
      description: "Follow the money trail. See every signal and source.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geist.variable} ${mono.variable}`}>{children}</body></html>;
}
