import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import theme from '@app/constants/theme';
import AirCarerText from "@app/constants/AirCarerText";
import { i18n } from '@app/locales/i18n';

export default function PublishTaskDateScreen() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [timeDuration, setTimeDuration] = useState('');
    const navigation = useNavigation();
    const route = useRoute();

    const taskDetails = route.params?.taskDetails || {};

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        if (option === 'On date' || option === 'Before date') {
            setShowDatePicker(true);
        } else {
            setShowDatePicker(false);
            setSelectedDate(null);
        }
    };

    const handleDateChange = (event, date) => {
        if (date && date >= new Date()) {
            setSelectedDate(date);
            setShowDatePicker(false);
        } else {
            Alert.alert(i18n.t('common.invalidDate'), i18n.t('common.dateSelectionHint'));
        }
    };

    const handleContinue = () => {
        if (!selectedOption) {
            Alert.alert(i18n.t('common.selectDate'), i18n.t('publishTab.selectCleaningServiceDate'));
            return;
        }

        if ((selectedOption === 'On date' || selectedOption === 'Before date') && !selectedDate) {
            Alert.alert(i18n.t('common.selectDate'), i18n.t('publishTab.selectSpecificDate'));
            return;
        }

        const dateInfo = selectedOption === "I'm flexible"
            ? { type: 'flexible', value: i18n.t('publishTab.flexibleDate') }
            : {
                type: selectedOption === 'On date' ? 'on' : 'before',
                value: selectedDate ? selectedDate.toLocaleDateString() : null,
            };

        const updatedTaskDetails = {
            ...taskDetails,
            date: dateInfo,
            timeDuration,
        };

        navigation.navigate('PublishTaskPhotosScreen', { taskDetails: updatedTaskDetails });
    };

    const handleTimeDurationChange = (input) => {
        const sanitizedInput = input.replace(/[^0-9]/g, ''); // Allow only numeric values
        setTimeDuration(sanitizedInput); // Update the state with sanitized input
    };

    const formattedDate = selectedDate
        ? `${selectedDate.toLocaleDateString()}`
        : selectedOption === 'On date' ? i18n.t('publishTab.onDate') : i18n.t('publishTab.beforeDate');

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <AirCarerText variant="h1" style={styles.title}>{i18n.t('publishTab.chooseTime')}</AirCarerText>
                <AirCarerText style={styles.subtitle}>{i18n.t('publishTab.whenNeedDone')}</AirCarerText>

                <TouchableOpacity
                    style={[styles.option, selectedOption === 'On date' && styles.selectedOption]}
                    onPress={() => handleOptionSelect('On date')}
                >
                    <AirCarerText style={styles.optionText}>{selectedOption === 'On date' && selectedDate ? formattedDate : i18n.t('publishTab.onDate')}</AirCarerText>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.option, selectedOption === 'Before date' && styles.selectedOption]}
                    onPress={() => handleOptionSelect('Before date')}
                >
                    <AirCarerText style={styles.optionText}>{selectedOption === 'Before date' && selectedDate ? formattedDate : i18n.t('publishTab.beforeDate')}</AirCarerText>
                </TouchableOpacity>

                {showDatePicker && (selectedOption === 'On date' || selectedOption === 'Before date') && (
                    <DateTimePicker
                        value={new Date()}
                        mode="date"
                        display="calendar"
                        minimumDate={new Date()}
                        onChange={handleDateChange}
                    />
                )}

                <TouchableOpacity
                    style={[styles.option, selectedOption === "I'm flexible" && styles.selectedOption]}
                    onPress={() => handleOptionSelect("I'm flexible")}
                >
                    <AirCarerText style={styles.optionText}>{i18n.t('publishTab.flexibleOption')}</AirCarerText>
                </TouchableOpacity>

                {selectedOption && (
                    <View style={styles.inputContainer}>
                        <AirCarerText style={styles.label}>{i18n.t('publishTab.expectedTimeDuration')}</AirCarerText>
                        <TextInput
                            mode="outlined"
                            placeholder={i18n.t('publishTab.enterHours')}
                            keyboardType="numeric"
                            value={timeDuration}
                            onChangeText={handleTimeDurationChange}
                            style={styles.textInput}
                        />
                    </View>
                )}

                {/* Show the Continue button only if a valid option is selected */}
                {selectedOption && (selectedOption === "I'm flexible" || selectedDate) && (
                    <View style={styles.continueButtonContainer}>
                        <Button
                            mode="contained"
                            style={styles.continueButton}
                            contentStyle={styles.continueButtonContent}
                            onPress={handleContinue}
                        >
                            <AirCarerText variant="button" style={styles.continueButtonText}>
                                {i18n.t("common.continue")}
                            </AirCarerText>
                        </Button>
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: theme.colors.paper,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
    },
    option: {
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
        marginBottom: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.primary,
    },
    selectedOption: {
        backgroundColor: theme.colors.primary,
    },
    optionText: {
        fontSize: 16,
        color: theme.colors.text,
    },
    inputContainer: {
        marginTop: 20,
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        marginBottom: 8,
    },
    textInput: {
        fontSize: 16,
    },
    continueButtonContainer: {
        marginTop: 20,
        marginBottom: 30,
    },
    continueButton: {
        backgroundColor: theme.colors.primary,
        borderRadius: theme.rouded.large,
    },
    continueButtonContent: {
        justifyContent: 'center',
    },
    continueButtonText: {
        color: theme.colors.paper,
        fontWeight: 'bold',
    },
});