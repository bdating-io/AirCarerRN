import HalfScreenModal from "@app/components/halfScreen.modal";
import AirCarerText from "@app/constants/AirCarerText";
import theme from "@app/constants/theme";
import { i18n } from "@app/locales/i18n";
import { aircarerSlice } from "@app/slices/aircarer.slice";
import DayOfWeek, { getNumericDayOfWeek, mapStringToDayOfWeek } from "@app/types/DayOfWeek.enum";
import { TimeSlot, WeeklyRoutine } from "@app/types/timeSlot.type";
import { compareTimesString } from "@app/utils/date.utils";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Card, Icon, TextInput } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { useDispatch, useSelector } from "react-redux";


export interface ManageTimeSlotModalProps {
    showTimePicker: boolean;
    setShowTimePicker: (show: boolean) => void;
    weeklyRoutine: WeeklyRoutine;
    setWeeklyRoutine: (routine: WeeklyRoutine) => void;
}

const emptySlot: TimeSlot = {
    id: '',
    start: '',
    end: ''
}

export const useManageTimeSlot = () => {
    const dispatch = useDispatch();
    const { myRoutine } = useSelector((state: any) => state.aircarer);
    const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
    const [weeklyRoutine, setWeeklyRoutine] = useState<WeeklyRoutine>(myRoutine ?? {});

    useEffect(() => {
        dispatch(aircarerSlice.actions.setMyRoutine(weeklyRoutine));
        console.log(weeklyRoutine)
    }, [weeklyRoutine]);

    return {
        showTimePicker,
        setShowTimePicker,
        weeklyRoutine,
        setWeeklyRoutine
    }
}

const ManageTimeSlotModal = (props: ManageTimeSlotModalProps) => {
    const { showTimePicker, setShowTimePicker, weeklyRoutine, setWeeklyRoutine } = props;
    const [localRoutine, setLocalRoutine] = useState<WeeklyRoutine>(props.weeklyRoutine ?? {});

    const addEmptySlot = () => {
        const newSlot = { ...emptySlot, id: `${Date.now()}` };
        addRoutineSlot(DayOfWeek.Monday, [newSlot]);
    };

    const addRoutineSlot = useCallback((day: DayOfWeek, routine: TimeSlot[]) => {
        setLocalRoutine(prevRoutine => ({
            ...prevRoutine,
            [day]: prevRoutine[day] ? [...prevRoutine[day], ...routine] : routine
        }));
    }, []);

    const saveRoutineSlot = useCallback(() => {
        // get rid of day with empty slots
        const localRoutineCopy: WeeklyRoutine = { ...localRoutine };
        for (const day in localRoutineCopy) {
            if (localRoutineCopy[day]?.length === 0) {
                delete localRoutineCopy[day];
            }
        }

        setWeeklyRoutine(localRoutineCopy);
        setShowTimePicker(false);
    }, [localRoutine]);

    const updateRoutineSlot = useCallback((day: DayOfWeek, id: string, slot: TimeSlot) => {
        setLocalRoutine(prevRoutine => ({
            ...prevRoutine,
            [day]: prevRoutine[day]?.map(s => (s.id === id ? { ...s, ...slot } : s)) || []
        }));
    }, []);

    const changeDateForSlot = useCallback((day: DayOfWeek, newDay: DayOfWeek, id: string) => {
        const slot = localRoutine[day]?.find(slot => slot.id === id);
        if (!slot) return;
        deleteRoutineSlot(day, id);

        switch (newDay) {
            case DayOfWeek.Monday:
            case DayOfWeek.Tuesday:
            case DayOfWeek.Wednesday:
            case DayOfWeek.Thursday:
            case DayOfWeek.Friday:
            case DayOfWeek.Saturday:
            case DayOfWeek.Sunday:
                addRoutineSlot(newDay, [slot]);
                break;
            case DayOfWeek.All:
                [DayOfWeek.Monday, DayOfWeek.Tuesday, DayOfWeek.Wednesday, DayOfWeek.Thursday, DayOfWeek.Friday, DayOfWeek.Saturday, DayOfWeek.Sunday].forEach(dow => {
                    addRoutineSlot(dow, [slot]);
                });
                break;
            case DayOfWeek.WeekDays:
                [DayOfWeek.Monday, DayOfWeek.Tuesday, DayOfWeek.Wednesday, DayOfWeek.Thursday, DayOfWeek.Friday].forEach(dow => {
                    addRoutineSlot(dow, [slot]);
                });
                break;
            case DayOfWeek.WeekEnds:
                [DayOfWeek.Saturday, DayOfWeek.Sunday].forEach(dow => {
                    addRoutineSlot(dow, [slot]);
                });
                break;
            default:
                break;
        }
    }, [localRoutine]);

    const deleteRoutineSlot = useCallback((day: DayOfWeek, id: string) => {
        setLocalRoutine(prevRoutine => ({
            ...prevRoutine,
            [day]: prevRoutine[day]?.filter(slot => slot.id !== id) || []
        }));
    }, []);

    const renderRoutineSlots = useCallback(() => {
        if (Object.keys(localRoutine).length === 0) {
            return (
                <Card>
                    <Card.Content>
                        <AirCarerText variant="default">{i18n.t('signupTab.noRoutineWarning')}</AirCarerText>
                    </Card.Content>
                </Card>
            );
        } else {
            const sortedRoutine = Object.keys(localRoutine).sort((a, b) => {
                return getNumericDayOfWeek(a) - getNumericDayOfWeek(b);
            });
            return sortedRoutine.map((day: string) => {
                const dow: DayOfWeek | undefined = mapStringToDayOfWeek(day);
                if (!dow || !localRoutine[dow] || localRoutine[dow].length === 0) return null;
                return (
                    <View key={day}>
                        <AirCarerText variant="h2">{dow}</AirCarerText>
                        {(localRoutine[dow] as TimeSlot[])?.map((slot, index) => (
                            <RoutineItem key={slot.id}
                                id={slot.id} day={day} start={slot.start} end={slot.end}
                                onUpdate={updateRoutineSlot}
                                onDelete={deleteRoutineSlot}
                                onChangeDate={changeDateForSlot} />
                        ))}
                    </View>
                );
            });
        }
    }, [localRoutine]);

    return (
        <HalfScreenModal
            title="Add a timeslot"
            visibility={showTimePicker}
            setVisibility={setShowTimePicker}
            persist={false}
            onClose={() => setShowTimePicker(false)}
            heightPerc="80%">
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <AirCarerText variant="h1">{i18n.t('signupTab.manageRoutine')}</AirCarerText>
                    <TouchableOpacity onPress={() => setShowTimePicker(false)}>
                        <Icon source="close" size={26} />
                    </TouchableOpacity>
                </View>

                <View style={styles.routineContainer}>
                    {renderRoutineSlots()}
                </View>
                <Button style={styles.addButton} mode="outlined" onPress={addEmptySlot} icon="plus-thick" >
                    <AirCarerText variant="button" style={{ color: theme.colors.primary }}>{i18n.t('add')}</AirCarerText>
                </Button>
                <Button style={styles.addButton} mode="contained" onPress={saveRoutineSlot} icon="check-bold" >
                    <AirCarerText variant="button">{i18n.t('save')}</AirCarerText>
                </Button>
            </ScrollView>
        </HalfScreenModal>
    )
}

const RoutineItem = (props: any) => {
    const { id, day, start, end, onUpdate, onDelete, onChangeDate } = props;
    const [localDay, setDay] = useState(day);
    const [localStart, setStart] = useState(start);
    const [localEnd, setEnd] = useState(end);

    useEffect(() => {
        if (localStart?.length === 5 && localEnd.length === 5 
            && compareTimesString(localStart, localEnd) > 0) {
            const end = localEnd;
            setEnd(localStart);
            setStart(end);
        }
    }, [localStart, localEnd]);

    const handleChangeText = (text: string, type: string) => {
        const numericText = text.replace(/[^0-9]/g, '');

        const setInputValue = type === 'start' ? setStart : setEnd;

        let formattedText = undefined;

        if (numericText.length === 4) {
            let hours = numericText.slice(0, 2);
            let minutes = numericText.slice(2, 4);

            if (parseInt(hours) === 24 && parseInt(minutes) > 0) {
                minutes = '00';
            }
            if (parseInt(hours) >= 24) {
                hours = '24';
            }
            if (parseInt(minutes) > 59) {
                minutes = '59';
            }
            formattedText = `${hours}:${minutes}`;
            setInputValue(`${hours}:${minutes}`);
        } else if (numericText.length >= 3) {
            let hours = numericText.slice(0, 2);
            let minutes = numericText.slice(2, 4);
            if (parseInt(hours) >= 24) {
                hours = '24';
            }
            if (parseInt(minutes) > 59) {
                minutes = '59';
            }
            formattedText = `${hours}:${minutes}`;
            setInputValue(`${hours}:${minutes}`);
        } else {
            setInputValue(numericText);
        }

        if (!formattedText) return;

        const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (timePattern.test(formattedText)) {
            if (type === 'start') {
                onUpdate(day, id, { start: formattedText, end: localEnd });
            }
            if (type === 'end') {
                onUpdate(day, id, { start: localStart, end: formattedText });
            }
        }
    };

    return (
        <View style={styles.routineItem}>
            <View style={styles.dowPickerInput}>
                <RNPickerSelect onDonePress={() => onChangeDate(day, localDay, id)} onValueChange={(v) => setDay(v)}
                    items={Object.values(DayOfWeek).map(dow => {
                        return {
                            label: dow,
                            value: dow,
                        }
                    })} >
                    <TextInput label="Day" outlineStyle={{
                        borderRadius: theme.rouded.small, borderWidth: 2, borderColor: theme.colors.primary, padding: 0
                    }}
                        style={{ padding: 0 }}
                        right={<TextInput.Icon size={15} style={{ right: 0 }} icon="arrow-down-drop-circle" color={theme.colors.primary} />}
                        mode="outlined" value={localDay.substring(0, 3)} />
                </RNPickerSelect>
            </View>
            <TextInput
                label="Start"
                style={styles.dowPickerInput}
                outlineStyle={{
                    borderRadius: theme.rouded.small,
                    borderWidth: 2,
                    borderColor: theme.colors.primary
                }}
                placeholder="00:00"
                mode="outlined"
                value={localStart}
                keyboardType="numeric"
                maxLength={5}
                onChangeText={(v) => handleChangeText(v, 'start')}
            />
            <TextInput
                label="End"
                style={styles.dowPickerInput}
                outlineStyle={{
                    borderRadius: theme.rouded.small,
                    borderWidth: 2,
                    borderColor: theme.colors.primary
                }}
                placeholder="24:00"
                mode="outlined"
                value={localEnd}
                keyboardType="numeric"
                maxLength={5}
                onChangeText={v => handleChangeText(v, 'end')}
            />
            <TouchableOpacity onPressOut={() => onDelete(day, id)}>
                <Icon color={theme.colors.primary} source="delete-outline" size={30} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'flex-start',
        paddingVertical: 10,
        gap: 10,
    },
    header: {
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: theme.colors.primary,
    },
    routineContainer: {
        minHeight: 20,
        justifyContent: 'flex-start',
        gap: 10,
        paddingHorizontal: 2,
        paddingVertical: 10,
    },
    routineItem: {
        // flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 10,
        gap: 10,
    },
    dowPickerInput: {
        // width: '100%',
        flex: 1,
    },
    addButton: {
        width: '100%',
        justifyContent: 'center',
        borderRadius: theme.rouded.large,
        borderWidth: 2,
        borderColor: theme.colors.primary,
    }

});

export default ManageTimeSlotModal;