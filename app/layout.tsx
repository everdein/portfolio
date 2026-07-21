import type { Metadata } from "next";
import "./case-study.css";
import "./globals.css";

const themeScript = `
  (function () {
    try {
      var savedTheme = window.localStorage.getItem("matthew-clark-portfolio-theme");
      var preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      document.documentElement.dataset.theme =
        savedTheme === "light" || savedTheme === "dark"
          ? savedTheme
          : preferredTheme;
    } catch (error) {
      document.documentElement.dataset.theme = "light";
    }
  })();
`;

const title = "Matthew Clark | Lead Software Engineer";
const description =
  "Lead Software Engineer Matthew Clark's portfolio, featuring frontend architecture for complex customer-facing workflows, measurable production impact, and verified full-stack case studies.";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://everdein.github.io/portfolio";
const socialImage = `${siteUrl}/og.png?v=fd00e92e`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title,
    description,
    images: [
      {
        url: socialImage,
        width: 1731,
        height: 909,
        alt: "Matthew Clark, Lead Software Engineer — systems, product, and evidence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
