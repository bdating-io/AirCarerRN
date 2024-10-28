import HalfScreenModal from "@app/components/halfScreen.modal";
import AirCarerText from "@app/constants/AirCarerText";
import theme from "@app/constants/theme";
import { i18n } from "@app/locales/i18n";
import DayOfWeek, { getNumericDayOfWeek, mapStringToDayOfWeek } from "@app/types/DayOfWeek.enum";
import { TimeSlot, WeeklyRoutine } from "@app/types/timeSlot.type";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Card, Icon, TextInput } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";


export interface ManageTimeSlotModalProps {
    showTimePicker: boolean;
    setShowTimePicker: (show: boolean) => void;
    weeklyRoutine: WeeklyRoutine;
    setWeeklyRoutine: (routine: WeeklyRoutine) => void;
}

const emptySlot: TimeSlot = {
    id: '',
    start: '00:00',
    end: '24:00'
}

export const useManageTimeSlot = () => {
    const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
    const [weeklyRoutine, setWeeklyRoutine] = useState<WeeklyRoutine>({});

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
        onUpdate(day, id, { start: localStart, end: localEnd });
    }, [localStart, localEnd]);

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
            <TextInput label="Start" style={styles.dowPickerInput} outlineStyle={{
                borderRadius: theme.rouded.small, borderWidth: 2, borderColor: theme.colors.primary
            }} placeholder="00:00"
                mode="outlined" value={localStart} onChangeText={(v) => setStart(v)} />
            <TextInput label="End" style={styles.dowPickerInput} outlineStyle={{
                borderRadius: theme.rouded.small, borderWidth: 2, borderColor: theme.colors.primary
            }} placeholder="24:00"
                mode="outlined" value={localEnd} onChangeText={(v) => setEnd(v)} />
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