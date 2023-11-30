import { Signup } from "ui";
import axios from "axios";
import { userState } from "store";
import { useRouter } from "next/navigation";
import {useEffect} from "react";
import { useSetRecoilState } from "recoil";

export default function SignPage() {

  const router = useRouter();

  return (
    <div>
      <Signup
        onClick={async (email, password) => {
          const response = await axios.post("/api/auth/signup", {
            email,
            password,
          });
          localStorage.setItem("token", response.data.token);
          router.push("/courses");        
        }}
      />
    </div>
  );
}
