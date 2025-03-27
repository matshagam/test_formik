import React, { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react"; // Импорт ChakraProvider и функций для темы

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};

export default ThemeProvider;
