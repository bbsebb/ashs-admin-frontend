import {DayOfWeek} from "./day-of-week";
import {Time} from "./time";

export interface TimeSlot {
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;

}
