import { Signup } from "ui";
import axios from "axios";
import { userState } from "store";
import {useRouter} from 'next/router';
import { useSetRecoilState } from "recoil";
import {useEffect } from 'react'

export default function CoursesPage() {
  const router = useRouter();
  return (
    <div>
      Courses route
    </div>
  );
}
