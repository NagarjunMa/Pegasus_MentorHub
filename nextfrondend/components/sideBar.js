import React from "react";
import Image from "next/image";
import DP from "./../public/images/Dp.png";
import styles from "../styles/Home.module.scss";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";

import Profile from "./profile";
import QuickSupport from "./quickSupport";
import Logout from "./logout";

export default function SideBar({userData}) {

  return (
    <div className="fixed top-0 -left-96 z-20 h-screen w-1/2 overflow-auto rounded-lg bg-[#e0813d] p-6 lg:left-0 lg:w-64">
      <div className="top-0 z-50 flex flex-col items-center justify-start">
        <h1 className="text-white-600 w-full border-b border-slate-200 pb-2 text-center font-sans text-[20px] font-bold">
          Dashboard
        </h1>
        <Profile userData={userData}/>
        <QuickSupport />
        <Logout />
      </div>
    </div>
  );
}
