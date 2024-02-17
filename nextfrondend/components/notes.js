import { useState, useEffect } from "react";
import { MdInput } from "react-icons/md";

export default function Notes({ sendPushDataToParent }) {
  const [inputData, setInputData] = useState("");

  function takeInput() {
    sendPushDataToParent(inputData);
    setInputData("");
  }

  return (
    <div>
      <h2 className="text-center">
        <br />
        Notes!!
        <br />
      </h2>
      <input
        className="m-0 box-border h-12 w-72 bg-white text-black"
        type="text"
        name="Notes"
        value={inputData}
        onChange={(e) => {
          setInputData(e.target.value);
        }}
      />
      {/* <button onClick={takeInput}> Button</button> */}
      <div
        onClick={takeInput}
        className="border-white-300 hover:bg-white-600 group m-auto mb-2 flex w-full cursor-pointer gap-4 rounded-md p-2 px-5 hover:shadow-lg"
      >
        <MdInput className="text-white-600 align-center justify-cente flex text-2xl group-hover:text-white" />
        <h3 className="text-white-800 align-center flex justify-center text-lg font-bold group-hover:text-white">
          Submit
        </h3>
      </div>
    </div>
  );
}
