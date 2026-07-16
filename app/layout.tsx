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
  "Engineering portfolio for Matthew Clark, featuring accessible frontend systems, production-minded full-stack work, and verifiable project evidence.";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://everdein.github.io/portfolio";
const socialImage = `${siteUrl}/og.png`;

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
        width: 1200,
        height: 630,
        alt: "Matthew Clark engineering portfolio",
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
