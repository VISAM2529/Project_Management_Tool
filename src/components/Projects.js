import React, { useRef } from "react";
import avatar from "../images/avatar.jpg";
import { FaRegBell } from "react-icons/fa";
import {FaPlus } from "react-icons/fa"
import {IoSearchOutline } from "react-icons/io5"
import { motion } from "framer-motion";
import axios from "axios";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
function Projects() {
  const searchInput = useRef("")
  const [profileData,setProfileData]=useState([])
  const [projectData,setProjectData]=useState([])
  const [ogProjectData,setOgProjectData]=useState([])
  useEffect(() => {
    const fetchData1 = async () => {
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
        setProjectData(response.data)
        setOgProjectData(response.data)

    
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors, set error state, or perform other actions as needed
      }
    };
    fetchData1();
    fetchData2();
  },[]);
 
  const update=()=>{
      const filteredProjects = projectData.filter(project => {
      return project.projectName.toLowerCase().includes((searchInput.current.value).toLowerCase());
    });
    if(searchInput.current.value===""){

    setProjectData(ogProjectData)
    }
    else{
          setProjectData(filteredProjects)
    }

  }
  if(profileData){
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
              <h1><IoSearchOutline className="text-gray-400  text-2xl"/> </h1>
              <input ref={searchInput} onChange={update} type="text" placeholder="Search your Projects" className="outline-none w-fit px-3 py-3 bg-gray-50 text-xl"/>
              </div>
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
          <div>
          <div className="px-10 flex flex-wrap gap-10">
            {
              profileData.Role==="Manager" ? <div className="bg-white shadow-2xl w-64 h-80 flex flex-col items-center justify-center gap-10 rounded-2xl border-x-2 border-y-2 border-gray-100 ">
              <Link to="/addProject" className="border-x-4 border-y-4 border-gray-100 rounded-full px-2 py-2"><FaPlus className="text-3xl text-gray-100 "/></Link>
              <h1 className="text-2xl">Add Project</h1>
            </div> : <div></div>
            }
            <div className="flex flex-wrap gap-10">
              {
                projectData?.map((project)=>{
                  return <Link to={`/projectInfo/:${project.projectName}`} className="flex flex-col  gap-5 shadow-2xl rounded-2xl w-64 h-80">
                    <img className="w-full rounded-tl-2xl rounded-tr-2xl" src="https://cdn.pixabay.com/photo/2018/08/18/13/26/interface-3614766_1280.png"/>
                    <div className="px-2 flex flex-col items-center gap-5">
                    <h1  className="text-xl text-center font-extrabold">{project.projectName}</h1>
                    <p className="flex gap-1">Status : {project.projectTasks.length===0 ? <p className="text-green-500"> Completed</p> : <p className="text-red-500"> In Progress</p>}</p>
                    </div>
                  </Link>
                })
              }
            </div>
          </div>
          </div>
      </div>
      </motion.div>
    );
  }
}

export default Projects;
