import InterestLayout from "../layout/layout_interest";
import SideBar from "../components/sideBar";
import Head from "next/head";
import NavBar from "./../components/navbar";
import RightSideBar from "../components/rightSideBar";
import Feed from "../components/Feed";
import { useState } from "react";
import Calendar from "../components/Calendarr";
import { Modal } from "antd";
import homeStyles from "./../styles/Home.module.scss";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMentorAvailabilityAndPosts } from "../redux/userSlice";

export default function MenteeWall() {
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  const currentState = useSelector((state) => (state.users));
  // const userState = useSelector((state) => (state.users.addUserResponse));
  
  useEffect(() => {
    // handle state changes here
    dispatch(
      getMentorAvailabilityAndPosts({currentState}));
  }, []);

  const sendCallback = () => {
    modalOpen ? close() : open();
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  return (
    <>
      {modalOpen && currentState.addUserResponse && currentState.addUserResponse.accessToken && (
        <Modal
          open={modalOpen}
          onOk={close}
          onCancel={handleCancel}
          centered
          width={1000}
          className={homeStyles.modalStyle}
        >
          <Calendar  dates={currentState.addUserResponse.mentorAvailability} />
        </Modal>
      )}
      <InterestLayout>
        <Head>
          <title>Mentee Wall</title>
        </Head>
        <main className="container mx-auto py-10 px-8">
          <NavBar />
          { currentState && currentState.addUserResponse && currentState.addUserResponse.userData && 
            (
              <SideBar userData={currentState.addUserResponse.userData}/>
            )
          }
          <RightSideBar sendCallback={sendCallback} />
          { currentState && currentState.addUserResponse && 
          <Feed posts = {currentState.addUserResponse}/>
    }
        </main>
      </InterestLayout>
    </>
  );
}
