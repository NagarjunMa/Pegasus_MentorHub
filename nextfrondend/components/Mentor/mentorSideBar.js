import React from "react";
import QuickSupport from "../quickSupport";
import Logout from "../logout";
import MentorProfile from "./mentorProfile";
import Ratings from "../ratings";

export default function MentorSideBar({ userData }) {
  return (
    <div className="to-gray-850 fixed top-0 -left-96 z-20 h-screen w-1/2 overflow-auto bg-[#e0813d] p-6 lg:left-0 lg:w-64">
      <div className="top-0 z-50 flex flex-col items-center justify-start">
        <h1 className="text-white-400 w-full cursor-pointer border-b border-slate-200 pb-4 text-center font-sans text-[20px] font-bold">
          Dashboard
        </h1>
        <MentorProfile />
        { userData && userData.rating && (<Ratings rating={userData.rating} />) }
        <Logout />
      </div>
    </div>
  );
}
