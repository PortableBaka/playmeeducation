import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import "./styles.sass";

const localizer = momentLocalizer(moment);

const CalendarBlock = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const handleNavigate = (newDate) => {
    setDate(newDate);
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
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor='start'
      endAccessor='end'
      selectable
      onSelectSlot={({ start, end }) => {
        const title = window.prompt("Введите название мероприятия:");
        if (title) {
          setEvents([...events, { start, end, title }]);
        }
      }}
      defaultView='week'
      views={["week"]}
      date={date}
      onNavigate={handleNavigate}
      min={new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 0)}
      max={new Date(date.getFullYear(), date.getMonth(), date.getDate(), 19, 0)}
      style={{ height: 600 }}
      formats={{
        timeGutterFormat: (date, culture, localizer) => moment(date).format("HH:mm"),
        eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
          `${moment(start).format("HH:mm")} - ${moment(end).format("HH:mm")}`,
      }}
      eventPropGetter={(event) => getEventStyle(event)}
    />
  );
};

export default CalendarBlock;
