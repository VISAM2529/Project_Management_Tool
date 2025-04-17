import React, { useRef, useState } from "react";
import Calendar from "react-calendar";
import { MdOutlinePodcasts,MdOutlineEmojiEmotions } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import { BiMessageDetail } from "react-icons/bi";
import {GoPlus } from "react-icons/go"
import {GrAttachment} from "react-icons/gr"
import {IoSendSharp } from "react-icons/io5"
import avatar from "../images/avatar.jpg";
import {motion} from "framer-motion"
import 'react-calendar/dist/Calendar.css';
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {MdDelete } from "react-icons/md"

function Home() {
  const [profileData,setProfileData]=useState([])
  const [projectData,setProjectData]=useState([])
  const [todoBtn,setTodoBtn]=useState(false)
  const [todoTask,setTodoTask]=useState([])
  const [todoTaskData,setTodoTaskData]=useState([])
  const todoInputRef=useRef("")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://project-management-tool-ryex.onrender.com/userDetail')
        console.log("Response = ",response.data)
        setProfileData(response.data[0])
    
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors, set error state, or perform other actions as needed
      }
    };
    const fetchData2 = async () => {
      try {
        const response = await axios.get("https://project-management-tool-ryex.onrender.com/projectDetail")
        console.log("Projects = ",response.data)
        setProjectData(response.data[0])

        console.log("pr = ",projectData)
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors, set error state, or perform other actions as needed
      }
    };
    const fetchData3 = async () => {
      try {
        const response = await axios.get("https://project-management-tool-ryex.onrender.com/TodoTasks")
        console.log("TodoTaskData = ",response.data)
        setTodoTaskData(response.data)

      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors, set error state, or perform other actions as needed
      }
    };
    fetchData2();
    fetchData();
    fetchData3()
  },[]);
  const saveData = async () => {

    setTodoBtn(false)
    window.location.href="/home"
    try {
      const response = await axios.post(
        `https://project-management-tool-ryex.onrender.com/addTodoTask`,{
          username:profileData.username,
          task:todoInputRef.current.value
        }
      );
      if (response.data === "Done") {
        toast.success("Done");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteData = async (task1) => {
    console.log(task1)
    window.location.href="/home"
    try {
      const response = await axios.delete(
        `https://project-management-tool-ryex.onrender.com/deleteTodoTaskData/:${task1}`
      );
      if (response.data === "Done") {
        toast.error("Deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };
  if(profileData){
    return(

      <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <Toaster/>
      <div className="px-5 py-10 h-fit bg-white rounded-3xl">
        <div className="flex flex-col gap-10">
  
          {/* NAVBAR */}
  
          <div className="flex items-center justify-between">
            <h1 className="text-xl flex items-center gap-3 bg-gray-100 text-gray-400 w-fit px-5 py-3 rounded-2xl">
              <MdOutlinePodcasts /> Welcome, {profileData.username}
            </h1>
            <div className="flex items-center gap-5">
              <h1 className="text-xl">
                <FaRegBell />
              </h1>
              <Link to="/setting" className="flex items-center gap-2">
                <img src={avatar} className="w-10 h-10 rounded-full" />
                <h1>{profileData.email}</h1>
              </Link>
            </div>
          </div>
  
  
  
          <div className="flex flex-col item-center gap-5">
            <div className="flex item-center gap-5 ">
  
              {/* CALENDER */}
  
  
              <div className="w-3/6 h-1/2 bg-white shadow-2xl px-5 py-5 rounded-3xl">
                <div className="flex items-center justify-center">
                  <Calendar className="flex flex-col items-center gap-5  " />
                </div>
              </div>
  
              {/* NOTIFICATION */}
  
  
              <div className="w-3/6 h-1/2 bg-white shadow-2xl px-5 py-5 rounded-3xl">
                <div className="flex flex-col gap-10">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-extrabold">Notification</h1>
                    <button className="font-semibold text-orange-400">view all</button>
                  </div>
                {projectData ?  <div className="flex flex-col items-center gap-3 ">
               <div className="flex flex-col bg-purple-700 rounded-2xl text-white px-5 py-5">
                    <div className="flex items-center gap-3">
                      <h1 className="text-5xl">
                        <BiMessageDetail />
                      </h1>
                      <div className="flex flex-col gap-1">
                        <p className="text-xl">{profileData.Role === "Manager" ? 
                          <div>
                            <p> 
                  {projectData.projectTasks && projectData.projectTasks.length === 0 ? (
                    <p> Project {projectData.projectName} is Done !</p>
                  ) : (
                    <p>project {projectData.projectName} is in Process </p>
                  )}
                </p>
                          </div> : <div>
                            <p>{projectData.admin} just assign you a Project</p>
                            <p>Project Name : {projectData.projectName}</p>
                          </div>  
                      } </p>
                      </div>
                    </div>
                  </div>
                
               </div> : <div></div>}
                </div>
              </div>
            </div>
            <div className="flex item-center gap-5">
              <div className="w-3/6 h-1/2 bg-white shadow-2xl px-5 py-5 rounded-3xl flex flex-col gap-5">
                <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-extrabold">Today Task</h1>
                  {todoTaskData ? <p className="text-xl bg-gray-100 px-2 rounded-full">{todoTaskData.length}</p> : <p></p>}
                </div>
                <div>
                      {todoBtn ? <div className="flex items-center gap-2">
                        <input ref={todoInputRef} className="bg-gray-200 rounded-2xl px-3 py-2" placeholder="task Name"/>
                        <button onClick={saveData}  className="bg-green-500 px-2 py-2 rounded-xl text-white text-md">Add</button>
                      </div>:<button onClick={()=>setTodoBtn(true)}  className="text-2xl font-extrabold"><GoPlus /></button>}
                </div>
                </div>
                <div className="flex flex-col gap-5 bg-gray-50 px-5 py-5 rounded-2xl">
                      {
                        todoTaskData.map((task)=>{
                          return <div className="flex items-center justify-between">
                            <h1 className="text-xl">{task.task}</h1>
                            <button className="text-red-500 text-xl" onClick={()=>deleteData(task.task)}><MdDelete /></button>
                          </div>
                        })
                      }
                </div>
                <div>
                  
                </div>
              </div>
           
            </div>
          </div>
        </div>
      </div>
      </motion.div>
    );
  }
}

export default Home;
