import type { Metadata } from "next";
import "./globals.css";
import { ContextProvider } from "./context/ContextProvider"
import { jaldiRegular, crimson, jaldiBold } from "./ui/fonts"
import { Analytics } from "@vercel/analytics/next"
import Nav from "./ui/Nav"

export const metadata: Metadata = {
  title: "Planti Planta",
  description: "Un site de vente de plantes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dateYear = new Date()

  return (
    <html lang="fr">
      <body className={`${jaldiRegular.className} ${crimson.variable} ${jaldiBold.variable} antialiased flex flex-col items-center min-h-dvh relative`}
      >
        <ContextProvider>
          <Nav />
          {children}
          <footer className="w-full mt-10">
            <p>
              {dateYear.getFullYear()} -
              <a href="https://github.com/Jeremy-Cloarec" target="_blank"> Jérémy</a>
            </p>
          </footer>
        </ContextProvider>
        <Analytics />
      </body>
    </html>
  );
}
