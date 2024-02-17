import React, { useState } from "react";

function NotesView(notes) {
  var data = notes.notes;

  if (data) {
    return (
      <>
        {data.map((note) => (
          <div className="p-5" style={{ color: "white" }}>
            <div>
              <p key={Math.random()}>{note}</p>
            </div>
          </div>
        ))}
      </>
    );
  } else {
    return <></>;
  }
}

export default NotesView;
