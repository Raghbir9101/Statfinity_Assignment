import type { Metadata } from "next";
import NextTopLoader from 'nextjs-toploader';
import "./globals.css";
import { Suspense } from "react";

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
        <Suspense>
          <NextTopLoader />
          {children}
        </Suspense>
      </body>
    </html>
  );
}
