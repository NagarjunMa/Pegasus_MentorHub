import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./../../styles/Home.module.scss";

const dropIn = {
  hidden: {
    y: "100vh",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
  },
};

export default function Modal({ handleClose, text }) {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={styles.modal}
        variants={dropIn}
        initial="visible"
        animate="visible"
        exit="exit"
      >
        <Calendar />
      </motion.div>
    </Backdrop>
  );
}
