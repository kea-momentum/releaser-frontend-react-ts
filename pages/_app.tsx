import type { AppProps } from "next/app";
import { GlobalStyle } from "@/styles/global-style";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { env } from "process";
import { RecoilRoot } from "recoil";
import { useState, useEffect, useRef } from "react";
import { connectStomp } from "@/util/socket/stomp";

export default function App({ Component, pageProps }: AppProps) {
  const [email, setEmail] = useState<string | null>(null);
  const [message, setMessage] = useState<JSON>();
  
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    if(storedEmail) {
      setEmail(storedEmail);
    }
  }, []);
  useEffect(() => {
    console.log(">>> Email: ", email);
    if(email) {
      connectStomp({email, setMessageCallback: (receivedMessage: JSON) => {
        setMessage(receivedMessage);
      }});
    }
  }, [email]);
  useEffect(() => {
    console.log(">>> Notification Message\n", message);
  }, [message]);

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
