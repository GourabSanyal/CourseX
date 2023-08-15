import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appbar from "./components/AppBAr";
import "./App.css";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import AddCourse from "./components/AddCourse";
import Courses from "./components/Courses";
import Course from "./components/Course";

function App() {
  return (
    <div
      style={{
        background: "#eeeeee",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Router>
        <Appbar />
        <Routes>
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:courseId" element={<Course />} />
          <Route path="/addcourse" element={<AddCourse />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
