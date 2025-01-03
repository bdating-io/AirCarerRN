import React, { useCallback } from 'react';
import { Alert, ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import theme from '@app/constants/theme';
import AirCarerText from "@app/constants/AirCarerText";
import { i18n } from '@app/locales/i18n';
import { useAirCarerAuth } from '@app/contexts/auth.context';

export default function PublishTaskScreen(props: any) {
    const { navigation } = props;
    const { logged_user } = useAirCarerAuth();

    // Navigate to the task details screen
    const handleNavigateToNewTask = () => {
        navigation.navigate('publishTaskPropertyDetails'); // Start with task details screen
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.searchContainer}>
                <AirCarerText variant='bold' style={styles.goodDayText}>
                    {`${i18n.t('publishTab.goodday')}, ${logged_user?.nickname || 'Guest'}!`}
                </AirCarerText>
                <AirCarerText variant='h1' style={styles.slogen}>
                    {i18n.t('publishTab.publishTaskSlogen')}
                </AirCarerText>

                <TextInput
                    mode='outlined'
                    style={styles.input}
                    placeholder={i18n.t('publishTab.taskTitle')}
                    outlineStyle={{ borderRadius: theme.rouded.large, borderWidth: 2.5 }}
                />

                <Button mode='contained' buttonColor={theme.colors.secondary}
                    textColor='white'
                    style={styles.newTaskButton} contentStyle={styles.newTaskButtonContent}
                    onPress={handleNavigateToNewTask}>
                    <AirCarerText variant='button'>{i18n.t('publishTab.getItDone')}</AirCarerText>
                </Button>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: theme.colors.scrim,
    },
    searchContainer: {
        flex: 1,
        alignItems: 'flex-start',
        borderRadius: 10,
        paddingTop: '30%',
    },
    goodDayText: {
        color: theme.colors.contrastText,
    },
    input: {
        width: '100%',
        marginVertical: 20,
    },
    slogen: {
        paddingTop: 20,
        color: theme.colors.contrastText,
        fontWeight: '900',
    },
    newTaskButton: {
        justifyContent: 'center',
        width: '100%',
        marginTop: 20,
        borderRadius: theme.rouded.large,
    },
    newTaskButtonContent: {
        height: 53,
    },
    addButton: {
        backgroundColor: theme.colors.scrim, // Match with the background blue color
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15, // Add space to the right side
    },
    addButtonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
});