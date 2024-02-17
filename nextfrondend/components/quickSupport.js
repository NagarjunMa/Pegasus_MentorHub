import Image from "next/link";
import Link from "next/link";
import DP from "./../public/images/Dp.png";
import styles from "../styles/Home.module.scss";

export default function QuickSupport() {
  return (
    <div className="my-2 w-full p-2 shadow-2xl">
      <h3 className="text-white-800 text-xl font-semibold">
        Quick Conversation Starter
      </h3>
      <p className="text- text-white-200 ">
        <br />
        Work on the Idea and create a draft
        <br />
        Create roadmap to track progress
      </p>
    </div>
  );
}
