import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Typography, Button } from "@mui/material";

type Course = {
  _id: string; // You can adjust this type as needed
  title: string;
  description: string;
  price: number;
  imageLink: string;
  published: boolean;
};

type CourseProps = {
  course : {
    _id: string; // You can adjust this type as needed
    title: string;
    description: string;
    price: number;
    imageLink: string;
    published: boolean;
  }
};

export default function CoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState([])

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const refreshFlag = localStorage.getItem("pageRefreshed");
  //   if (token && !refreshFlag) {
  //     localStorage.setItem("pageRefreshed", "true");
  //     router.refresh();
  //   }
  // }, []);

  const getData = async() => {
    const data = await axios.get("/api/auth/courses", {
      headers : { Authorization : "Bearer " + localStorage.getItem("token")}
    })
    // console.log("this is data -> ", data.data)
    setCourses(data.data)
    // console.log("this is courses state -> ", courses);
  }

  useEffect(() => {
    getData()
  }, [])

  // if (!courses.length){
  //   <div>
  //     Loading Courses ...
  //   </div>
  // }

  return (
    <div
    style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
  >
    heyy 
    {courses.map((course: Course) => {
      return <Course 
        key={course._id} 
        course={course} />;
    })}
  </div>
  );
  }

function Course({ course  } : CourseProps) {
  // const navigate = useNavigate();
  const router = useRouter();
  return (
    <Card
      style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20,
      }}
    >
      <Typography textAlign={"center"} variant="h5">
        {course.title}
      </Typography>
      <Typography textAlign={"center"} variant="subtitle1">
        {course.description}
      </Typography>
      <img src={course.imageLink} style={{ width: 300 }}></img>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            router.push("/course/" + course._id);
          }}
        >
          Edit
        </Button>
      </div>
    </Card>
  );
}

