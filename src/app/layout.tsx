import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Форма",
  description: "Форма с валидацией",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
