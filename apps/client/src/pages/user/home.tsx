import { Box, CircularProgress, Grid, Tab, Typography } from "@mui/material";
import { Tabs } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "store";
import { Course } from "../courses";
import { useSession } from "next-auth/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

type Course = {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageLink: string;
  published: boolean;
};

const home = () => {
  const { data: session } = useSession();
  const setUser = useSetRecoilState(userState);
  const userUsername = useRecoilValue(userState).username;
  const [activeTab, setActiveTab] = useState(0);
  const [courses, setCourses] = useState<Course[]>();
  const [allCourses, setAllCourses] = useState<Course[]>();
  const [error, setError] = useState<string>("");
  const [loadingYourCourses, setLoadingYourCourses] = useState<boolean>(false);
  const [loadingAllCourses, setLoadingAllCourses] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user.role) {
      setRole(session?.user.role);
    }
    if (session?.user.id) {
      setUserId(session?.user.id);
    }

    if (session?.user.role === "user") {
      setUser({
        isLoading: false,
        username: session?.user?.name,
        userEmail: session?.user?.email,
      });
    }
  }, [session, setUser]);

  const fetchCourses = async () => {
    setLoadingYourCourses(true);
    const response = await axios.get("/api/user/purchased-courses");
    setCourses(response.data.data);
    if (!response.data.length) {
      setError(response.data.message);
    }
    setLoadingYourCourses(false);
  };

  const fetchAllCourses = async () => {
    setLoadingAllCourses(true);
    const response = await axios.get("/api/common/all-courses");

    setAllCourses(response.data.data);
    if (!response.data.length) {
      setError(response.data.message);
    }
    setLoadingAllCourses(false);
  };

  useEffect(() => {
    if (activeTab === 0) {
      fetchCourses();
    } else {
      fetchAllCourses();
    }
  }, [activeTab]);

  const handleTabChange = (event: any, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", minHeight: "100vh" }}
    >
      <div style={{ marginTop: "9vh" }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <Typography variant="h4" align="center" gutterBottom>
            Welcome {userUsername?.split(" ")[0]}
          </Typography>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <Tabs
              style={{ marginLeft: "-20px" }}
              value={activeTab}
              onChange={handleTabChange}
            >
              <Tab label="Your courses" />
              <Tab label="All courses" />
            </Tabs>
          </div>
        </Grid>
        {activeTab === 0 ? (
          loadingYourCourses ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "300px",
              }}
            >
              <CircularProgress />
            </Box>
          ) : Array.isArray(courses) && courses.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {courses.map((course: Course) => (
                <Course
                  key={course._id}
                  course={course}
                  userRole={role}
                  userId={userId}
                  // createdCourses={role === "admin" ? courses : []}
                  purchasedCourses={role === "user" ? courses : []}
                />
              ))}
            </div>
          ) : (
            <Typography variant="body1" align="center" mt={10}>
              {error || "No courses available"}
            </Typography>
          )
        ) : loadingAllCourses ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : Array.isArray(allCourses) && allCourses.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {allCourses.map((course: Course) => (
              <Course
                key={course._id}
                course={course}
                userRole={role}
                userId={userId}
                // createdCourses={role === "admin" ? courses : []}
                purchasedCourses={role !== "admin" ? courses : []}
              />
            ))}
          </div>
        ) : (
          <Typography variant="body1" align="center" mt={10}></Typography>
        )}
      </div>
    </div>
  );
};

export default home;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session || session.user.role === "admin") {
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
