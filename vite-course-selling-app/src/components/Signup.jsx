import { Card, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function Signup() {
  return (
    <div>
      <div
        style={{
          paddingTop: 150,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h6"}> 
          Welcome to Coursera. Sign up below
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          style={{
            width: 400,
            padding: 20,
          }}
        >
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
          />
          <br /> <br />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            fullWidth
          />
          <br /> <br />
          <Button 
            size={"large"} 
            variant="contained"
            onClick={() => {  
              let username = document.getElementById("email").value;
              let password = document.getElementById("password").value;
              fetch("http://localhost:3000/admin/signup", {
                method: "POST",
                body: JSON.stringify({
                  username,
                  password 
                }),
                headers: {
                  "Content-type" : "application/json"
                }
              })
            }}  
          >
            Sign up
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Signup;
