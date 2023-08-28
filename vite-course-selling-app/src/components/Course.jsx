/* eslint-disable react/prop-types */
import { Button, Card, TextField, Typography, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import

function Course() {
  let { courseId } = useParams();
  const [course, setCourse] = useState([]);

  console.log("before -", course);
  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/course/" + courseId, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCourse(res.data.course);
      });
  }, []);

  // console.log('after -', course);

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
            <UpdateCard course={course} setCourse={setCourse} />
          </Grid>
          <Grid item lg={4} md={12} sm={12}>
            <CourseCard course={course} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

function GrayTopper({ title }) {
  return (
    <div
      style={{
        height: 250,
        background: "#212121",
        top: 0,
        width: "100vw",
        zIndex: 0,
        marginBottom: -250,
      }}
    >
      <div
        style={{
          height: 250,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <Typography
            style={{ color: "white", fontWeight: 600 }}
            variant="h3"
            textAlign={"center"}
          >
            {title}
          </Typography>
        </div>
      </div>
    </div>
  );
}

function UpdateCard({ course, setCourse }) {
  const cardTitle = course.title;
  const [title, setTitle] = useState(cardTitle);
  const [description, setDescription] = useState(course.description);
  const [image, setImage] = useState(course.imageLink);
  const [price, setPrice] = useState(course.price);

  useEffect(() => {
    // Update the state when the course prop changes
    setTitle(course.title);
    setDescription(course.description);
    setImage(course.imageLink);
    setPrice(course.price);
  }, [course]);

  return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: 10 }}>
      <Card
        variant="outlined"
        style={{
          width: 400,
          padding: 20,
        }}
      >
        <Typography>Update course details</Typography>
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
          fullWidth={true}
        />
        <br /> <br />
        <TextField
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          variant="outlined"
          fullWidth
        />
        <br /> <br />
        <TextField
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          label="Number"
          variant="outlined"
        />
        <br /> <br />
        <TextField
          value={image}
          onChange={(e) => setImage(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <br /> <br />
        <Button
          size={"large"}
          variant="contained"
          onClick={() => {
            axios.put(
              "http://localhost:3000/admin/courses/" + course._id,
              {
                title: title,
                description: description,
                imageLink: image,
                published: true,
                price,
              },
              {
                headers: {
                  "Content-type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            );
            let updatedCourses = {
              _id: course._id,
              title: title,
              description: description,
              imageLink: image,
              price,
            };
            setCourse(updatedCourses);
            // console.log(course._id)
            // function callback2(data) {
            //   const updatedCourses = props.courses.map((courseItem) =>
            //     courseItem._id === course._id
            //       ? {
            //           ...courseItem,
            //           title: title,
            //           description: description,
            //           imageLink: image,
            //         }
            //       : courseItem
            //   );
            //   props.setCourses(updatedCourses);
            // }
            // function callback1(res) {
            //   return res.json().then(callback2);
            // }
            // fetch("http://localhost:3000/admin/courses/" + course._id, {
            //   method: "PUT",
            //   body: JSON.stringify({
            //     title: title,
            //     description: description,
            //     imageLink: image,
            //     published: true,
            //   }),
            //   headers: {
            //     "Content-type": "application/json",
            //     Authorization: `Bearer ${localStorage.getItem("token")}`,
            //   },
            // }).then(callback1);
          }}
        >
          Update Course
        </Button>
      </Card>
    </div>
  );
}

function CourseCard(props) {
  const course = props.course;
  return (
    <div
      style={{
        display: "flex",
        marginTop: 50,
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Card
        style={{
          margin: 10,
          width: 350,
          minHeight: 200,
          borderRadius: 20,
          marginRight: 50,
          paddingBottom: 15,
          zIndex: 2,
        }}
      >
        <img src={course.imageLink} style={{ width: 350 }}></img>
        <div style={{ marginLeft: 10 }}>
          <Typography variant="h5">{course.title}</Typography>
          <Typography variant="subtitle2" style={{ color: "gray" }}>
            Price
          </Typography>
          <Typography variant="subtitle1">
            <b>Rs {course.price} </b>
          </Typography>
        </div>
      </Card>
    </div>
  );
}

export default Course;
