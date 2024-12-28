import React from "react";
import "./style.sass";
import TimetableHeader from "../../../components/timetableHeader";
import { BsTrash3Fill } from "react-icons/bs";
import { FaCircleInfo } from "react-icons/fa6";

const Timetable = () => {
  return (
    <div className="timetableMainPageContentContainer">
      <div className="timetableSchedule">
        <TimetableHeader />
        <div className="timetableScheduleTable">
          <div className="tableScheduleWrapperHeader">
            <div className="tableScheduleHeaderItem"></div>
            <div className="tableScheduleHeaderItem">
              <div className="tableScheduleHeaderItemTitle">21</div>
              <div className="tableScheduleHeaderItemDay">Пн</div>
            </div>
            <div className="tableScheduleHeaderItem">
              <div className="tableScheduleHeaderItemTitle">22</div>
              <div className="tableScheduleHeaderItemDay">Вт</div>
            </div>
            <div className="tableScheduleHeaderItem">
              <div className="tableScheduleHeaderItemTitle">23</div>
              <div className="tableScheduleHeaderItemDay">Ср</div>
            </div>
            <div className="tableScheduleHeaderItem">
              <div className="tableScheduleHeaderItemTitle">24</div>
              <div className="tableScheduleHeaderItemDay">Чт</div>
            </div>
            <div className="tableScheduleHeaderItem">
              <div className="tableScheduleHeaderItemTitle">25</div>
              <div className="tableScheduleHeaderItemDay">Пт</div>
            </div>
          </div>
          <div className="tableScheduleWrapperBody">
            <div className="tableScheduleBodyItem">
              <div className="timeZone">8:00</div>
              <div className="timeZone">9:00</div>
              <div className="timeZone">10:00</div>
              <div className="timeZone">11:00</div>
              <div className="timeZone">12:00</div>
              <div className="timeZone">13:00</div>
              <div className="timeZone">14:00</div>
              <div className="timeZone">15:00</div>
              <div className="timeZone">16:00</div>
              <div className="timeZone">17:00</div>
              <div className="timeZone">18:00</div>
            </div>
            <div className="tableScheduleBodyItem"></div>
            <div className="tableScheduleBodyItem"></div>
            <div className="tableScheduleBodyItem"></div>
            <div className="tableScheduleBodyItem"></div>
            <div className="tableScheduleBodyItem"></div>
          </div>
        </div>
      </div>
      <div className="timetableScheduleActions">
        <div className="timetableScheduleActionsHeader">
          <div className="timetableScheduleActionsHeaderTitle">Мероприятие</div>
          <div className="timetableScheduleActionsHeaderRemove">
            <BsTrash3Fill />
          </div>
        </div>
        <div className="timetableScheduleActionsBody">
          <div className="notfyWrapper">
            <FaCircleInfo />
            <p>
              Мероприятие отобразится в приложении для детей после нажатия на
              кнопку сохранения
            </p>
          </div>
          <form action="">
            <div className="formItem">
              <select name="" id="">
                <option value="">Занятие</option>
                <option value="">Мероприятие 2</option>
                <option value="">Мероприятие 3</option>
                <option value="">Мероприятие 4</option>
                <option value="">Мероприятие 5</option>
              </select>
            </div>
            <div className="formItem">
              <label htmlFor="">Название</label>
              <input type="text" placeholder="Например, математика" />
            </div>
            <div className="formItem">
              <div className="dateAndTime">
                <div className="dateAndTimeItem">
                  <label htmlFor="">Дата</label>
                  <input type="date" />
                </div>
                <div className="dateAndTimeItem">
                  <label htmlFor="">Начало</label>
                  <input type="time" />
                </div>
                <div className="dateAndTimeItem">
                  <label htmlFor="">Конец</label>
                  <input type="time" />
                </div>
              </div>
            </div>
            <div className="formItem">
              <label htmlFor="">Учитель</label>
              <select name="" id="">
                <option value="" hidden>Выберите Учителя</option>
                <option value="">Алёна Дмитриевна 2</option>
                <option value="">Алёна Дмитриевна 3</option>
                <option value="">Алёна Дмитриевна 4</option>
                <option value="">Алёна Дмитриевна 5</option>
              </select>
            </div>
            <div className="formActions">
                <button type="button">Закрыть</button>
                <button type="submit">Сохранить</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Timetable;
