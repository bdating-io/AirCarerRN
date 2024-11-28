import Calendar from "@app/components/calendar.component";
import ManageTimeSlotModal, { useManageTimeSlot } from "@app/components/manageTimeSlot.modal";
import AirCarerText from "@app/constants/AirCarerText";
import theme from "@app/constants/theme";
import { useAirCarerAuth } from "@app/contexts/auth.context";
import { useSnackbar } from "@app/contexts/snackbar.context";
import { useAxios } from "@app/hooks/useAxios";
import { i18n } from "@app/locales/i18n";
import { aircarerSlice } from "@app/slices/aircarer.slice";
import { RootState, useDispatch, useSelector } from "@app/store";
import { useState } from "react";
import { ScrollView, View, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Card } from "react-native-paper";


const SignupServicingHours = (props: any) => {
    const { navigation } = props;
    const { info } = useSnackbar();
    const { logged_user, updateProfile } = useAirCarerAuth();
    const { showTimePicker, setShowTimePicker, weeklyRoutine, setWeeklyRoutine } = useManageTimeSlot();
    const dispatch = useDispatch();
    const { put } = useAxios();

    const handleNext = () => {
        const result: any[] = [];

        for (const [dayOfWeek, times] of Object.entries(weeklyRoutine)) {
            times.forEach(time => {
                result.push({
                    dayOfWeek,
                    start: time.start,
                    end: time.end,
                });
            });
        }

        const registeredUser = {
            ...logged_user,
            availability: result,
        };

        updateProfile(registeredUser);

        console.log(registeredUser)

        put('/profile', registeredUser)
            .then(() => {
                info(i18n.t('signupTab.welcome'));
                navigation.navigate('/');
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.expectedPricingContainer}>
                <AirCarerText variant="h1" style={styles.expectedPricingText}>{i18n.t('signupTab.servicingHours')}</AirCarerText>
                <Card style={styles.expectedPricingExplain}>
                    <Card.Content>
                        <AirCarerText variant="default">{i18n.t('signupTab.expectedPricingExplain')}</AirCarerText>
                    </Card.Content>
                </Card>
                {/* <Button mode="contained" onPress={() => setShowTimePicker(true)}>
                    <AirCarerText variant="button">Editing Timeslots</AirCarerText>
                </Button> */}
                <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                    <Calendar routine={weeklyRoutine} />
                </TouchableOpacity>
                <Button mode='contained' style={styles.nextButton} onPress={handleNext}>
                    <AirCarerText variant='button'>{i18n.t('finish')}</AirCarerText>
                </Button>
            </View>
            <ManageTimeSlotModal
                setShowTimePicker={setShowTimePicker}
                showTimePicker={showTimePicker}
                weeklyRoutine={weeklyRoutine}
                setWeeklyRoutine={setWeeklyRoutine} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.paper,
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        gap: 15,
        paddingTop: 20,
        paddingBottom: 40,
    },
    expectedPricingContainer: {
        flex: 1,
        gap: 15,
        alignItems: 'flex-start',
    },
    pricingItemContainer: {
        width: '100%',
        gap: 10,
        alignItems: 'flex-start',
    },
    expectedPricingText: {
        color: theme.colors.primary,
    },
    expectedPricingExplain: {
        width: '100%',
    },
    input: {
        width: '100%',
        fontWeight: '900',

    },
    nextButton: {
        height: 50,
        width: '100%',
        marginTop: 10,
        justifyContent: 'center',
        backgroundColor: theme.colors.primary,
        borderRadius: theme.rouded.large,
    }
});

export default SignupServicingHours;