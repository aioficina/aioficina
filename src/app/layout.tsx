import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter for a clean premium look
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aioficina - Área de Membros",
  description: "Plataforma exclusiva para membros Aioficina",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.className} bg-background text-foreground antialiased selection:bg-primary/30`}>
        {children}
      </body>
    </html>
  );
}
