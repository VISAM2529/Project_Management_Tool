import React from "react";
import { GrHomeRounded, GrSchedule } from "react-icons/gr";
import { PiCubeBold } from "react-icons/pi";
import { IoChatbubblesOutline } from "react-icons/io5";
import { MdOutlineSettings } from "react-icons/md";
import { SiRetool } from "react-icons/si";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className="w-80 h-screen fixed rounded-tr-3xl rounded-br-3xl py-10  px-5 text-white  flex flex-col items-center justify-between gap-10 shadow-2xl">
      <div className="flex flex-col items-center gap-16 ">
        <div className="text-4xl flex flex-col items-center gap-10">
          <Link to="" className="flex items-center gap-5">
            <SiRetool className="text-yellow-500" />
            <h1><span className="text-yellow-500 font-extrabold">T</span>eam<span className="text-yellow-500 font-extrabold">T</span>rackr</h1>
          </Link>
        </div>

        <div className="flex flex-col items-start gap-10 text-xl">
          <Link to='/home' className="flex items-center gap-5 hover:translate-x-3 transition-all ease-in-out duration-300 cursor-pointer">
            <GrHomeRounded className="text-yellow-500" />
            Home
          </Link>
          <Link to="/projects" className="flex items-center gap-5 hover:translate-x-3 transition-all ease-in-out duration-300 cursor-pointer">
            <PiCubeBold className="text-yellow-500" />
            Projects
          </Link>
          <Link to="https://chatsphere-sg.netlify.app/" className="flex items-center gap-5 hover:translate-x-3 transition-all ease-in-out duration-300 cursor-pointer">
            <PiCubeBold className="text-yellow-500" />
            Chat
          </Link>
          <Link to="https://team-trackr-sharing.vercel.app/" className="flex items-center gap-5 hover:translate-x-3 transition-all ease-in-out duration-300 cursor-pointer">
            <PiCubeBold className="text-yellow-500" />
            Meet
          </Link>
          <Link to={`/setting`} className="flex items-center gap-5 hover:translate-x-3 transition-all ease-in-out duration-300 cursor-pointer">
            <MdOutlineSettings className="text-yellow-500" />
            Settings
          </Link>
        </div>
      </div>
      <div className="text-sm flex flex-col  gap-5 bg-white bg-opacity-30 backdrop-blur-3xl px-5 py-5 rounded-3xl">
        <h1 className="text-lg">Go Pro</h1>
        <p className="text-xs">
          Upgrade to connect with your team while working from home.
        </p>
        <button className="bg-yellow-500 px-5 py-3 rounded-2xl text-xl">
          Upgrade Now
        </button>
      </div>
    </div>
  );
}

export default Navbar;
