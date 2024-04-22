import React, {useEffect, useState} from 'react'
import { Box, CircularProgress, Grid, Tab, Typography } from "@mui/material";
import { Tabs } from "@mui/material";

const userHome = () => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (activeTab === 0) {
      // fecth purchased courses
    } else {
      // fetch all courses
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
  )
}

export default userHome
