import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { Metadata } from "next";
import "../styles/globals.css";

const queryClient = new QueryClient();

export const metadata: Metadata = {
  title: "Pok-Evan App",
  description: "A simple app to explore for Pokémon",
};
// _app.js
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};
export default MyApp;
