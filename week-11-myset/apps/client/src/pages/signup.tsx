import { Signup } from "ui";
import axios from "axios";
import { userState } from "store";
import { useRouter } from "next/navigation";
import {useEffect, useState} from "react";
import { useSetRecoilState } from "recoil";

export default function SignPage() {
  const setUser = useSetRecoilState(userState)
  const router = useRouter();
  const [onError, setOnError] = useState<string | null | undefined>(null);

  const signUp = async (username: string, email: string, password: string): Promise<void> => {
    try {
      const response = await axios.post("/api/auth/user/signup", {
        username,
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setUser({ isLoading: false, userEmail: email });
      // router.push("/courses");
      console.log('res --> ',response);
      
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        setOnError(error.response.data.message)
      }
    }
  }

  return (
    <div>
      <Signup
        onSubmit={signUp}
        onError={onError}
      />
    </div>
  );
}
