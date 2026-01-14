import "./globals.css";

import ClientLayout from "@/components/ClientLayout";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Veritas Hire",
    template: "%s | Veritas Hire",
  },
  description: "AI-powered resume and job match analysis",
  icons: {
    icon: [
      {
        url: "/vh-logo.png",
        type: "image/png",
        sizes: "1024x1024",
      },
    ],
    apple: [
      {
        url: "/vh-logo.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: "/vh-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
      </body>
    </html>
  );
}
