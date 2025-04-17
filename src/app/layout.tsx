import type { Metadata } from "next";
import "./globals.css";
import { ThemeModeScript } from "flowbite-react";
import { CustomFooter } from "@/components/CustomFooter";

export const metadata: Metadata = {
  title: "NationsInfo",
  description: "NextJS application for searching up countries and their information",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
      </head>
      <body>
        {children}
        <CustomFooter />
      </body>
    </html>
  );
}
