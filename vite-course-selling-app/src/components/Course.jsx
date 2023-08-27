/* eslint-disable react/prop-types */
import { Button, Card, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import

function Course() {
  let { courseId } = useParams();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/admin/course/" + courseId, {
      headers : {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }).then(res => {
      setCourse(res.data.course)
    })
    }, []);

  if (!course) {
    return <div style={{height: "100vh", justifyContent: "center", flexDirection: "column"}}>
            Loading....
        </div>
  } else {
    return (
      <div style={{ display : 'flex', justifyContent: 'center'}}>
        <CourseCard course={course} />
        <UpdateCard 
          // courses={courses} 
          course={course} 
          setCourse={setCourse}/>
      </div>
    );
  }
}

// function UpdateCard(props) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage]= useState("");
//   const course = props.course;
//   // console.log('update props', course);
//   return (
//     <div style={{ display: "flex", justifyContent: "center" }}>
//       <Card
//         variant="outlined"
//         style={{
//           width: 400,
//           padding: 20,
//         }}
//       >
//         <Typography>Update course details</Typography>
//         <TextField
//           onChange={(e) => setTitle(e.target.value)}
//           label="Title"
//           variant="outlined"
//           fullWidth = {true}
//         />
//         <br /> <br />
//         <TextField
//           onChange={(e) => setDescription(e.target.value)}
//           label="Description"
//           variant="outlined"
//           fullWidth
//         />
//         <br /> <br />
//         <TextField
//           onChange={(e) => setImage(e.target.value)}
//           label="Image Link"
//           variant="outlined"
//           fullWidth
//         />
//         <br /> <br />
//         <Button
//           size={"large"}
//           variant="contained"
//           onClick={() =>{
//             // console.log(course._id)
//               function callback2(data) {
//                 const updatedCourses = props.course.map(( courseItem) => {
//                   courseItem._id = course._id 
//                   ? {
//                     ...courseItem,
//                     title: title,
//                     description: description,
//                     imageLink: image
//                   } : courseItem
//                 })
//                 props.setCourses(updatedCourses)
//               }
//               function callback1(res) {
//                 return res.json().then(callback2);
//               }
//               fetch("http://localhost:3000/admin/courses/" + course._id, {
//                 method: "PUT",
//                 body: JSON.stringify({
//                   title: title,
//                   description: description,
//                   imageLink: image,
//                   published: true,
//                 }),
//                 headers: {
//                   "Content-type": "application/json",
//                   "Authorization": `Bearer ${localStorage.getItem("token")}`,
//                 },
//               }).then(callback1);
//             }
//           }
//         >
//           Update Course
//         </Button>
//       </Card>
//     </div>
//   );
// }

function UpdateCard(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage]= useState("");
  const course = props.course;
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
            function callback2 (data) {
                const updatedCourses = props.courses.map((courseItem) =>
                  courseItem._id === course._id
                    ? {
                        ...courseItem,
                        title: title,
                        description: description,
                        imageLink: image,
                      }
                    : courseItem
                );
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
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
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
