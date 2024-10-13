import {Time} from "./time";
import {DayOfWeek} from "./day-of-week";

export class TimeSlot {
  dayOfWeek: DayOfWeek;
  startTime: Time;
  endTime: Time;

  constructor(dayOfWeek: DayOfWeek, startTime: Time, endTime: Time) {
    this.dayOfWeek = dayOfWeek;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
