import { Card, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";

function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        style={{
          width: 400,
          padding: 20,
        }}
      >
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          label="Title"
          variant="outlined"
          fullWidth
        />
        <br /> <br />
        <TextField
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
          variant="outlined"
          fullWidth
        />
        <br /> <br />
        <Button
          size={"large"}
          variant="contained"
          onClick={() =>  
            // console.log(localStorage.getItem("token"))
            {
            function callback2(data) {
                alert("Course Added")
                // console.log(data);
            }
            function callback1(res) {
              return res.json().then(callback2);
            }
            fetch("http://localhost:3000/admin/courses", {
              method: "POST",
              body: JSON.stringify({
                title: title,
                description: description,
                imageLink: "",
                published: true,
              }),
              headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
              },
            }).then(callback1);
          }
        }
        >
          Add Course
        </Button>
      </Card>
    </div>
  );
}

export default AddCourse;
