import React from "react";
import "./style.sass";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

const TimetableHeader = () => {
  return (
    <div className="timetableHeader">
      <div className="timetableHeaderMonth">
        <div className="timetableHeaderMonthTitle">Агуст 2024</div>
        <div className="timetableHeaderMonthArrows">
          <div className="timetableHeaderMonthArrowLeft">
            <FaArrowLeft />
          </div>
          <div className="timetableHeaderMonthArrowRight">
            <FaArrowRight />
          </div>
        </div>
      </div>
      <div className="timetableHeaderActions">
        <button>Дублировать неделю</button>
        <button>
          <FiPlus />
          Добавить
        </button>
      </div>
    </div>
  );
};

export default TimetableHeader;
