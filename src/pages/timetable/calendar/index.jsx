import moment from "moment";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createEvent,
  deleteEvent,
  getAllEvents
} from "../../../store/eventSlice";
import "./styles.sass";
import {Alert, Button, Modal} from "antd";
import {useTranslation} from "react-i18next";

const localizer = momentLocalizer(moment);

const CalendarBlock = () => {
  const dispatch = useDispatch();
  const { events, status, loading, error } = useSelector((state) => state.events);

  const [date, setDate] = useState(new Date());
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log(status)
    if(status === "idle") dispatch(getAllEvents());
  }, [dispatch, status]);

  const handleNavigate = (newDate) => {
    setDate(newDate);
  };

  const handleCreateEvent = ({ start, end }) => {
    const title = window.prompt("Enter event title:");
    if (title) {
      console.log(start, end)
      const data = { 
        date: moment(start).format("YYYY-MM-DD"),
        name: title,
        start_time: moment(start).format(),
        end_time: moment(end).format(),
        event_type: "Событие",
      }
      dispatch(createEvent(data));
    }
  }

  const handleDeleteEvent = (event) => {
    const e = events.find((e) => e.start === event.start && e.end === event.end);
    dispatch(deleteEvent(e.id));

  }

  const handleShowModal = () => {
    setShowModal(true);
  }

  const handleHideModal = () => {
    setShowModal(false)
  }

  console.log(events)

  const getEventStyle = (event) => {
    const hour = moment(event.start).hour();
    let backgroundColor;
    let borderColor;
    if (hour < 12) {
      backgroundColor = "rgba(239, 219, 255, 1)";
      borderColor = "rgba(146, 84, 222, 1)";
    } else if (hour < 16) {
      backgroundColor = "rgba(255, 247, 230, 1)";
      borderColor = "rgb(246, 198, 95)";
    } else {
      backgroundColor = "rgba(240, 245, 255, 1)";
      borderColor = "rgb(73, 133, 253)";
    }

    return {
      style: {
        backgroundColor,
        borderColor,
        border: `1px solid ${borderColor}`,
        color: "black",
        borderRadius: "5px",
        padding: "5px",
      },
    };
  };

  return <>
    <Calendar
        localizer={localizer}
        events={events || []} 
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleCreateEvent}
        onSelectEvent={handleShowModal}
        defaultView="week"
        views={["week"]}
        date={date}
        onNavigate={handleNavigate}
        min={new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 0)}
        max={new Date(date.getFullYear(), date.getMonth(), date.getDate(), 19, 0)}
        style={{ height: 600 }}
        formats={{
          timeGutterFormat: (date, culture, localizer) =>
            moment(date).format("HH:mm"),
          eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
            `${moment(start).format("HH:mm")} - ${moment(end).format("HH:mm")}`,
        }}
        eventPropGetter={(event) => getEventStyle(event)}
      />
    <Modal open={showModal} onCancel={handleHideModal} />
    {/*{ showDeletePopover && <div>*/}
    {/*    <Alert*/}
    {/*    message={t("delete_alert_message")}*/}
    {/*    banner*/}
    {/*    className="deleteAlert"*/}
    {/*/>*/}
    {/*<Button onClick={hide}>{t("cancel")}</Button>*/}
    {/*<Button type="primary" onClick={(e) => handleDelete(e, libraryDataById?.id)}>*/}
    {/*  {t("delete")}*/}
    {/*</Button>*/}
    {/*</div>}*/}
  </>
};

export default CalendarBlock;
