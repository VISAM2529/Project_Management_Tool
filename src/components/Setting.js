import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
function Setting() {
  const [profileData, setProfileData] = useState([]);
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
    fetchData1();
  }, []);
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
      <div className="bg-white w-full h-screen rounded-3xl px-10 py-10">
        <div className="flex flex-col w-full h-full items-center justify-between">
          <div className="flex flex-col gap-24 w-full  items-center">
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl">Your Profile</h1>
              <hr className="w-48" />
            </div>
            <div className="text-2xl flex flex-col gap-14 w-full">
              <div className="flex items-center justify-between gap-5">
              <h1 className="text-center shadow-xl border-x-2 border-y-2 border-gray-100 rounded-xl w-1/2 px-10 py-5 ">First Name : {profileData.firstName}</h1>
              <h1 className="text-center shadow-xl border-x-2 border-y-2 border-gray-100 rounded-xl w-1/2 px-10 py-5">Last Name : {profileData.lastName}</h1>
              </div>
              <div className="flex items-center justify-between gap-5">
              <h1 className="text-center shadow-xl border-x-2 border-y-2 border-gray-100 rounded-xl w-1/2 px-10 py-5">Email : {profileData.email}</h1>
              <h1 className="text-center shadow-xl border-x-2 border-y-2 border-gray-100 rounded-xl w-1/2 px-10 py-5">Mobile No : {profileData.mobileno}</h1>
              </div>
              <div className="flex items-center justify-center">
              <h1 className="text-center shadow-xl border-x-2 border-y-2 border-gray-100 rounded-xl w-1/2 px-10 py-5">Your Role : {profileData.Role}</h1>
              </div>
            </div>
          </div>
          <Link
            to="/login"
            className="bg-red-500 w-fit  px-5 py-2 text-white rounded-xl"
          >
            Log Out
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default Setting;
