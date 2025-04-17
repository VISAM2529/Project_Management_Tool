import React, { useState, useEffect, useRef } from "react";
import { FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";
import {RxCross1 } from "react-icons/rx"
import {MdDelete} from "react-icons/md"
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import {toast,Toaster} from "react-hot-toast"
import { useNavigate } from "react-router-dom";

function AddProject() {
  const navigate = useNavigate()
  const projectNameRef = useRef("")
  const projectDescRef = useRef("")
  const adminRef=useRef("")
  const strDate = useRef("")
  const deadDate = useRef("")
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState([]);
  const [member,setMember]=useState([])
  const inputRef1 = useRef("");
  const inputRef2 = useRef("")
  const [taskInput,setTaskInput]=useState(false)
  const [taskData,setTaskData] = useState([])
  const [text,setText]=useState(false)
  const [profileData,setProfileData]=useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://project-management-tool-ryex.onrender.com/users");
        const res = response.data;
        console.log("Response = ", res);
        const usernames = res.map((user) => `${user.username}`);
        setUsers(usernames);
        console.log(users);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors, set error state, or perform other actions as needed
      }
    };
    const fetchData2 = async () => {
      try {
        const response = await axios.get('https://project-management-tool-ryex.onrender.com/userDetail')
        console.log("Response = ",response.data)
        setProfileData(response.data[0])
    
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors, set error state, or perform other actions as needed
      }
    };
    fetchData();
    fetchData2();
  }, );
  const saveData = async()=>{
    try {
      axios.post("https://project-management-tool-ryex.onrender.com/projectDetail",{
        admin:adminRef.current.value,
        projectName:projectNameRef.current.value,
        projectDesc:projectDescRef.current.value,
        StartDate:strDate.current.value,
        DeadDate:deadDate.current.value,
        projectMembers:member,
        projectTasks:taskData
      })
      navigate("/projects")
    } catch (error) {
      console.log(error)
    }
}
  console.log(users);
  const [showInput, setShowInput] = useState(false);
  const handleChange = (e) => {
    setFilter(e.target.value);
  };
  const filteredUsernames = users.filter((username) =>
    username.toLowerCase().includes(filter)
  );
  const add = () => {
    setShowInput(false);
    if(member.includes(inputRef1.current.value)){
      toast.error("Already Added")
    }
    else{
      setMember([...member,inputRef1.current.value])
      toast.success("Added")
    }
    console.log("member = ",member)
  };
  const filterTaskData=(task)=>{
    setTaskData(taskData.filter((item)=>item!==task))
    console.log(taskData)
  }
  const filterMember=(user)=>{
    setMember(member.filter((item)=>item!==user))
  }
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
      <Toaster/>
      <div className="w-full ">
        <div className="flex flex-col gap-10  px-5 py-10 h-fit bg-white rounded-3xl">
          <div className="flex justify-between w-full gap-10">
            <div className="flex flex-col gap-3 w-1/2 ">
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl">Project Name</h1>
              <input
              ref={projectNameRef}
                type="text"
                className="text-xl px-3 py-2 rounded-3xl w-full border-x-2 border-y-2 border-gray-300"
              />
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl">Description</h1>
              <input
              ref={projectDescRef}
                type="text"
                className="text-xl px-3 py-2 rounded-3xl    w-full border-x-2 border-y-2 border-gray-300"
              />
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl">Start Date</h1>
              <input
              ref={strDate}
                type="date"
                className="text-xl px-3 py-2 rounded-3xl    w-1/2 border-x-2 border-y-2 border-gray-300"
              />
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl">Deadline  Date</h1>
              <input
              ref={deadDate}
                type="date"
                className="text-xl px-3 py-2 rounded-3xl    w-1/2 border-x-2 border-y-2 border-gray-300"
              />
            </div>
          </div>
          <div className="flex flex-col gap-10 w-1/2">
            <div className="flex flex-col gap-5">
             <div className=" flex items-start justify-between">
               <h1 className="text-2xl">Team Members</h1>
              {showInput ? (
                <div className="flex gap-3 items-start ">
                  <div className="flex flex-col gap-2 ">
                    <input
                      ref={inputRef1}
                      onChange={handleChange}
                      className="bg-gray-100 w-48 py-1 rounded-3xl px-3"
                    />
                    <ul className="flex flex-col gap-3 py-2 px-3 shadow-2xl rounded-bl-2xl rounded-br-2xl z-auto">
                      {filteredUsernames.map((username, index) => (
                        <div className="flex flex-col gap-3 cursor-pointer ">
                          <li className="hover:bg-gray-100 py-2 px-1 rounded-lg" onClick={()=>inputRef1.current.value=username}  key={index}>{username}</li>
                        <hr/>
                        </div>
                      ))}
                    </ul>
                  </div>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded-xl"
                    onClick={add}
                  >
                    Add
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    className="text-2xl"
                    onClick={() => setShowInput(true)}
                  >
                    <FiPlus />
                  </button>
                </div>
              )}
             </div>
             
                {
                  member ? <div className="flex flex-col gap-3 z-0 ">{
                      member.map((user)=>{
                        return <div className="shadow-md">
                          <div className="w-full flex items-center justify-between  px-3 py-2">
                          <h1>{user}</h1>
                          <button onClick={()=>{
                            member.filter(item=>item!==user)
                          }}><MdDelete onClick={()=>filterMember(user)} className="text-red-500 font-extrabold"/></button>
                        </div>
                        </div>
                      })
                    }</div>: <div></div>
                }
            </div>
            <div className="flex flex-col gap-5">
              <h1 className="text-2xl ">Team Admin</h1>
              <input ref={adminRef} className="w-full bg-gray-100 px-5 py-2 rounded-2xl text-gray-400" value={profileData.username}/>
             </div>
          </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col gap-10" >
              <div className="flex items-center justify-between">
                <h1 className="text-2xl">Task Detail</h1>
            {
              taskInput ? <div className="flex  gap-3">
                <input  ref={inputRef2} className="bg-gray-100 w-72 px-3 py-1 text-xl rounded-3xl"/>
                <button onClick={()=>{
                  if(taskData.includes(inputRef2.current.value)){
                    toast.error("Already Added")
                  }
                  else{
                    setTaskData([...taskData,inputRef2.current.value])
                    toast.success("Added")
                  }

                  inputRef2.current.value=""
                  console.log("task = ",taskData)
                }} className="bg-green-500 text-white px-3 py-1 rounded-lg">Add</button>
              </div> : <div>
                <button onClick={()=>setTaskInput(true)} className="text-2xl"><FiPlus/></button>
              </div>
            }
              </div>
            <div>
              {
                taskData ? <div className="flex flex-col gap-5">
                  {taskData.map((user)=>{
                    return <div className="flex items-center justify-between shadow-lg px-4 py-3 ">
                      <h1 className="text-xl">{user}</h1>
                      <div className="flex">
                        {
                          member ? <div className="flex gap-10 ">
                            {member.map((user)=>{
                              return <div>
                                <h1 onClick={()=>{
                                  setText(true)
                                }} className={text ? "text-purple-700 cursor-pointer shadow-inner px-3 py-2" : "text-black cursor-pointer shadow-inner px-3 py-2"}>{user}</h1>
                              </div>
                            })}
                          </div> : <div></div>
                        }
                      </div>
                      <button onClick={()=>filterTaskData(user)}><MdDelete className="text-red-500 text-2xl"/></button>
                     
                    </div>
                  })}
                </div> : <div>

                </div>
              }
            </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button onClick={saveData} className='bg-green-500 text-white font-extrabold px-3 py-2 rounded-md'>Save</button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export default AddProject;
