import { Signup } from "ui";
import axios from "axios";
import { userState } from "store";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";

export default function UserSignInPage() {
  const router = useRouter();
  return (
    <div>
      <Signup
        onClick={async (username, email, password) => {
          const response = await axios.post("/api/auth/user/signup", {
            username,
            email,
            password,
          });
          localStorage.setItem("token", response.data.token);
          router.push("/user/allCoursePage");
        }}
      />
    </div>
  );
}
