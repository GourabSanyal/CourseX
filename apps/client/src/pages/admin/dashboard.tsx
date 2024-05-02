import { Box, CircularProgress, Grid, Tab, Typography } from "@mui/material";
import { Tabs } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { adminState } from "store";
import { Course } from "../courses";

type Course = {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageLink: string;
  published: boolean;
};

const dashboard = () => {
  const adminUsername = useRecoilValue(adminState).username;
  const [activeTab, setActiveTab] = useState(0);
  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [error, setError]= useState<string>('')
  const [loadingYourCourses, setLoadingYourCourses] = useState<boolean>(false);
  const [loadingAllCourses, setLoadingAllCourses] = useState<boolean>(false);

  const fetchCourses = async () => {
    setLoadingYourCourses(true)
    const response = await axios.get("/api/admin/your-courses", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = response.data;
    setCourses(data.data);
    if (!response.data.length) {
      setError(response.data.message);
    }
    setLoadingYourCourses(false);
  };

  const fetchAllCourses = async () => {
    setLoadingAllCourses(true);
    const response = await axios.get("/api/common/all-courses", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setAllCourses(response.data);
    if (!response.data.length) {
      setError(response.data.message);
    }
    console.log("res", response.data);
    setLoadingAllCourses(false);
  };

  useEffect(() => {
    if (activeTab === 0) {
      fetchCourses();
    } else {
      fetchAllCourses();
    }
  }, [activeTab]);

  const handleTabChange = (event : any, newValue : number) => {
    setActiveTab(newValue);
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", minHeight: "100vh" }}
    >
      <div style={{ marginTop: "9vh" }}>
        <Grid container justifyContent="center" alignItems="center" direction="column">
          <Typography variant="h4" align="center" gutterBottom>Welcome {adminUsername}</Typography>
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
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
              <CircularProgress />
            </Box>
          ) : Array.isArray(courses) && courses.length > 0 ? (
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
              {courses.map((course: Course) => (
                <Course key={course._id} course={course} />
              ))}
            </div>
          ) : (
            <Typography variant="body1" align="center" mt={10}>
              {error || "No courses available"}
            </Typography>
          )
        ) : loadingAllCourses ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
            <CircularProgress />
          </Box>
        ) : Array.isArray(allCourses) && allCourses.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {allCourses.map((course: Course) => (
              <Course key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <Typography variant="body1" align="center" mt={10}>
            {error || "No courses available"}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default dashboard;
