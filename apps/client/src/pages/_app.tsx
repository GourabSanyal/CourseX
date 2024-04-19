import "@/styles/globals.css";
import axios from "axios";
import type { AppProps } from "next/app";
import {
  RecoilRoot,
  useSetRecoilState,
  useRecoilValue,
} from "recoil";
import {
  adminState,
  isAdminLoading,
  isUserLoading,
  userEmailState,
  userState,
} from "store";
import { useEffect, useState } from "react";
import Appbar from "@/components/AppBar";
import AdminAppBar from "@/components/AdminAppBar/AdminAppBar";
import UserAppBar from "@/components/UserAppBar/UserAppBar";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <RecoilRoot>
      <App2 Component={Component} pageProps={pageProps} router={router} />
    </RecoilRoot>
  );
}

function App2({ Component, pageProps }: AppProps) {
  const { router, ...restPageProps } = pageProps;

  const userLoading = useRecoilValue(isUserLoading);
  const adminLoading = useRecoilValue(isAdminLoading);

  const isAdmin = useRecoilValue(adminState).username
  const isUser = useRecoilValue(userState).username

  if (userLoading && adminLoading) {
    return (
      <div>
        Loading...
        <InitUser />
      </div>
    );
  }
  return (
    <div>
      {isAdmin ? <AdminAppBar /> : isUser ? <UserAppBar /> : <Appbar />}
      <Component {...restPageProps} />
    </div>
  );
}

function InitUser() {
  const setUser = useSetRecoilState(userState);
  const setAdmin = useSetRecoilState(adminState)
  const init = async () => {
    try {
      const response = await axios.get(`/api/auth/me`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!response.data) {
        setUser({
          isLoading: false,
          userEmail: response.data.email,
          username: response.data.username,
        })
        setAdmin({
          isLoading: false,
          userEmail: response.data.email,
          username: response.data.username,
        })
      } else if (response.data.role === 'user' ) {
        setAdmin({
          isLoading: false,
          userEmail: '',
          username: ''
        })
        setUser({
          isLoading: false,
          userEmail: response.data.email,
          username: response.data.username,
        })
      }
      else if(response.data.role === 'admin') {
        setUser({
          isLoading: false,
          userEmail: '',
          username: ''
        })
        setAdmin({
          isLoading: false,
          userEmail: response.data.email,
          username: response.data.username
        })
      }
    } catch (error) {
      setUser({
        isLoading: false,
        userEmail: null,
        username: null,
      });
    }
  };
  useEffect(() => {
    init();
  }, []);
  return <></>;
}
