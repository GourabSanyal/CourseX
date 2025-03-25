import { useCallback, useEffect, useState } from "react";
import { Card, TextField, Typography, Button } from "@mui/material";
import axios from "axios";
import { Course } from "shared-types";
import { toast } from "sonner";
interface UpdateCardProps {
  course: Course;
  setCourse: React.Dispatch<React.SetStateAction<Course | null>>;
}

export default function UpdateCard({ course, setCourse }: UpdateCardProps) {
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [image, setImage] = useState(course.imageLink);
  const [price, setPrice] = useState(course.price);

  const handleUpdate = useCallback(() => {
    axios
      .put(`/api/admin/updateCourse`, {
        _id: course._id,
        title,
        description,
        imageLink: image,
        published: true,
        price: price,
      })
      .then((response) => {
        console.log("response recieved", response);

        let updatedCourse = response.data;
        setCourse(updatedCourse);
        toast.success("Course updated successfully");
      })
      .catch((error) => {
        console.error("Error updating course:", error);
        toast.error("Error updating course");
      });
  }, [course._id, title, description, image, price, setCourse]);

  return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: 10 }}>
      <Card
        variant="outlined"
        style={{
          width: 400,
          padding: 20,
        }}
      >
        <Typography style={{ marginBottom: 20 }}>
          Update course details
        </Typography>
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="Title"
          variant="outlined"
          fullWidth={true}
          InputLabelProps={{ shrink: true }}
        />
        <br /> <br />
        <TextField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <br /> <br />
        <TextField
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
          label="Number"
          fullWidth
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <br /> <br />
        <TextField
          value={image}
          label="Image Link"
          onChange={(e) => setImage(e.target.value)}
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          fullWidth
        />
        <br /> <br />
        <Button size={"large"} variant="contained" onClick={handleUpdate}>
          Update Course
        </Button>
      </Card>
    </div>
  );
}
