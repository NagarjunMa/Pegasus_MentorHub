import Head from "next/head";
import MentorPost from "../components/mentorPost";
import Layout from "../layout/layout";
import InterestLayout from "../layout/layout_interest";
import { createPostAsync } from "../redux/userSlice";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';

export default function post() {
  const router = useRouter();
  const currentState = useSelector((state) => (state.users));
  const dispatch = useDispatch();

  const onSubmit = (post) => {
    const accessToken = currentState.addUserResponse.accessToken;
    dispatch(
      createPostAsync({
        data: post,
        accessToken: accessToken
      })
    ).then(() => {
      console.log('currentState.addUserResponse.status: ', currentState.addUserResponse.postStatus);
      // if(currentState.addUserResponse.postStatus &&  currentState.addUserResponse.postStatus== 201) {
        router.push('/mentorWall');
      // }
    });
  }
  return (
    <>
      <Layout>
        <Head>
          <title>Mentor Post</title>
        </Head>
        <section className="mx-auto flex w-3/4 flex-col gap-3">
          <div className="title">
            <h1 className="mr-30 mb-4 py-2 text-center text-4xl font-bold text-gray-800">
              Mentor Post
            </h1>
            {/* <p className="w-3/4 mx-auto text-gray-400">Ipsum lorem</p> */}
          </div>
          <MentorPost onSubmit={onSubmit} currentState={currentState}/>
        </section>
      </Layout>
    </>
  );
}
