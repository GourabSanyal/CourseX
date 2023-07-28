import { Card, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function Signup() {
  return (
    <>
      <center>
        <div
          style={{
            paddingTop: 150,
            marginBottom: 10,
          }}
        >
          <Typography variant={"h6"}>Welcome to Coursera. Sign up below</Typography>
        </div>
        <center></center>

        <Card
          style={{
            width: 400,
            padding: 20,
          }}
        >
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            fullWidth
          />
          <br /> <br />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            fullWidth
          />
          <br /> <br />
          <Button size={"large"} variant="contained">
            Sign up
          </Button>
        </Card>
      </center>
    </>
  );
}

export default Signup;
