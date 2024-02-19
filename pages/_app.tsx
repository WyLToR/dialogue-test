import ContextProvider from "@/components/contexts/Context";
import { Header } from "@/components/header/Header";
import { Menu } from "@/components/menu/Menu";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ContextProvider>
        <Menu>
          <Header />
          <main>
            <Component {...pageProps} />
          </main>
        </Menu>
      </ContextProvider>
    </>
  );
}
