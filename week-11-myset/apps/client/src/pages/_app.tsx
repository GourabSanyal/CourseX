import "@/styles/globals.css";
import axios from "axios";
import type { AppProps } from "next/app";
import { useRecoilState, useRecoilValue } from "recoil";
import { isUserLoading, userState } from "store";
import { useEffect} from 'react'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

function App2({ Component, pageProps}) {
  const userLoading = useRecoilValue(isUserLoading)
  if (isUserLoading){
    return <div>
      Loading...
      <InitUser />
    </div>
  }
  return <AppBar />
}

function InitUser(){
  const setUser = useRecoilState(userState);
  const init = async () => {
    try {
      const response = await axios.get(`/api/auth/me`, {
        headers : {
          "Authorization" : "Barear " + localStorage.getItem("token")
        }
    
      });

      if (response.data.user) {
        setUser({
          isLoading: false,
          userEmail : response.data.user.username
        })
      } else {
        setUser({
          isLoading :  false,
          userEmail : null
        })
      }
      
    } catch (error) {
      setUser({
        isLoading: false,
        userEmail : null
      })
    }
  };
  useEffect(() => {
    InitUser()
  }, [])
  return <></>
};

