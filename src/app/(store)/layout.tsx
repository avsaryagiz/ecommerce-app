import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono, MuseoModerno } from "next/font/google";
import "../globals.css";
import { DisableDraftMode } from "@/components/disable-draft-mode";
import { Header } from "@/components/layout";
import { SanityLive } from "@/sanity/lib/live";
import type { Metadata } from "next";

const museoModerno = MuseoModerno({
  variable: "--font-museo-moderno",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Zera",
    default: "E-commerce | Zera",
  },

  description:
    "Zera brings you the newest fashion in t-shirts, jackets, shoes, pants, shirts and accessories. Perfect blend of style and comfort for everyone.",
  robots: "index, follow",
  openGraph: {
    title: "E-commerce | Zera",
    description:
      "Zera brings you the newest fashion in t-shirts, jackets, shoes, pants, shirts and accessories. Perfect blend of style and comfort for everyone.",
    type: "website",
    url: "https://ecommerce-app-eta-rose.vercel.app/",
    siteName: "ecommerce-app-eta-rose.vercel.app",
    locale: "en_US",
    images: [
      {
        url: "https://ecommerce-app-eta-rose.vercel.app/images/og.png",
        width: 1200,
        height: 630,
        alt: "Zera Logo",
        type: "image/png",
      },
    ],
  },
  twitter: {
    title: "E-commerce | Zera",
    description:
      "Zera brings you the newest fashion in t-shirts, jackets, shoes, pants, shirts and accessories. Perfect blend of style and comfort for everyone.",
    card: "summary_large_image",
    creator: "@zeraEcommerce",
    creatorId: "zeraEcommerce",
    site: "@zeraEcommerce",
    siteId: "@zeraEcommerce",
    images: [
      {
        url: "https://ecommerce-app-eta-rose.vercel.app/images/og.png",
        width: 1200,
        height: 630,
        alt: "Zera Logo",
        type: "image/png",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${museoModerno.variable} antialiased`}
        >
          <Header />
          {children}
          <SanityLive />
          {(await draftMode()).isEnabled && (
            <>
              <VisualEditing />
              <DisableDraftMode />
            </>
          )}
        </body>
      </html>
    </ClerkProvider>
  );
}
