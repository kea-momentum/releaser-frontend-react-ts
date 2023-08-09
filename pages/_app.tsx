import type { AppProps } from "next/app";
import { GlobalStyle } from "@/styles/global-style";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { env } from "process";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  const googleClientId: string = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";
  return (
    <RecoilRoot>
      <GoogleOAuthProvider clientId={googleClientId}>
        <CookiesProvider>
          <GlobalStyle />
          <Component {...pageProps} />
        </CookiesProvider>
      </GoogleOAuthProvider>
    </RecoilRoot>
  );
}
