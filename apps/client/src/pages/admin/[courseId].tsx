  import { useRouter } from "next/router";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import { Grid, Box, Container } from "@mui/material";
  import UpdateCard from "@/components/cards/UpdateCard";
  import CourseCard from "@/components/cards/CourseCard";
  import { GetServerSideProps, GetServerSidePropsContext } from "next";
  import { getServerSession } from "next-auth";
  import { authOptions } from "../api/auth/[...nextauth]";
  import { Course } from "shared-types";

  function singleCoursePage() {
    const [course, setCourse] = useState<Course | null>(null);

    const routerQuery = useRouter();
    const { courseId } = routerQuery.query;

    const getSingleCourse = async () => {
      if (courseId) {
        const res = await axios.get(`/api/admin/${courseId}`);
      const data = res.data;
      setCourse(data);
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
      <Box sx={{ p: 3 }}>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={8}>
              <Box sx={{ height: '100%' }}>
                <CourseCard course={course} />
              </Box>
            </Grid>
            <Grid item mt={8}>
              <Box sx={{ height: '100%' }}>
                <UpdateCard course={course} setCourse={setCourse} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
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
