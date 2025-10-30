import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata = {
  title: "Veritas Hire",
  description: "AI-powered resume and job match analysis",
  icons: {
    icon: "/vh-logo.png",
    shortcut: "/vh-logo.png",
    apple: "/vh-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/vh-logo.png" sizes="any" />
      </head>
      <ClientLayout>{children}</ClientLayout>
    </html>
  );
}
