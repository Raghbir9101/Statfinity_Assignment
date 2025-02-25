import type { Metadata } from "next";
import NextTopLoader from 'nextjs-toploader';
import "./globals.css";

export const metadata: Metadata = {
  title: "PokeDex",
  description: "Get all the information about your favorite Pokemon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <NextTopLoader />
        {children}
      </body>
    </html>
  );
}
