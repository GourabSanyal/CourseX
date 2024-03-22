import axios from "axios";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { adminState } from "store";
import { NewCourseCard } from "ui";

const addCourse = () => {
  const [onError, setOnError] = useState("");
  //   const adminUsername = useRecoilValue(adminState).username;

  const handleSubmit = async (
    title: string,
    description: string,
    price: number,
    imageLink: string
    // published: boolean
  ): Promise<void> => {
    try {
      const response = await axios.post(
        "/api/admin/createCourse",
        {
          title,
          description,
          price,
          imageLink,
          // published,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      console.log("data from parent ->", response);

      if (response.status === 201) {
        console.warn("New Course added successfully");
      }
    } catch (error) {
      console.log("error from parent -> ", error);
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        let errorRes = error.response.data.message;
        setOnError(errorRes);
      } else {
        console.log("An error occurred: ", error);
      }
    }
  };
  return (
    <div>
      <NewCourseCard onClick={handleSubmit} onError={onError} />
    </div>
  );
};
export default addCourse;
