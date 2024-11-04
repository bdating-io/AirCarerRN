import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, SegmentedButtons, TextInput } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import theme from '@app/constants/theme';
import AirCarerText from "@app/constants/AirCarerText";
import { i18n } from '@app/locales/i18n';

export default function PublishTaskPropertyDetailsScreen() {
    const navigation = useNavigation();
    const route = useRoute();

    // State variables
    const [cleanType, setCleanType] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [equipment, setEquipment] = useState('');
    const [cleaningDetails, setCleaningDetails] = useState('');

    // Retrieve task details from previous screen
    const taskDetails = route.params?.taskDetails || {};

    const isContinueEnabled = cleanType && bedrooms !== '' && bathrooms !== '' && equipment && cleaningDetails.length >= 25;

    const handleContinue = () => {
        if (cleaningDetails.length < 25) {
            Alert.alert(i18n.t("common.insufficientDetails"), i18n.t("publishTab.insufficientDetailsMessage"));
            return;
        }

        // Pass all task details to the next screen, including previous and current screen data
        navigation.navigate('PublishTaskPhotosScreen', {
            taskDetails: {
                ...taskDetails,
                cleanType,
                bedrooms,
                bathrooms,
                equipment,
                cleaningDetails
            }
        });
    };

    const getButtonStyle = (value, selectedValue) => ({
        ...styles.optionButton,
        backgroundColor: value === selectedValue ? theme.colors.primary : '#f5f5f5',
    });

    const getLabelStyle = (value, selectedValue) => ({
        ...styles.optionButtonLabel,
        color: value === selectedValue ? theme.colors.paper : theme.colors.primary,
    });

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <AirCarerText variant="h1">{i18n.t("publishTab.whatsPlaceLike")}</AirCarerText>
                <View style={styles.subTitle}>
                    <AirCarerText variant="default">{i18n.t("publishTab.provideDetails")}</AirCarerText>
                </View>

                {/* Clean Type Section */}
                <View style={styles.questionTitle}>
                    <AirCarerText variant="bold">{i18n.t("publishTab.cleanTypeQuestion")}</AirCarerText>
                </View>
                <View>
                    <SegmentedButtons
                        value={cleanType}
                        onValueChange={setCleanType}
                        buttons={[
                            { value: 'Regular', label: i18n.t("publishTab.regularCleaning"), style: getButtonStyle('Regular', cleanType), labelStyle: getLabelStyle('Regular', cleanType) },
                            { value: 'End of lease', label: i18n.t("publishTab.endOfLeaseCleaning"), style: getButtonStyle('End of lease', cleanType), labelStyle: getLabelStyle('End of lease', cleanType) },
                        ]}
                        style={styles.segmentedButtons}
                    />
                </View>

                {/* Bedrooms Section */}
                <View style={styles.questionTitle}>
                    <AirCarerText variant="bold">{i18n.t("publishTab.bedroomsQuestion")}</AirCarerText>
                </View>
                <View>
                    <SegmentedButtons
                        value={bedrooms}
                        onValueChange={setBedrooms}
                        buttons={[
                            { value: '0', label: '0', style: getButtonStyle('0', bedrooms), labelStyle: getLabelStyle('0', bedrooms) },
                            { value: '1', label: '1', style: getButtonStyle('1', bedrooms), labelStyle: getLabelStyle('1', bedrooms) },
                            { value: '2', label: '2', style: getButtonStyle('2', bedrooms), labelStyle: getLabelStyle('2', bedrooms) },
                            { value: '3', label: '3', style: getButtonStyle('3', bedrooms), labelStyle: getLabelStyle('3', bedrooms) },
                            { value: '4+', label: '4+', style: getButtonStyle('4+', bedrooms), labelStyle: getLabelStyle('4+', bedrooms) },
                        ]}
                        style={styles.segmentedButtons}
                    />
                </View>

                {/* Bathrooms Section */}
                <View style={styles.questionTitle}>
                    <AirCarerText variant="bold">{i18n.t("publishTab.bathroomsQuestion")}</AirCarerText>
                </View>
                <View>
                    <SegmentedButtons
                        value={bathrooms}
                        onValueChange={setBathrooms}
                        buttons={[
                            { value: '0', label: '0', style: getButtonStyle('0', bathrooms), labelStyle: getLabelStyle('0', bathrooms) },
                            { value: '1', label: '1', style: getButtonStyle('1', bathrooms), labelStyle: getLabelStyle('1', bathrooms) },
                            { value: '2', label: '2', style: getButtonStyle('2', bathrooms), labelStyle: getLabelStyle('2', bathrooms) },
                            { value: '3', label: '3', style: getButtonStyle('3', bathrooms), labelStyle: getLabelStyle('3', bathrooms) },
                            { value: '4+', label: '4+', style: getButtonStyle('4+', bathrooms), labelStyle: getLabelStyle('4+', bathrooms) },
                        ]}
                        style={styles.segmentedButtons}
                    />
                </View>

                {/* Equipment Section */}
                <View style={styles.questionTitle}>
                    <AirCarerText variant="bold">{i18n.t("publishTab.equipmentQuestion")}</AirCarerText>
                </View>
                <View style={styles.equipmentButtonsContainer}>
                    <Button
                        mode="contained"
                        style={[styles.equipmentButton, equipment === 'Yes' && styles.equipmentButtonSelected]}
                        labelStyle={[styles.equipmentButtonText, equipment === 'Yes' && styles.equipmentButtonTextSelected]}
                        onPress={() => setEquipment('Yes')}
                    >
                        {i18n.t("publishTab.taskerBringsEquipment")}
                    </Button>
                    <Button
                        mode="contained"
                        style={[styles.equipmentButton, equipment === 'No' && styles.equipmentButtonSelected]}
                        labelStyle={[styles.equipmentButtonText, equipment === 'No' && styles.equipmentButtonTextSelected]}
                        onPress={() => setEquipment('No')}
                    >
                        {i18n.t("publishTab.userProvidesEquipment")}
                    </Button>
                </View>

                {/* Cleaning Details Section */}
                <View style={styles.questionTitle}>
                    <AirCarerText variant="bold">{i18n.t("publishTab.cleaningDetailsQuestion")}</AirCarerText>
                </View>
                <TextInput
                    placeholder={i18n.t("publishTab.cleaningDetailsPlaceholder")}
                    mode="outlined"
                    multiline
                    numberOfLines={4}
                    maxLength={2000}
                    value={cleaningDetails}
                    onChangeText={setCleaningDetails}
                    style={styles.textInput}
                />
                <AirCarerText style={styles.characterCount}>{i18n.t("publishTab.minimumCharacters")}</AirCarerText>
            </ScrollView>

            {/* Continue Button */}
            <Button
                mode="contained"
                style={[styles.continueButton, (!isContinueEnabled) && styles.disabledButton]}
                onPress={handleContinue}
                disabled={!isContinueEnabled}
            >
                {i18n.t("common.continue")}
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.paper,
    },
    contentContainer: {
        padding: 20,
    },
    subTitle: {
        marginTop: 3,
        marginBottom: 13,
    },
    questionTitle: {
        marginBottom: 10,
    },
    segmentedButtons: {
        marginBottom: 20,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    optionButton: {
        borderRadius: 20,
        marginHorizontal: 2,
        borderColor: theme.colors.paper,
    },
    optionButtonLabel: {
        marginVertical: 15,
        fontSize: 18,
    },
    equipmentButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    equipmentButton: {
        flex: 1,
        marginHorizontal: 5,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
    },
    equipmentButtonSelected: {
        backgroundColor: theme.colors.primary,
    },
    equipmentButtonText: {
        fontSize: 14,
        color: theme.colors.primary,
    },
    equipmentButtonTextSelected: {
        color: theme.colors.paper,
    },
    textInput: {
        backgroundColor: theme.colors.paper,
        marginVertical: 10,
    },
    characterCount: {
        alignSelf: 'flex-end',
        color: theme.colors.disabled,
    },
    continueButton: {
        margin: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    disabledButton: {
        backgroundColor: theme.colors.disabled,
    },
});

export default PublishTaskPropertyDetailsScreen;