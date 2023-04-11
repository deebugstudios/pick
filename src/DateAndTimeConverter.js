import dayjs from "dayjs";
let DATE = {};
export const TimeConverter = (props) => {
  // console.log(props)
  const date = new Date(props.value);
  DATE = {
    date: date.toLocaleDateString(),
    time:
      date
        .toLocaleTimeString()
        .substring(0, date.toLocaleTimeString().length - 6) +
      date.toLocaleTimeString().substring(date.toLocaleTimeString().length - 2),
    combined: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
  };
  return DATE.time;
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
