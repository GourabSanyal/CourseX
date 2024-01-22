import { Signin } from "ui";
import axios from "axios";
import { userState } from "store";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";

export default function UserSignInPage() {

  const setUser = useSetRecoilState(userState)

  const router = useRouter();
  return (
    <div>
      <Signin
        onClick={async (email, password) => {
          const response = await axios.post("/api/auth/user/signin", {
            email,
            password,
          });
          localStorage.setItem("token", response.data.token);
          router.push("/user/allCoursePage");
          setUser({ isLoading: false, userEmail: email})
          // console.log("from component --> ",username, password);
          
        }}
      />
    </div>
  );
}
