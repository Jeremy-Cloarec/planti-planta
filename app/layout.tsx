
import type { Metadata } from "next";
import "./globals.css";
import { cabinRegular, cormorant, cabinBold } from "@/app/ui/fonts"
import { Analytics } from "@vercel/analytics/next"
import Providers from "./provider";

export const metadata: Metadata = {
  title: "Planti Planta",
  description: "Un site de vente de plantes",
};

export default async function RootLayout({ children }: (Readonly<{
  children: React.ReactNode,
}>)) {

  return (
    <html lang="fr" className="overflow-y-scroll snap-y snap-mandatory">
      <body className={`${cabinRegular.className} ${cormorant.variable} ${cabinBold.variable} antialiased flex flex-col items-center min-h-dvh `}
      >
        <Providers >
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
