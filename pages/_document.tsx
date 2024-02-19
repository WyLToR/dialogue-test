import { LanguageContext } from "@/components/contexts/LanguageContext";
import { Html, Head, Main, NextScript } from "next/document";
import { useContext } from "react";

export default function Document() {
  const { language } = useContext(LanguageContext);
  return (
    <Html lang={language}>
      <Head />
      <body className="bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-500 dark:fill-gray-500 transition-all duration-500 ease-in-out transform min-w-96">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
