import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Notes from "./notes";
import styles from "../styles/Home.module.scss";
import NotesView from "./NotesView";
import Modal from "./Modal/Modal";
import MentorsList from "./mentorsList";

export default function RightSideBar({ sendCallback }) {
  //   const [modalOpen, setModalOpen] = useState(false);

  //   const close = () => setModalOpen(false);
  //   const open = () => setModalOpen(true);
  const [data, setData] = useState([]);

  // callback function
  const sendPushDataToParent = (addValue) => {
    setData((prevElements) => [...prevElements, addValue]);
  };

  return (
    <div className="overfow-auto fixed top-0 -right-96 z-20 h-screen w-1/2 rounded-lg bg-[#e0813d] p-6 shadow-2xl lg:right-0 lg:w-80">
      <div className="flex flex-col items-center justify-start">
        <h1 className="text-white-600 border-white-200 w-full cursor-pointer border-b pb-2 text-center font-sans text-[20px] font-bold">
          Tools
          <br />
        </h1>
        <div>
          <div className=" align-center mx-auto flex justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={styles.button}
              onClick={() => sendCallback()}
            >
              Book your slots!
            </motion.button>
          </div>
          <div>
            <MentorsList />
          </div>
          <div>
            <NotesView notes={data} />
          </div>
          <div>
            <Notes
              dataList={data}
              sendPushDataToParent={sendPushDataToParent}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
