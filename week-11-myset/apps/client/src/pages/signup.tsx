import { Signup } from "ui";
import axios from "axios";
import { userState } from "store";
import { useRouter } from "next/navigation";
import {useEffect} from "react";
import { useSetRecoilState } from "recoil";

export default function SignPage() {
  const setUser = useSetRecoilState(userState)
  const router = useRouter();

  return (
    <div>
      <Signup
        onClick={async (username, email, password) => {
          const response = await axios.post("/api/auth/signup", {
            username,
            email,
            password,
          });
          localStorage.setItem("token", response.data.token);
          setUser({isLoading: false, userEmail: email})
          router.push("/courses");        
        }}
      />
    </div>
  );
}
