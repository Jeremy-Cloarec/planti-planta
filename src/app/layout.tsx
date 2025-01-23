import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Planti Planta",
  description: "Un site de vente de plantes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="flex flex-col min-h-dvh gap-8"
      >
        {children}
      </body>
    </html>
  );
}
