import Link from "next/link";
import { MdLogout } from "react-icons/md";

export default function Navbar() {
  return (
    <div>
      <nav className=" mb-30  fixed top-5 z-10 h-10 w-full opacity-100">
        <div className="w-full ">
          <div className="flex h-1 w-full items-center">
            <div className="items inset-2 mx-40 flex w-full items-center justify-between">
              <h1 className="text-2xl font-bold text-[#f26130]">MentorHub</h1>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
