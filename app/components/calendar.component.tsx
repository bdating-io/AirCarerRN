import theme from '@app/constants/theme';
import DayOfWeek from '@app/types/DayOfWeek.enum';
import { TimeSlot, WeeklyRoutine } from '@app/types/timeSlot.type';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface CalenderProps {
    routine: WeeklyRoutine;
}

const hours: string[] = Array.from({ length: 24 }, (_, i) => `${i}:00`);

const Calendar = (props: CalenderProps) => {
    const { routine } = props;
    const days: DayOfWeek[] = [DayOfWeek.Monday, DayOfWeek.Tuesday, DayOfWeek.Wednesday, DayOfWeek.Thursday, DayOfWeek.Friday, DayOfWeek.Saturday, DayOfWeek.Sunday];

    const isTimeSlotFilled = (day: DayOfWeek, hour: number) => {
        const daySlots = routine[day];
        if (!daySlots) return false;

        return daySlots.some((slot: TimeSlot) => {
            const start = parseInt(slot.start.split(":")[0], 10);
            const end = parseInt(slot.end.split(":")[0], 10);
            return hour >= start && hour < end;
        });
    };

    return (
        <View style={styles.calendarContainer}>
            {days.map(day => (
                <View key={day} style={styles.dayColumn}>
                    <Text style={styles.dayLabel}>{day.substring(0, 3)}</Text>
                    {hours.map(hour => (
                        <View
                            key={`${day}-${hour}`}
                            style={[
                                styles.hourBlock,
                                { backgroundColor: isTimeSlotFilled(day, parseInt(hour)) ? theme.colors.primary : '#fff' }
                            ]}
                        >
                            <Text style={{...styles.hourText, color: isTimeSlotFilled(day, parseInt(hour)) ? '#fff': theme.colors.primary}}>{hour}</Text>
                        </View>
                    ))}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    calendarContainer: {
        flexDirection: 'row',
        padding: 0,
        width: '100%',
    },
    dayColumn: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 0,
    },
    dayLabel: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    hourBlock: {
        width: '100%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#ddd',
    },
    hourText: {
        fontSize: 10,
    }
});

export default Calendar;