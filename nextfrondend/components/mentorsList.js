import DP from "./../public/images/Dp.png";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFollowedMentorAsync } from './../redux/userSlice';

export default function MentorsList() {

  const dispatch = useDispatch();
  const currentState = useSelector((state) => (state.users));
  const [flag, setFlag] = useState(false)

  useEffect(() => {
    const access_token = currentState.addUserResponse.accessToken;
    dispatch(getFollowedMentorAsync({ currentState })).then(() => {
      console.log('currentState after dispatch in getFollowedMentorAsync: ', currentState);
      setFlag(true);
    });
  }, []);


  return (
    <section>
    {flag && <div className="shadow-4xl my-4 rounded-md border border-slate-100 pb-4">
      <div className="hover:bg-white-500 group m-auto mb-2 flex w-full cursor-pointer items-center justify-start gap-4 rounded-md p-2 pl-5 hover:shadow-lg">
        <h3 className="text-white-300 w-full cursor-pointer border-b border-slate-200 pb-4 text-center text-base text-xl font-bold">
          Mentors List
        </h3>
      </div>
      <div className="flex cursor-pointer border-b border-gray-500 p-3">
        <Image width = "40" height = "35" src={currentState.addUserResponse?.usersMentorData[0].profilePic} alt="" className="mr-4 h-12 w-12 rounded-full" />
        <div className="flex w-full flex-col space-y-2">
          <div className="text-[#6e767d]">
            <div className="group inline-block">
              <h4 className="text-[15px] font-bold text-[#d9d9d9] group-hover:underline sm:text-base">
                {`${currentState.addUserResponse?.usersMentorData[0].firstName} ${currentState.addUserResponse?.usersMentorData[0].lastName}`}
              </h4>
              <span className="text-sm sm:text-[15px]">{`${currentState.addUserResponse?.usersMentorData[0].about}`}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Second Row of data  */}
      <div className="flex cursor-pointer border-b border-gray-500 p-3">
        <Image width = "35" height = "30" src={currentState.addUserResponse?.usersMentorData[1].profilePic} alt="" className="mr-4 h-12 w-12 rounded-full" />
        <div className="flex w-full flex-col space-y-2">
          <div className="text-[#6e767d]">
            <div className="group inline-block">
              <h4 className="text-[15px] font-bold text-[#d9d9d9] group-hover:underline sm:text-base">
                {`${currentState.addUserResponse?.usersMentorData[1].firstName} ${currentState.addUserResponse?.usersMentorData[1].lastName}`}
              </h4>
              <span className="text-sm sm:text-[15px]">{`${currentState.addUserResponse?.usersMentorData[1].about}`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>}
    </section>
  );
}
