import type { Metadata } from "next";
import "./case-study.css";
import "./globals.css";

const themeScript = `
  (function () {
    try {
      var savedTheme = window.localStorage.getItem("matthew-clark-portfolio-theme");
      document.documentElement.dataset.theme =
        savedTheme === "light" || savedTheme === "dark"
          ? savedTheme
          : "dark";
    } catch (error) {
      document.documentElement.dataset.theme = "dark";
    }
  })();
`;

const title = "Matthew Clark | Senior Software Engineer";
const description =
  "Senior Software Engineer Matthew Clark's portfolio: system design, application architecture, full-stack development, enterprise integrations, and technical leadership, supported by engineering evidence and independent projects.";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://everdein.github.io/portfolio";
const socialImage = `${siteUrl}/og-20261023.png`;

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
        alt: "Matthew Clark, Senior Software Engineer — system design, application architecture, and full-stack development",
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
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
