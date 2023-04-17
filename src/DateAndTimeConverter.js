import dayjs from "dayjs";
let DATE = {};
export const TimeConverter = (props) => {
  const date = new Date(props.value);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const meridiem = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12; // convert hour to 12-hour format
  const formattedTime = `${hour12}:${minute
    .toString()
    .padStart(2, "0")}${meridiem}`;
  return formattedTime;
};
export const DateConverter = (props) => {
  // console.log(props)
  const date = new Date(props.value);
  DATE = {
    date: date.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    }),
    time: date.toLocaleTimeString(),
    combined: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
  };
  return DATE.date;
};

export const WeekDayConverter = (props) => {
  const date = dayjs(props.value);

  return date.format("dddd");
};

export const EveryDateConverter = (props) => {
  const date = dayjs(props.value);
  return date.format("dddd" + " D" + " MMMM" + " YYYY");
};
export const HourConverter = (props) => {
  const date = dayjs(props.value);
  return date.format("h");
};
export const MinsConverter = (props) => {
  const date = dayjs(props.value);
  return date.format("mm");
};
