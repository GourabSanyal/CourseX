import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import {AppBar} from '@/components/appbar/common/AppBar';
import { SessionProvider, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { Toaster } from "sonner";

export default function App({
  Component,
  pageProps,
  router
}: AppProps<{
  session: Session | null;
}>) {
  return (
    <SessionProvider session={pageProps.session}>
      <RecoilRoot>
        <AppWrapper Component={Component} pageProps={pageProps} router={router} />
      </RecoilRoot>
    </SessionProvider>
  );
}

function AppWrapper({ 
  Component, 
  pageProps,
  router
}: AppProps) {
  const {data: session, status} = useSession()

  if (status === "loading"){
    return(
      <div >
        Loading . . .
      </div>
    )
  }
  return (
    <div>
      <AppBar />
      <Component {...pageProps} />
      <Toaster />
    </div>
  );
}