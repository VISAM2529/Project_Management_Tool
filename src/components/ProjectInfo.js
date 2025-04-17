import React from "react";
import avatar from "../images/avatar.jpg";
import { FaRegBell } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { MdDone } from "react-icons/md";
import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
function ProjectInfo() {
  let name = useParams();
  name = name.projectName.replace(":", "");

  const [profileData, setProfileData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [task, setTask] = useState([]);
  const [taskDone, setTaskDone] = useState([]);
  const [percent, setPercent] = useState("");
  useEffect(() => {
    // Calculate percentage when task and taskDone states change
    setPercent((taskDone.length / (task.length + taskDone.length)) * 100);
  }, [task, taskDone]);
  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await axios.get("https://project-management-tool-ryex.onrender.com/userDetail");
        console.log("Response = ", response.data);
        setProfileData(response.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors, set error state, or perform other actions as needed
      }
    };
    const fetchData2 = async () => {
      try {
        const response = await axios.get(
          `https://project-management-tool-ryex.onrender.com/project/${name}`
        );
        console.log("projectDATA = ", response.data[0]);
        if (response.data[0]) {
          setProjectData(response.data[0]);
  
          if (response.data[0].taskDone) {
            setTaskDone(response.data[0].taskDone);
          }
          if (response.data[0].projectTasks) {
            setTask(response.data[0].projectTasks);
            
          }

          // Calculate percentage
          // const percentage = (response.data[0].taskDone?.length || 0) / ((response.data[0].task?.length || 0) + (response.data[0].taskDone?.length || 0)) * 100;
          // setPercent((taskDone.length/(task.length+taskDone.length))*100);

        } else {
          console.error("Project data is undefined.");
        }
        // Calculate percentage
        console.log("percent = ",percent)
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors, set error state, or perform other actions as needed
      }
    };
    fetchData2();
    fetchData1();
  }, []);
  const saveData = async (task1) => {
    // window.location.reload();
    window.location.href=`/projectInfo/${projectData.projectName}`
    console.log(task1);
    try {
      const response = await axios.post(
        `https://project-management-tool-ryex.onrender.com/doneTask/:${projectData.projectName}/:${task1}`
      );
      if (response.data === "success") {
        toast.success("Done");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (profileData) {

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <div className=" py-10 h-fit flex flex-col gap-10 bg-white rounded-3xl">
          <div className="flex items-center justify-between px-5">
            <div className="flex items-center gap-3 bg-gray-50 px-3 rounded-3xl">
              
            </div>
            <div className="flex items-center gap-5">
              <h1 className="text-xl">
                <FaRegBell />
              </h1>
              <div className="flex items-center gap-2">
                <img src={avatar} className="w-10 h-10 rounded-full" />
                <h1>{profileData.email}</h1>
              </div>
            </div>
          </div>
          <div>
            <div className="px-10 flex flex-col flex-wrap gap-10 justify-center">
              <div className="flex flex-col gap-5">
                <h1 className="text-2xl font-extrabold">
                  {projectData.projectName}
                </h1>
                <p>{projectData.projectDesc}</p>
              </div>
              <div className="flex items-center justify-between">
              <div className="flex flex-col gap-5">
                <h1 className="text-2xl font-extrabold">Created By : </h1>
                <p>{projectData.admin}</p>
              </div>
              <div className="text-md flex flex-col items-center gap-2">
                <h1><span className="font-extrabold">Start Date : </span>{projectData.StartDate}</h1>
                <h1><span className="font-extrabold">Due Date : </span>{projectData.DeadDate}</h1>
              </div>
              </div>
              {projectData.admin === profileData.username ? (
                <div className="flex flex-col gap-10">
                  <h1 className="text-2xl font-extrabold flex items-center justify-between ">
                    Tasks Done :{" "}
                    <span>
                      {percent}
                      %
                    </span>
                  </h1>
                  <div style={{borderRadius:"100px"}} className="w-full h-5 border-x-2 border-y-2 overflow-hidden ">
                    <div
                      style={{
                        width: `${percent}%`,
                        height: "100%",
                        backgroundColor: "#4CAF50",
                        borderRadius: "100px",
                        transition: "width 0.3s ease-in-out",
                      }}
                    ></div>
                  </div>
                  {projectData.taskDone ? (
                    projectData.taskDone.map((task) => {
                      return (
                        <div className="bg-white shadow-xl h-14 flex items-center justify-between px-5 rounded-md">
                          <p className="text-xl px-5 py-3">{task}</p>
                        </div>
                      );
                    })
                  ) : (
                    <div>
                      <h1>No Task Found</h1>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-10">
                  <h1 className="text-2xl font-extrabold">Your Tasks : </h1>
                  {projectData.projectTasks ? (
                    projectData.projectTasks.map((task) => {
                      return (
                        <div className="bg-white shadow-xl h-14 flex items-center justify-between px-5 rounded-md">
                          <p className="text-xl px-5 py-3">{task}</p>
                          <Link
                            to={`/projectInfo/:${projectData.projectName}`}
                            onClick={() => {
                              saveData(task);
                            }}
                            className="text-2xl"
                          >
                            <MdDone className="text-green-500" />
                          </Link>
                        </div>
                      );
                    })
                  ) : (
                    <div>
                      <h1>No Task Found</h1>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
}

export default ProjectInfo;
