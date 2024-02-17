import Link from "next/link";
import Image from "next/image";
import DP from "./../public/images/Dp.png";
import styles from "../styles/Home.module.scss";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Profile({userData}) {
  return (
    <div className="my-4  pb-4">
      <div className="hover:bg-white-500 group m-auto mb-2 flex w-full items-center justify-start gap-3 rounded-md p-2 pl-5 hover:shadow-lg">
        <div className="rounded-lg bg-[#f0522b] shadow-xl">
          <Image
            className="mx-auto mt-4 w-8/12 rounded-t-lg object-scale-down"
            src={userData.profilePic}
            alt="profile picture"
            width={35}
            height={35}
          />
          <div className="p-3 text-center">
            <h3 className="text-l text-white-700 mb-3 mt-6 justify-center font-bold">
              {`${userData.firstName}`}
            </h3>
            <p className="text-white-600 text-base font-normal">
            {`${userData.about}`}
              <br />
            </p>
            <button className={styles.button}>
              <Link href="/profile">Profile</Link>
            </button>
            <button className={styles.button}>
              <Link href="/selection">Mentor Selection</Link>
            </button>
          </div>
        </div>
      </div>
      {/* } */}
    </div>
  );
}
