/* eslint-disable react/prop-types */
import { Button, Card, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Course() {
  let { courseId } = useParams();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
        function callback2(data) {
            setCourses(data.courses);
            // console.log('courses - ');
        }
        function callback1(res) {
            res.json().then(callback2)
        }
        fetch("http://localhost:3000/admin/courses/", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(callback1)
    }, []);

    let course = null;
    for (let i = 0; i< courses.length; i++) {
        if (courses[i]._id == courseId) {
            course = courses[i]
        }
    }
    // console.log('courses state - ',course);

  if (!course) {
    return <div>Loading... </div>;
  } else {
    return (
      <div>
        <CourseCard course={course} />
        <UpdateCard courses={courses} course={course} setCourses={setCourses}/>
      </div>
    );
  }
}

function UpdateCard(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage]= useState("");
  const course = props.course;
  // console.log('update props', course);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        variant="outlined"
        style={{
          width: 400,
          padding: 20,
        }}
      >
        <Typography>Update course details</Typography>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          label="Title"
          variant="outlined"
          fullWidth = {true}
        />
        <br /> <br />
        <TextField
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
          variant="outlined"
          fullWidth
        />
        <br /> <br />
        <TextField
          onChange={(e) => setImage(e.target.value)}
          label="Image Link"
          variant="outlined"
          fullWidth
        />
        <br /> <br />
        <Button
          size={"large"}
          variant="contained"
          onClick={() =>{
            // console.log(course._id)
              function callback2(data) {
                let updatedCourses = []
                for ( let i = 0; i < props.courses.length ; i++){
                  if(props.courses[i]._id == course._id){
                    updatedCourses.push(
                      {
                        id: course._id,
                        title: title,
                        description : description,
                        imageLink: image
                      }
                      )
                      ;
                      // console.log('after update -', updatedCourses);
                  } else {
                    updatedCourses.push(props.courses[i])
                  }
                }
                props.setCourses(updatedCourses);
              }
              function callback1(res) {
                return res.json().then(callback2);
              }
              fetch("http://localhost:3000/admin/courses/" + course._id, {
                method: "PUT",
                body: JSON.stringify({
                  title: title,
                  description: description,
                  imageLink: image,
                  published: true,
                }),
                headers: {
                  "Content-type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }).then(callback1);
            }
          }
        >
          Update Course
        </Button>
      </Card>
    </div>
  );
}


function CourseCard(props) {
  // eslint-disable-next-line react/prop-types
  const course = props.course;
  // console.log('card props -', course);
  return (
    <div style={{ display: 'flex', justifyContent: 'center'}}>
      <Card
        style={{
          border: "2px solid black",
          margin: 10,
          width: 300,
          minHeight: 200,
        }}
      >
        <Typography variant="h5">{course.title}</Typography>
        <Typography variant="subtitle">{course.description}</Typography>
        <img
          src={course.imageLink}
          style={{ width: "100%", height: "100%" }}
        />
      </Card>
    </div>
  );
}



export default Course;
