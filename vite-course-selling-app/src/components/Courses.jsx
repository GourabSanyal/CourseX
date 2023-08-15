/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/admin/courses", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setCourses(data.courses));
  });
  return (
    <div style={{ display: 'flex', flexWrap: "wrap", justifyContent: 'center'}}>
      {courses.map((course) => {
        return <Course course={course} />;
      })}
    </div>
  );
}

export function Course(props) {
  return (
    <Card
      style={{
        border: "2px solid black",
        margin: 10,
        width: 300,
        minHeight: 200,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5">{props.course.title}</Typography>
        <Typography variant="subtitle">{props.course.description}</Typography>
        <img src={props.course.imageLink} style={{ width : '100%', height: '100%'}}/>
      </div>
    </Card>
  );
}

export default Courses;
