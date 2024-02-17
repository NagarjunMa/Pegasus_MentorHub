import React, { useEffect, useState } from "react";
import Notes from "../notes";
import NotesView from "../NotesView";

export default function MentorNotes({ sendCallback }) {
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
