import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appbar from "./components/AppBAr";
import "./App.css";
import Signup from "./components/Signup";
import Signin from "./components/Signin";

function App() {
  return (
    <div
      style={{
        background: "#eeeeee",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Appbar />
      <Router>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
