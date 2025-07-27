import moment from "moment";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "../../../components/skeleton";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  updateEvent, // Assuming this exists for editing events
} from "../../../store/eventSlice";
import CalendarModal from "./Modal";
import "./styles.sass";

const localizer = momentLocalizer(moment);

const CalendarBlock = () => {
  const dispatch = useDispatch();
  const { events, status, loading } = useSelector((state) => state.events);

  const [date, setDate] = useState(new Date());
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch, status]);

  const handleNavigate = (newDate) => {
    setDate(newDate);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const handleCreateEvent = (data) => {
    dispatch(createEvent(data));
    handleHideModal();
  };

  const handleEditEvent = (data) => {
    dispatch(updateEvent(data));
    handleHideModal();
  };

  const handleDeleteEvent = (event) => {
    dispatch(deleteEvent(event.id));
    handleHideModal();
  };

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

  return (
    <>
      {loading && <Skeleton />}
      <Calendar
        localizer={localizer}
        events={events || []}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={(slotInfo) => {
          setSelectedEvent({
            date: moment(slotInfo.start).format("YYYY-MM-DD"),
            start_time: moment(slotInfo.start).format(),
            end_time: moment(slotInfo.end).format(),
          });
          handleShowModal();
        }}
        onSelectEvent={(event) => {
          setSelectedEvent(event);
          handleShowModal();
        }}
        defaultView="week"
        views={["week"]}
        date={date}
        onNavigate={handleNavigate}
        min={
          new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 0)
        }
        max={
          new Date(date.getFullYear(), date.getMonth(), date.getDate(), 19, 0)
        }
        style={{ height: 600 }}
        formats={{
          timeGutterFormat: (date) => moment(date).format("HH:mm"),
          eventTimeRangeFormat: ({ start, end }) =>
            `${moment(start).format("HH:mm")} - ${moment(end).format("HH:mm")}`,
        }}
        eventPropGetter={(event) => getEventStyle(event)}
      />
      <CalendarModal
        showModal={showModal}
        isEdit={!!selectedEvent?.id}
        selectedEvent={selectedEvent}
        handleEditEvent={handleEditEvent}
        handleCreateEvent={handleCreateEvent}
        handleDeleteEvent={handleDeleteEvent}
        handleHideModal={handleHideModal}
      />
    </>
  );
};

export default CalendarBlock;
