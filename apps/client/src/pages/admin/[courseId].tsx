import { useRouter as useRouter } from "next/router";
import { useRouter as useRouterNavigation } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import GrayTopper from "@/components/ui/GrayTopper";
import { Grid } from "@mui/material";
import UpdateCard from "@/components/cards/UpdateCard";
import CourseCard from "@/components/cards/CourseCard";

type Course = {
  _id: string; 
  title: string;
  description: string;
  price: number;
  imageLink: string;
  published: boolean;
};

function singleCoursePage() {
  const [course, setCourse] = useState<Course | null >(null);
  const routerQuery = useRouter();
  const { courseId } = routerQuery.query;

  const getSingleCourse = async () => {
    if (courseId){
      const res = await axios.get(`/api/updateCourse/${courseId}`, {});
      const data = res.data
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
      <div>
        <GrayTopper title={course.title} />
        <Grid container>
          <Grid item lg={8} md={12} sm={12}>
            <CourseCard course={course} />
          </Grid>
          <Grid item lg={4} md={12} sm={12}>
            <UpdateCard course={course} setCourse={setCourse} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default singleCoursePage;
