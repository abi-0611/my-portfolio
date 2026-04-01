import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { RootLayoutClient } from "@/components/layout/root-layout-client";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import "./globals.css";

// TODO: Add CalSans-SemiBold.woff2 to public/fonts/ and uncomment below
// import localFont from "next/font/local";
// const calSans = localFont({
//   src: "../public/fonts/CalSans-SemiBold.woff2",
//   variable: "--font-cal-sans",
//   display: "swap",
// });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const personSameAs = [
  process.env.NEXT_PUBLIC_GITHUB_URL,
  process.env.NEXT_PUBLIC_LINKEDIN_URL,
  process.env.NEXT_PUBLIC_INSTAGRAM_URL,
].filter((value): value is string => Boolean(value));

const personSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abishek",
  jobTitle: "AI/ML Engineer & Full-Stack Developer",
  url: "https://abishek.dev",
  ...(personSameAs.length > 0 ? { sameAs: personSameAs } : {}),
  knowsAbout: [
    "Machine Learning",
    "Deep Learning",
    "Full-Stack Development",
    "Next.js",
    "Python",
    "TypeScript",
  ],
});

const themeInitScript = `(function(){
  var storageKey = ${JSON.stringify(THEME_STORAGE_KEY)};
  var root = document.documentElement;
  var theme = "dark";

  try {
    var storedTheme = window.localStorage.getItem(storageKey);
    if (storedTheme === "light" || storedTheme === "dark") {
      theme = storedTheme;
    }
  } catch (error) {}

  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
})();`;

export const metadata: Metadata = {
  metadataBase: new URL("https://abishek.dev"),
  title: {
    default: "Abishek | AI/ML Engineer & Full-Stack Developer",
    template: "%s | Abishek",
  },
  description:
    "Portfolio of Abishek — AI/ML Engineer and Full-Stack Developer. Explore projects in machine learning, deep learning, and web development.",
  keywords: [
    "Abishek",
    "AI Engineer",
    "ML Engineer",
    "Full-Stack Developer",
    "Portfolio",
    "Machine Learning",
    "Next.js",
    "React",
  ],
  authors: [{ name: "Abishek" }],
  creator: "Abishek",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abishek.dev",
    siteName: "Abishek Portfolio",
    title: "Abishek | AI/ML Engineer & Full-Stack Developer",
    description:
      "Portfolio of Abishek — AI/ML Engineer and Full-Stack Developer.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abishek Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abishek | AI/ML Engineer & Full-Stack Developer",
    description:
      "Portfolio of Abishek — AI/ML Engineer and Full-Stack Developer.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <Script id="person-schema" type="application/ld+json" strategy="afterInteractive">
          {personSchema}
        </Script>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
