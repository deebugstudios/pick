export default function convertMillisecondsToTime(ms) {
  var hours = Math.floor(ms / 3600000); // 1 Hour = 36000 Milliseconds
  var minutes = Math.floor((ms % 3600000) / 60000); // 1 Minute = 60000 Milliseconds

  if (hours === 0) {
    return minutes + " minutes";
  } else {
    return hours + " hour, " + minutes + " minutes";
  }
}
