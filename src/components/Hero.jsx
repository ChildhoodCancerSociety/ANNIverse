import React from "react";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-fixed bg-center bg-cover custom-img">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/70 z-[2]" />
      <div className="p-5 text-white z-[2]  mt-[-10rem]">
        <h2 className="text-5xl font-bold">
          CCS Volunteer Management Platform
        </h2>
        <p className="py-5 text-xl">We are here to make a meaningful impact.</p>
        <Link to="/register">
          <button className="px-8 py-2 border ">Start</button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
