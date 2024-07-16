import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Appbar from "@/components/appbar/common/AppBar";
import { SessionProvider, useSession } from "next-auth/react";
import { Session } from "next-auth";

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
      <Appbar />
      <Component {...pageProps} />
    </div>
  );
}

// export default function App({ Component, pageProps, router }: AppProps) {
//   return (
//     <SessionProvider>
//       <RecoilRoot>
//         <App2 Component={Component} pageProps={pageProps} router={router} />
//       </RecoilRoot>
//     </SessionProvider>
//   );
// }

// function App2({ Component, pageProps }: AppProps) {
//   const { router, ...restPageProps } = pageProps;

//   const userLoading = useRecoilValue(isUserLoading);
//   const adminLoading = useRecoilValue(isAdminLoading);

//   const isAdmin = useRecoilValue(adminState).username;
//   const isUser = useRecoilValue(userState).username;

//   if (userLoading && adminLoading) {
//     return (
//       <div>
//         Loading...
//         <InitUser />
//       </div>
//     );
//   }
//   return (
//     <div>
//       {isUser ? <UserAppBar /> : isAdmin ? <AdminAppBar /> : <Appbar />}
//       <Component {...restPageProps} />
//     </div>
//   );
// }

// function InitUser() {
//   const setUser = useSetRecoilState(userState);
//   const setAdmin = useSetRecoilState(adminState);
//   const init = async () => {
//     try {
//       const response = await axios.get(`/api/auth/me`, {
//         headers: {
//           Authorization: "Bearer " + localStorage.getItem("token"),
//         },
//       });
//       if (!response.data) {
//         setUser({
//           isLoading: false,
//           userEmail: response.data.email,
//           username: response.data.username,
//         });
//         setAdmin({
//           isLoading: false,
//           userEmail: response.data.email,
//           username: response.data.username,
//         });
//       } else if (response.data.role === "user") {
//         setAdmin({
//           isLoading: false,
//           userEmail: "",
//           username: "",
//         });
//         setUser({
//           isLoading: false,
//           userEmail: response.data.email,
//           username: response.data.username,
//         });
//       } else if (response.data.role === "admin") {
//         setUser({
//           isLoading: false,
//           userEmail: "",
//           username: "",
//         });
//         setAdmin({
//           isLoading: false,
//           userEmail: response.data.email,
//           username: response.data.username,
//         });
//       }
//     } catch (error) {
//       setUser({
//         isLoading: false,
//         userEmail: null,
//         username: null,
//       });
//       setAdmin({
//         isLoading: false,
//         userEmail: null,
//         username: null,
//       });
//     }
//   };
//   useEffect(() => {
//     init();
//   }, []);
//   return <></>;
// }
