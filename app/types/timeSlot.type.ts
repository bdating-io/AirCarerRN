import DayOfWeek from "./DayOfWeek.enum";

export type TimeSlot = {
    id: string;
    start: string;
    end: string;
};

export type WeeklyRoutine = {
    [value: string]: TimeSlot[];
};

