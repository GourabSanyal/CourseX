import { useRouter as useRouter } from "next/router";
import { useRouter as useRouterNavigation } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import GrayTopper from "@/components/ui/GrayTopper";
import { Grid } from "@mui/material";
import UpdateCard from "@/components/cards/UpdateCard";
import CourseCard from "@/components/cards/CourseCard";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { Course } from "shared-types";

// type Course = {
//   _id: string;
//   title: string;
//   description: string;
//   price: number;
//   imageLink: string;
//   published: boolean;
// };

function singleCoursePage() {
  const [course, setCourse] = useState<Course | null>(null);
  const routerQuery = useRouter();
  const { courseId } = routerQuery.query;
  console.log("course id in page", courseId);

  const getSingleCourse = async () => {
    if (courseId) {
      const res = await axios.get(`/api/admin/${courseId}`);
      const data = res.data;
      setCourse(data);
      console.log("res data in page", data);
    }
  };

  useEffect(() => {
    getSingleCourse();
  }, [courseId]);

  if (!course) {
    return (
      <div
        style={{
          height: "100vh",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        Loading....
      </div>
    );
  } else {
    return (
      <div>
        <GrayTopper title={course.title} />
        <Grid container>
          <Grid item lg={8} md={12} sm={12}>
            <CourseCard course={course} />
          </Grid>
          <Grid item lg={4} md={12} sm={12}>
            <UpdateCard course={course} setCourse={setCourse} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default singleCoursePage;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session || session.user.role === "user") {
    return {
      redirect: {
        destination: "/shared/unauthorize",
        permanent: false,
      },
    };
  }

  const serializedSession = JSON.parse(JSON.stringify(session));

  return {
    props: {
      session: serializedSession,
    },
  };
};
