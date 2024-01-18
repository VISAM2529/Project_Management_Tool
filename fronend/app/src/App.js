import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Projects from "./components/Projects";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddProject from "./components/AddProject";
import ProjectInfo from "./components/ProjectInfo";
import Setting from "./components/Setting";

function App() {
  return (
    <BrowserRouter>
      <div className="w-6/6 ">
        <div className="">
          <div className="w-full h-full flex  justify-between mb-10">
            <Navbar />
            <div className="py-5 w-5/6 h-48 px-5 ">

                <div className=" rounded-3xl ml-80 w-11/12">
                  <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="" element={<Landing />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/addProject" element={<AddProject />} />
                    <Route path="/projectInfo/:projectName" element={<ProjectInfo />} />
                    <Route path="/setting" element={<Setting />} />
                  </Routes>
                </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
