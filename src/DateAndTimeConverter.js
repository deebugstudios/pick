
let DATE = {}
export const TimeConverter = (props) => {
    // console.log(props)
    const date = new Date(props.value);
    DATE =  {
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
        combined: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    }
    return DATE.time;
  }
  export const DateConverter = (props) => {
    // console.log(props)
    const date = new Date(props.value);
    DATE =  {
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
        combined: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    }
    return DATE.date;
  }