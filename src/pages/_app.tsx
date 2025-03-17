import { ThemeProvider } from "src/lib/theme";
import { SessionProvider } from "next-auth/react";
import "../styles/loading-icon.css";
import "../styles/pagination.css";
import { AppProps } from "next/app";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "800"],
  display: "swap",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider>
        <main className={openSans.className}>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
