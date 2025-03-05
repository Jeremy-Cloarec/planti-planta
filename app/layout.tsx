import type { Metadata } from "next";
import "./globals.css";
import { ContextProvider } from "@/app/context/ContextProvider"
import { jaldiRegular, crimson, jaldiBold } from "@/app/ui/fonts"
import { Analytics } from "@vercel/analytics/next"

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
      <body className={`${jaldiRegular.className} ${crimson.variable} ${jaldiBold.variable} antialiased flex flex-col items-center min-h-dvh relative`}
      >
        <ContextProvider>
          {children}
        </ContextProvider>
        <Analytics />
      </body>
    </html>
  );
}
