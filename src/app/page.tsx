"use client";

import FormikForm from "./components/FormikForm";
import ThemeProvider from "./components/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider>
      <FormikForm />
    </ThemeProvider>
  );
}
