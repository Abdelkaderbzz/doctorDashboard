import dayjs from 'dayjs';
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

// Function to format seconds into mm:ss
export const formatSecondsToMinutes = (seconds:number) => {
  return dayjs.duration(seconds, "seconds").format("mm:ss");

};

