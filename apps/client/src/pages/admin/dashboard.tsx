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

  const fetchCourses = async () => {
    const response = await axios.get("/api/admin/your-courses", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = response.data;
    setCourses(data.data);
  };

  const fetchAllCourses = async () => {
    const response = await axios.get("/api/common/all-courses", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setAllCourses(response.data);
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
        {activeTab === 0 && 
          Array.isArray(courses) && courses.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {courses.map((course: Course) => (
              <Course key={course._id} course={course} />
            ))}
          </div>
        ) : activeTab === 1 && Array.isArray(courses) && courses.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {allCourses.map((course: Course) => (
              <Course key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent : 'center',
              alignItems : 'center',
              height : '300px'
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </div>
    </div>
  );
};

export default dashboard;
