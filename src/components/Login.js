import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
function Login() {
  const navigate = useNavigate()
  const usernameRef = useRef("")
  const passwordRef = useRef("")
  const emailRef = useRef("")
  const saveData=()=>{
    try {
      axios.post("https://project-management-tool-ryex.onrender.com/userLogin",{
        email:emailRef.current.value,
        username:usernameRef.current.value,
        password:passwordRef.current.value
      }).then((res)=>{
        if(res.data==="Success"){
          toast.success("Login Successfully")
          navigate("/home")
        }
        else if(res.data==="Invalid"){
          toast.error("Invalid Username or Password")
          navigate("/login")
        }
        else if(res.data==="notFound"){
          toast.error("User Not Found")
          navigate("/login")

        }
        else{
          toast.error("Something Went Wrong")
          navigate("/login")

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
    <Toaster/>
    <div className='flex h-screen items-center justify-center'>
        <div className='w-2/6 h-5/6 py-10 bg-white backdrop-blur-3xl bg-opacity-20 flex flex-col gap-14 items-center justify-between rounded-3xl'>
            <div className='flex flex-col gap-5 w-full px-5 items-center'>
            <h1 className='text-3xl text-yellow-500 font-extrabold'>Login</h1>
            <hr className='w-full bg-white'/>
            </div>
            <div className='flex flex-col gap-5'>
            <h1 className='text-yellow-500 font-extrabold'>Email</h1>
            <input ref={emailRef} type='email' className='text-white text-xl bg-transparent border-x-2 border-y-2 border-wihte border-l-0 border-t-0 border-r-0'/>
            <h1 className='text-yellow-500 font-extrabold'>Username</h1>
            <input ref={usernameRef} type='text' className='text-white text-xl bg-transparent border-x-2 border-y-2 border-wihte border-l-0 border-t-0 border-r-0'/>
            <h1 className='text-yellow-500 font-extrabold'>Password</h1>
            <input ref={passwordRef} type='password'  className='bg-transparent border-x-2 border-y-2 border-wihte border-l-0 border-t-0 border-r-0'/>
            </div>
            <div className='flex flex-col items-center gap-3 '>
            <button onClick={saveData} className='bg-yellow-500 text-white px-5 py-3 rounded-2xl'>Login</button>
            <Link to="/signup" className='text-white text-sm'>Don't have an account?</Link>
            </div>
        </div>
    </div>
    </motion.div>
  )
}

export default Login