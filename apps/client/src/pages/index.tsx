import { Grid, Typography } from "@mui/material";

export default function Home() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Grid
        container
        style={{
          padding: "5vw",
          flexWrap: "wrap-reverse",
          justifyContent: "center",
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          lg={6}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Typography variant="h2">CourseX</Typography>
            <Typography variant="h5">Learn, earn and grow</Typography>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={6}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
          }}
        >
          <img
            src="https://img.freepik.com/free-vector/empty-classroom-interior-with-chalkboard_1308-65378.jpg"
            alt="course-image"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
