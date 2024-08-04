import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { adminState } from "store";
import { NewCourseCard } from "ui";
import {CustomModal} from "ui/modals/CustomModal";
import { authOptions } from "../api/auth/[...nextauth]";

const addCourse = () => {
  const [onError, setOnError] = useState("");
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
      {/* <CustomModal 
        
      /> */}
    </div>
  );
};
export default addCourse;


export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/shared/unauthorize",
        permanent: false,
      },
    };
  }

  const serializedSession = JSON.parse(JSON.stringify(session));

  return {
    props: {
      session: serializedSession
    },
  };
};

