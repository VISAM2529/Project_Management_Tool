import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {Toaster,toast} from "react-hot-toast"
import axios from "axios"
function SignUp() {
  const navigate = useNavigate()
  const [link,setLink]=useState("")
  const fnameRef = useRef("")
  const lnameRef = useRef("")
  const emailRef = useRef("")
  const mobileRef = useRef("")
  const usernameRef = useRef("")
  const passwordRef = useRef("")
  const [role,setRole]=useState("")

  const saveData = async()=>{
      try {
        axios.post("https://project-management-tool-ryex.onrender.com/userCreate",{
          fname:fnameRef.current.value,
          lname:lnameRef.current.value,
          email:emailRef.current.value,
          mobile:mobileRef.current.value,
          username:usernameRef.current.value,
          password:passwordRef.current.value,
          Role:role
        }).then((res)=>{
          console.log(res)
          if(res.data==="Created"){
            toast.success("Account Created Successfully")
            navigate("/login")

          }
          else if(res.data==="Exist"){
            toast.error("Already Exist")
            navigate("/signup")
          }
        })
      } catch (error) {
        console.log(error)
      }
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
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
    <div className="flex h-fit items-center justify-center">
      <div className="w-4/6 h-5/6 py-5 bg-white backdrop-blur-3xl bg-opacity-20 flex flex-col gap-14 items-center justify-between rounded-3xl">
        <div className="flex flex-col gap-5 w-full px-5 items-center">
          <h1 className="text-3xl text-yellow-500 font-extrabold">
            Create Account
          </h1>
          <hr className="w-full bg-white" />
        </div>
       <div className="flex flex-col items-center gap-10  ">
       <div className="flex  gap-5">
          <div className="flex flex-col items-start gap-3">
            <h1 className="text-yellow-500 font-extrabold">First Name</h1>
            <input
              ref={fnameRef}
                required
              type="text"
              className="text-white text-xl bg-transparent border-x-2 border-y-2 border-wihte border-l-0 border-t-0 border-r-0"
            />
          </div>
          <div className="flex flex-col items-start gap-3">
            <h1 className="text-yellow-500 font-extrabold">Last Name</h1>
            <input
            ref={lnameRef}
             required
              type="text"
              className="text-xl text-white bg-transparent border-x-2 border-y-2 border-wihte border-l-0 border-t-0 border-r-0"
            />
          </div>
        </div>
        <div className="flex  gap-5">
          <div className="flex flex-col items-start gap-3">
            <h1 className="text-yellow-500 font-extrabold">EmailId</h1>
            <input
              ref={emailRef}
             required
              type="email"
              className="text-white text-xl bg-transparent border-x-2 border-y-2 border-wihte border-l-0 border-t-0 border-r-0"
            />
          </div>
          <div className="flex flex-col items-start gap-3">
            <h1 className="text-yellow-500 font-extrabold">Mobile No</h1>
            <input
              ref={mobileRef}
              type="number"
              className="text-xl text-white bg-transparent border-x-2 border-y-2 border-wihte border-l-0 border-t-0 border-r-0"
            />
          </div>
        </div>
        <div className="flex  gap-5">
          <div className="flex flex-col items-start gap-3">
            <h1 className="text-yellow-500 font-extrabold">Username</h1>
            <input
              ref={usernameRef}
             required
              type="text"
              className="text-white text-xl bg-transparent border-x-2 border-y-2 border-wihte border-l-0 border-t-0 border-r-0"
            />
          </div>
          <div className="flex flex-col items-start gap-3">
            <h1 className="text-yellow-500 font-extrabold">Password</h1>
            <input
              ref={passwordRef}
             required
              type="text"
              className="text-xl text-white bg-transparent border-x-2 border-y-2 border-wihte border-l-0 border-t-0 border-r-0"
            />
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <h1 className="text-yellow-500 font-extrabold">Role</h1>
          <div className="flex items-center gap-10">
          <div className="flex items-center gap-3">
          <input onClick={(e)=>{
            setRole(e.target.value)
          }} id="Manager" type="radio" value="Manager" name="role"/>
          <label for="Admin" className="text-white font-bold">Manager</label>
          </div>
          <div className="flex items-center gap-3">
          <input onClick={(e)=>{
            setRole(e.target.value)
          }} id="Admin" type="radio" value="Employee" name="role"/>
          <label for="Admin" className="text-white font-bold">Employee</label>
          </div>
          </div>
        </div>
       </div>
        <div className="flex flex-col items-center gap-3 ">
          <Link to={link} onClick={saveData} className="bg-yellow-500 text-white px-5 py-3 rounded-2xl">
            Create Account
          </Link>
          <Link to="/login" className="text-white text-sm">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
    </motion.div>
  );
}

export default SignUp;
