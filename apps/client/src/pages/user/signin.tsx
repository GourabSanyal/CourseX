import { Signin } from "ui";
import axios from "axios";
import { userState } from "store";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function UserSignInPage() {
  const [onError, setOnError] = useState("");
  const setUser = useSetRecoilState(userState);
  const router = useRouter();
  // const {data: session, status} = useSession();

  const handleSubmit = async (email: string, password: string) => {
    try {
      const response = await axios.post("/api/auth/user/signin", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      router.push("/user/home");
      let username = response.data.username;
      setUser({ isLoading: false, userEmail: email, username: username });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        let errorRes = error.response.data.message;
        setOnError(errorRes);
      } else {
        console.log("An error occurred: ", error);
      }
    }
  };

  return (
    <div>
      <Signin onClick={handleSubmit} onError={onError} />
    </div>
  );
}
