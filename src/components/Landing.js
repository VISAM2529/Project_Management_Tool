import React from 'react'
import Lottie from "lottie-react"
import animateData from "../assets/home.json"
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion' 
function Landing() {
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
    <div className='h-screen flex flex-col items-center py-10 gap-10  px-5 bg-transparent'>
        <h1 className='text-4xl text-white '>Empower Your <span className='text-yellow-500'>Projects</span>, Simplify <span className='text-yellow-500'>Success</span></h1>
        <hr className='w-full bg-white'/>
        <Lottie animationData={animateData} loop={true} className='w-96 h-96'/>
        <Link to="/login" className='bg-yellow-500 px-5 py-3 text-white text-2xl rounded-2xl'>Get Started</Link>
    </div>
    </motion.div>
  )
}

export default Landing