import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import theme from '@app/constants/theme';
import AirCarerText from "@app/constants/AirCarerText";
import { i18n } from '@app/locales/i18n';

export default function PublishTaskDateScreen() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [timeDuration, setTimeDuration] = useState('');
    const navigation = useNavigation();

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

        const taskDetails = {
            date: dateInfo,
            timeDuration,
        };

        navigation.navigate('publishTaskPropertyDetails', { taskDetails });
    };

    const handleTimeDurationChange = (input) => {
        const sanitizedInput = input.replace(/[^0-9]/g, '');
        setTimeDuration(sanitizedInput);
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
                            style={styles.input}
                            placeholder={i18n.t('publishTab.enterHours')}
                            keyboardType="numeric"
                            value={timeDuration}
                            onChangeText={handleTimeDurationChange}
                        />
                    </View>
                )}

                <Button mode="contained" style={styles.continueButton} onPress={handleContinue}>
                    <AirCarerText variant="button" style={styles.continueButtonText}>{i18n.t('common.continue')}</AirCarerText>
                </Button>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
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
    },
    selectedOption: {
        backgroundColor: '#e0e0e0',
    },
    optionText: {
        fontSize: 16,
    },
    inputContainer: {
        marginTop: 20,
    },
    label: {
        fontSize: 14,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
    },
    continueButton: {
        marginTop: 20,
        borderRadius: 8,
        backgroundColor: theme.colors.primary,
    },
    continueButtonText: {
        color: 'white',
    },
});