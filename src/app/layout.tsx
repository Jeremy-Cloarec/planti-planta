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
      <body className="flex flex-col items-center min-h-dvh"
      >
        {children}
      </body>
    </html>
  );
}
