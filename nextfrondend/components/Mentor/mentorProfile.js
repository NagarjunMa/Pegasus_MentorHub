import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import styles from "../../styles/Home.module.scss";

export default function MentorProfile() {
  const currentState = useSelector((state) => state.users);
  const user = currentState.addUserResponse.userData;

  return (
    <div className="my-4 pb-4 shadow-2xl">
      <div className="hover:bg-white-500 group m-auto mb-2 flex w-full cursor-pointer items-center justify-start gap-4 rounded-md p-2 pl-5 hover:shadow-lg">
        <div className="rounded-lg bg-[#f0522b] shadow-xl">
          <Image
            width={100}
            height={100}
            className="mx-auto mt-4 w-8/12 rounded-t-lg object-scale-down"
            src={user.profilePic}
            alt="profile picture"
          />
          <div className="p-3 text-center">
            <h3 className="text-l text-white-700 mb-3 mt-6 justify-center font-bold">
              {`${user.firstName} ${user.lastName}`}
            </h3>
            <p className="text-white-600 text-base font-normal">
              {user.about}
              <br />
            </p>
            <button className={styles.button}>
              <Link href="/post">Create a Post</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
