import styles from "../styles/Home.module.scss";
import { useState } from "react";

export default function Contents({ mentor, subscribeBtnOperation }) {
  const [flag, setFlag] = useState(true);

  console.log(mentor);

  return (
    <div className="grid lg:grid-cols-3">
      {/* {cardList.map((card) => ( */}
      {/* {currentState.addUserResponse.allMentorData.map((mentor) => ( */}
      <div
        className=" rounded-lg bg-[#F5F2EC] text-black shadow-xl"
        key={mentor._id}
      >
        <img
          className="mx-auto mt-4 w-3/12 rounded-t-lg object-scale-down"
          src={mentor.profilePic}
          alt=""
        />
        <div className="p-3 text-center">
          <h3 className="text-l text-white-700 mb-3 justify-center font-bold">
            {`${mentor.firstName} ${mentor.lastName}`}
          </h3>
          <p className="text-white-600 text-base font-normal">{mentor.about}</p>
          {flag && (
            <button
              className={styles.button}
              style={{ color: "black" }}
              onClick={() => {
                setFlag(false);
                return subscribeBtnOperation(mentor._id);
              }}
            >
              Follow
            </button>
          )}
        </div>
      </div>
      {/* ))} */}
    </div>
  );
}
