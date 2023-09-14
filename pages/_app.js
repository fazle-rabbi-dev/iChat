import "@/styles/globals.css";
import AppProvider from "@/context-api/AppProvider";
import Nav from "components/Nav";

export default function App({ Component, pageProps }) {
  return (
    <AppProvider>
      <Nav />
      <main className="app">
        <Component {...pageProps} />
      </main>
    </AppProvider>
  );
}
