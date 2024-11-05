/**
 * Compare two dates in format 'hh:mm'
 * @param time1 
 * @param time2 
 * @returns 
 * 1: time1 > time2, 
 * -1: time1 < time2, 
 * 0: time1 = time2
 */
export const compareTimesString = (time1: string, time2: string) => {
    const [hours1, minutes1] = time1.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);

    const totalMinutes1 = hours1 * 60 + minutes1;
    const totalMinutes2 = hours2 * 60 + minutes2;

    if (totalMinutes1 > totalMinutes2) {
        return 1; 
    } else if (totalMinutes1 < totalMinutes2) {
        return -1;
    } else {
        return 0;
    }
};
