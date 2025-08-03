import moment from "moment";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "../../../components/skeleton";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  updateEvent,
} from "../../../store/eventSlice";
import CalendarModal from "./Modal";
import "./styles.sass";

const localizer = momentLocalizer(moment);

const CalendarBlock = () => {
  const dispatch = useDispatch();
  const { events, loading } = useSelector((state) => state.events);

  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    if (!showModal) {
      dispatch(getAllEvents());
    }
  }, [dispatch, showModal]);

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
    dispatch(createEvent(data)).then(() => {
      handleHideModal();
      dispatch(getAllEvents());
    });
  };

  const handleEditEvent = (data) => {
    dispatch(updateEvent(data)).then(() => {
      handleHideModal();
      dispatch(getAllEvents());
    });
  };

  const handleDeleteEvent = (event) => {
    dispatch(deleteEvent(event.id)).then(() => {
      handleHideModal();
      dispatch(getAllEvents());
    });
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
        padding: "6px 5px",
        width: "100% !important",
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
        showAllEvents
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
        formats={{
          timeGutterFormat: (date) => moment(date).format("HH:mm"),
          eventTimeRangeFormat: ({ start, end }) => "",
        }}
        eventPropGetter={(event) => getEventStyle(event)}
        components={{
          header: ({ label, date }) => (
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "24px", fontWeight: 600 }}>
                {moment(date).format("DD")}
              </p>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "rgba(0, 0, 0, 0.45)",
                }}
              >
                {moment(date).format("dd")}
              </span>
            </div>
          ),
          event: ({ event }) => (
            <div style={{ height: "auto !important" }}>
              <p className="event_name">{event.name}</p>
              <span className="event_time" style={{ paddingTop: "4px" }}>
                {`${moment(event.start_time).format("HH:mm")} - ${moment(
                  event.end_time
                ).format("HH:mm")}`}
              </span>
            </div>
          ),
        }}
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
