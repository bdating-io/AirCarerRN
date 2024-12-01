import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, Menu, SegmentedButtons, TextInput } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import theme from '@app/constants/theme';
import AirCarerText from "@app/constants/AirCarerText";
import { i18n } from '@app/locales/i18n';
import { useProperties } from '@app/contexts/PropertiesContext';
import { useDispatch } from 'react-redux';
import { updateDraftTask } from '../../slices/task.slice';

export default function PublishTaskPropertyDetailsScreen() {
    const navigation = useNavigation();
    //const route = useRoute();
    const { properties } = useProperties();
    const dispatch = useDispatch();

    const [selectedProperty, setSelectedProperty] = useState(null);
    const [menuVisible, setMenuVisible] = useState(false);
    const [cleanType, setCleanType] = useState('');
    const [equipment, setEquipment] = useState('');
    const [cleaningDetails, setCleaningDetails] = useState('');

    //const taskDetails = route.params?.taskDetails || {};
    const isContinueEnabled = selectedProperty && cleanType && equipment && cleaningDetails.length >= 25;

    const handleContinue = () => {
        if (cleaningDetails.length < 25) {
            Alert.alert(i18n.t("common.insufficientDetails"), i18n.t("publishTab.insufficientDetailsMessage"));
            return;
        }

        // navigation.navigate('publishTaskDate', {
        //     taskDetails: {
        //         ...taskDetails,
        //         cleanType,
        //         equipment,
        //         cleaningDetails,
        //         property: selectedProperty,
        //     }
        // });
        dispatch(updateDraftTask({
            type: cleanType === 'Regular' ? 'regular' : 'EndOfLease',
            equipmentProvided: equipment === 'No',
            details: cleaningDetails,
            propertyId: selectedProperty?.id,
            property: selectedProperty,
        }));

        navigation.navigate('publishTaskDate')
    };

    const handleDropdownPress = () => {
        if (properties.length === 0) {
            Alert.alert(i18n.t("publishTab.noPropertiesTitle"), i18n.t("publishTab.noPropertiesMessage"));
        } else {
            setMenuVisible(true);
        }
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

                {/* Property Selection Custom Dropdown */}
                <View style={styles.questionTitle}>
                    <AirCarerText variant="bold">{i18n.t("publishTab.selectPropertyPlaceholder")}</AirCarerText>
                </View>
                <Menu
                    visible={menuVisible}
                    onDismiss={() => setMenuVisible(false)}
                    anchor={
                        <Button
                            mode="outlined"
                            onPress={handleDropdownPress}
                            style={styles.dropdownButton}
                        >
                            {selectedProperty
                                ? `${selectedProperty.address}, ${selectedProperty.suburb}, ${selectedProperty.state}`
                                : i18n.t("publishTab.selectPropertyPlaceholder")}
                        </Button>
                    }
                >
                    {properties.map((property, index) => (
                        <Menu.Item
                            key={index}
                            title={`${property.address}, ${property.suburb}, ${property.state} - ${property.bedrooms} bedrooms, ${property.bathrooms} bathrooms`}
                            onPress={() => {
                                setSelectedProperty(property);
                                setMenuVisible(false);
                            }}
                        />
                    ))}
                </Menu>

                {/* Clean Type Section */}
                <View style={styles.questionTitle}>
                    <AirCarerText variant="bold">{i18n.t("publishTab.cleanTypeQuestion")}</AirCarerText>
                </View>
                <SegmentedButtons
                    value={cleanType}
                    onValueChange={setCleanType}
                    buttons={[
                        { value: 'Regular', label: i18n.t("publishTab.regularCleaning"), style: getButtonStyle('Regular', cleanType), labelStyle: getLabelStyle('Regular', cleanType) },
                        { value: 'End of lease', label: i18n.t("publishTab.endOfLeaseCleaning"), style: getButtonStyle('End of lease', cleanType), labelStyle: getLabelStyle('End of lease', cleanType) },
                    ]}
                    style={styles.segmentedButtons}
                />

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
    dropdownButton: {
        marginBottom: 20,
        width: '100%',
        justifyContent: 'center',
        borderColor: theme.colors.primary,
        borderWidth: 1,
    },
    segmentedButtons: {
        marginBottom: 20,
    },
    optionButton: {
        borderRadius: 20,
        marginHorizontal: 2,
        borderColor: theme.colors.primary,
        borderWidth: 1,
    },
    optionButtonLabel: {
        fontSize: 16,
        fontWeight: 'bold',
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
        borderWidth: 1,
        borderColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    equipmentButtonSelected: {
        backgroundColor: theme.colors.primary,
    },
    equipmentButtonText: {
        fontSize: 14,
        color: theme.colors.primary,
        fontWeight: 'bold',
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
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
    },
    disabledButton: {
        backgroundColor: theme.colors.disabled,
    },
});