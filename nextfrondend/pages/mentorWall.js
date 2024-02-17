import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMentorPostsAsync } from "../redux/userSlice";
import Head from "next/head";
import MentorSideBar from "../components/Mentor/mentorSideBar";
import MentorPosts from "../components/Mentor/mentorPosts";
import { MdArrowCircleUp } from "react-icons/md";
import InterestLayout from "../layout/layout_interest";
import MentorNotes from "../components/Mentor/mentorNotes";

export default function post() {
  const dispatch = useDispatch();
  const currentState = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(getMentorPostsAsync({ currentState }));
  }, []);
  return (
    <InterestLayout>
      <Head>
        <title>Mentor Posts</title>
      </Head>
      <main className="container mx-auto py-10 px-8">
        <div className="title">
          <h1 className="text-white-800 mr-30 mb-5 py-2 text-center text-4xl font-bold text-[#f26130]">
            The Wall
          </h1>
          {/* <p className="w-3/4 mx-auto text-gray-400">Ipsum lorem</p> */}
        </div>
        {currentState.addUserResponse &&
          currentState.addUserResponse.mentorPosts && (
            <MentorPosts posts={currentState.addUserResponse.mentorPosts} />
          )}
        {currentState.addUserResponse &&
          currentState.addUserResponse.userData &&
          currentState.addUserResponse.mentorPosts &&
          currentState.addUserResponse.mentorPosts.length === 0 && (
            <div className="border-white-700 xl-mr-[144px] mt-12 ml-20 max-w-3xl flex-grow text-white sm:ml-[73px] xl:ml-[176px]">
              <div className="bg-slate-750 sticky top-0 z-50 mt-[50px] flex items-center border-b border-gray-400 py-2 px-3 text-[#d9d9d9] sm:justify-between"></div>
              <div className="pb-72">
                <div className="flex h-full items-center justify-center">
                  <div className="flex flex-col items-center">
                    <MdArrowCircleUp className="text-5xl text-gray-400" />
                    <p className="text-xl text-gray-400">No Posts</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        {currentState.addUserResponse &&
          currentState.addUserResponse.userData &&
          currentState.addUserResponse.mentorPosts && (
            <MentorSideBar userData={currentState.addUserResponse.userData} />
          )}
        <MentorNotes />
      </main>
    </InterestLayout>
  );
}
