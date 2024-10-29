enum DayOfWeek {
    Monday = 'Monday',
    Tuesday = 'Tuesday',
    Wednesday = 'Wednesday',
    Thursday = 'Thursday',
    Friday = 'Friday',
    Saturday = 'Saturday',
    Sunday = 'Sunday',
    All = 'All',
    WeekDays = 'WeekDays',
    WeekEnds = 'WeekEnds',
}

export const mapStringToDayOfWeek = (status: string): DayOfWeek | undefined => {
    switch (status?.toUpperCase()) {
        case "MONDAY":
            return DayOfWeek.Monday;
        case "TUESDAY":
            return DayOfWeek.Tuesday;
        case "WEDNESDAY":
            return DayOfWeek.Wednesday;
        case "THURSDAY":
            return DayOfWeek.Thursday;
        case "FRIDAY":
            return DayOfWeek.Friday;
        case "SATURDAY":
            return DayOfWeek.Saturday;
        case "SUNDAY":
            return DayOfWeek.Sunday;
        case "ALL":
            return DayOfWeek.All;
        case "WEEKDAYS":
            return DayOfWeek.WeekDays;
        case "WEEKENDS":
            return DayOfWeek.WeekEnds;
        default:
            return undefined;
    }
}

export const getNumericDayOfWeek = (day: DayOfWeek | string): number => {
    switch (day) {
        case DayOfWeek.Monday:
            return 1;
        case DayOfWeek.Tuesday:
            return 2;
        case DayOfWeek.Wednesday:
            return 3;
        case DayOfWeek.Thursday:
            return 4;
        case DayOfWeek.Friday:
            return 5;
        case DayOfWeek.Saturday:
            return 6;
        case DayOfWeek.Sunday:
            return 7;
        default:
            return 8;
    }
}

export default DayOfWeek;