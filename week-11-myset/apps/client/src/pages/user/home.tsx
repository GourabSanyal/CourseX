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
      This is all course page for user
    </div>
  );
}
