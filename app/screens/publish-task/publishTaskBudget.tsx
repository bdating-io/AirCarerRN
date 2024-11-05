import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import theme from '@app/constants/theme';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { i18n } from '@app/locales/i18n';
import { RootStackParamList } from '@app/types/common.type';

const PublishTaskBudgetScreen = () => {
    const [budget, setBudget] = useState('0');
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();    const route = useRoute();

    // Collect other task details from the previous screen's route parameters
    const { taskDetails } = route.params || {};

    const handlePress = (value) => {
        if (value === 'C') {
            setBudget('0');
        } else if (value === '⌫') {
            setBudget(budget.length > 1 ? budget.slice(0, -1) : '0');
        } else {
            setBudget(budget === '0' ? value : budget + value);
        }
    };

    const handleContinue = () => {
        // Add the budget to taskDetails and navigate to the post screen
        const updatedTaskDetails = {
            ...taskDetails,
            budget
        };

        navigation.navigate('publishTaskPost', { taskDetails: updatedTaskDetails });
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.header}>{i18n.t("publishTaskBudget.header")}</Text>
                <Text style={styles.subHeader}>{i18n.t("publishTaskBudget.subHeader")}</Text>
                <View style={styles.budgetContainer}>
                    <Text style={styles.budgetText}>${budget}</Text>
                </View>
                <View style={styles.keypadContainer}>
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map((key, index) => (
                        <TouchableOpacity
                            key={key}
                            style={styles.keyButton}
                            onPress={() => handlePress(key)}
                        >
                            <Text style={styles.keyText}>{key}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <Button
                mode="contained"
                style={styles.continueButton}
                onPress={handleContinue}
            >
                {i18n.t("common.continue")}
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingBottom: 80, // Space for the fixed continue button
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.primary,
        marginTop: 20,
    },
    subHeader: {
        fontSize: 16,
        color: theme.colors.primary,
        marginVertical: 10,
    },
    budgetContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    budgetText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: theme.colors.primary,
        backgroundColor: '#f2f2f2',
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
        backgroundColor: '#ADD8E6', // Light blue background color
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        borderRadius: 8,
    },
    keyText: {
        fontSize: 24,
        color: theme.colors.primary,
    },
    continueButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: theme.colors.primary,
    },
});

export default PublishTaskBudgetScreen;