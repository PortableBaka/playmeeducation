import React from "react";
import CalendarBlock from "../calendar";
import Event from "../events";
import "./styles.sass";

const TimeTable = () => {
  return (
    <div className='timetable'>
      <CalendarBlock />
      <Event />
    </div>
  );
};

export default TimeTable;
