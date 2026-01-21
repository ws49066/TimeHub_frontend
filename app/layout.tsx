import type { Metadata } from "next";
import { Montserrat } from 'next/font/google'
import "./globals.css";
import { AuthHydrate } from "../shared/auth/AuthHydrate";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'TimeHub',
  description: 'Sistema de Agendamentos',
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
     <body className={`${montserrat.variable} antialiased`}>
        <AuthHydrate />
        {children}
      </body>
    </html>
  );
}
