import { motion } from "framer-motion";
import { MdArrowCircleUp } from "react-icons/md";
import Modal from "./Modal/Modal";
import Posts from "../components/Posts";

export default function Feed({ posts }) {
  //   const [modalOpen, setModalOpen] = useState(false);

  //   const close = () => setModalOpen(false);
  //   const open = () => setModalOpen(true);

  return (
    <>
      <div className="border-white-700 xl-mr-[144px] mt-12 ml-20 max-w-3xl flex-grow text-white sm:ml-[73px] xl:ml-[176px]">
        <div className="bg-slate-750 sticky top-0 z-50 mt-[50px] flex items-center border-b border-gray-400 py-2 px-3 text-[#d9d9d9] sm:justify-between">
          <h2 className="top-0 z-50 text-lg text-black sm:text-xl">
            Your Wall
          </h2>
          <div className="cursor-pointer text-white">
            <MdArrowCircleUp
              className="h-7 w-7 text-white hover:text-slate-500"
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            />
          </div>
        </div>
        <div className="pb-72">
          {posts.mentorPosts &&
            posts.mentorPosts.map((post) => <Posts post={post} />)}
        </div>
      </div>
    </>
  );
}
