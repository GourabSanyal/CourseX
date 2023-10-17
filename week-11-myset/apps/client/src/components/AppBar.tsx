import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilValue,  useSetRecoilState } from "recoil";
import { isUserLoading, userEmailState, userState } from "store";
import {useRouter} from 'next/navigation';

function Appbar() {
  const userLoading = useRecoilValue(isUserLoading);
  const userEmail = useRecoilValue(userEmailState);
  const setUser = useSetRecoilState(userState);
  const router = useRouter();
  
  if (userLoading){ 
    return <></>
  }

  if (userEmail) {  
    return <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: 4,
      zIndex: 1
  }}>
      <div style={{marginLeft: 10, cursor: "pointer"}} onClick={() => {
          // navigate("/")
          router.push('/')
      }}>
          <Typography variant={"h6"}>Coursera</Typography>
      </div>

      <div style={{display: "flex"}}>
          <div style={{marginRight: 10, display: "flex"}}>
          <div style={{marginRight: 10}}>
                  <Button
                      onClick={() => {
                          
                      }}
                  >Add course</Button>
              </div>

              <div style={{marginRight: 10}}>
                  <Button
                      onClick={() => {
                          // navigate("/courses")
                          router.push('/')
                      }}
                  >Courses</Button>
              </div>

              <Button
                  variant={"contained"}
                  onClick={() => {
                      localStorage.setItem("token", null);
                      setUser({
                          isLoading: false,
                          userEmail: null
                      })
                  }}
              >Logout</Button>
          </div>
      </div>
  </div>

  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: 4,
        }}
      >
        <div>
          <Typography variant={"h6"}>Coursera</Typography>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10 }}>
            <Button
              variant={"contained"}
              onClick={() => {
                // navigate("/signin");
              }}
            >
              Sign In
            </Button>
          </div>
          <div>
            <Button
              variant={"contained"}
              onClick={() => {
                router.push("/signup");
              }}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Appbar;
