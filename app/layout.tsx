import type { Metadata } from "next";
import { headers } from "next/headers";
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

const title = "Matthew Clark | Software Engineer";
const description =
  "Engineering portfolio for Matthew Clark, featuring accessible frontend systems, production-minded full-stack work, and verifiable project evidence.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") || host.startsWith("127.0.0.1")
      ? "http"
      : "https");
  const socialImage = `${protocol}://${host}/og.png`;

  return {
    title,
    description,
    openGraph: {
      type: "website",
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
}

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
