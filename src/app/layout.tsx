import type { Metadata } from "next";
import { ChakraProvider } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "Лабецкий Недвижимость",
  description: "Форма с валидацией",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  );
}
