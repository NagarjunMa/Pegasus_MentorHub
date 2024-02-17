import React from "react";
import { Badge, Calendar } from "antd";


function Calendarr({ dates }) {
  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  const dateCellRender = (value) => {
    const listData = dates[`${value.date()}`] || [];
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  
  return (
    <Calendar dateCellRender={dateCellRender} onPanelChange={onPanelChange} />
  );
}



export default Calendarr;
