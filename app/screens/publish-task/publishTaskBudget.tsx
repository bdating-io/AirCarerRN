import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import theme from '@app/constants/theme';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import AirCarerText from "@app/constants/AirCarerText";
import { i18n } from '@app/locales/i18n';
import { RootStackParamList } from '@app/types/common.type';
import { useDispatch } from 'react-redux';
import { updateDraftTask } from '../../slices/task.slice';

const PublishTaskBudgetScreen = () => {
    const [budget, setBudget] = useState('0');
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    //const route = useRoute();

    //const { taskDetails } = route.params || {};
    const dispatch = useDispatch();

    const handlePress = (value: string) => {
        if (value === 'C') {
            setBudget('0');
        } else if (value === '⌫') {
            setBudget(budget.length > 1 ? budget.slice(0, -1) : '0');
        } else {
            setBudget(budget === '0' ? value : budget + value);
        }
    };

    const handleContinue = () => {
        dispatch(updateDraftTask({
            budget: Number(budget)
        }));
    
        navigation.navigate('publishTaskPost');
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <AirCarerText variant="h1" style={styles.header}>
                    {i18n.t("publishTaskBudget.header")}
                </AirCarerText>
                <AirCarerText style={styles.subHeader}>
                    {i18n.t("publishTaskBudget.subHeader")}
                </AirCarerText>

                {/* Budget Display */}
                <View style={styles.budgetContainer}>
                    <AirCarerText variant="h1" style={styles.budgetText}>
                        ${budget}
                    </AirCarerText>
                </View>

                {/* Keypad */}
                <View style={styles.keypadContainer}>
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map((key) => (
                        <TouchableOpacity
                            key={key}
                            style={styles.keyButton}
                            onPress={() => handlePress(key)}
                        >
                            <AirCarerText variant="h2" style={styles.keyText}>
                                {key}
                            </AirCarerText>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {/* Continue Button */}
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.paper,
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingBottom: 80, // Space for the fixed continue button
    },
    header: {
        marginTop: 20,
        marginBottom: 10,
    },
    subHeader: {
        marginBottom: 20,
        color: theme.colors.text,
    },
    budgetContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    budgetText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: theme.colors.primary,
        backgroundColor: theme.colors.background,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    keypadContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    keyButton: {
        width: Dimensions.get('window').width / 3 - 30,
        height: 60,
        backgroundColor: theme.colors.scrim,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        borderRadius: 8,
    },
    keyText: {
        fontSize: 24,
        color: theme.colors.text,
    },
    continueButtonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
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

export default PublishTaskBudgetScreen;