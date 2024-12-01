import React, { useState } from 'react';
import { View, StyleSheet, Image, Modal, TouchableOpacity, Dimensions, FlatList, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import theme from '@app/constants/theme';
import AirCarerText from '@app/constants/AirCarerText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { i18n } from '@app/locales/i18n';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

export default function PublishTaskPostScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    // const { taskDetails } = route.params;

    // const {
    //     date,
    //     cleanType,
    //     property,
    //     equipment,
    //     cleaningDetails,
    //     budget,
    //     photos = []
    // } = taskDetails || {};
    const draftTask = useSelector((state) => state.task.draftTask);
    //test only
    console.log(JSON.stringify(draftTask))

const { 
    startTime: date,
    type: cleanType,
    property,
    equipmentProvided: equipment,
    details: cleaningDetails,
    budget,
    descImages: photos = []
} = draftTask || {};

    const [isFullScreenVisible, setIsFullScreenVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const formattedDate =
        date?.type === 'flexible'
            ? i18n.t("publishTaskPost.flexibleDate")
            : date?.value
            ? `${date.type === 'on' ? i18n.t("publishTaskPost.onDate") : i18n.t("publishTaskPost.beforeDate")} ${date.value}`
            : i18n.t("publishTaskPost.dateNotSpecified");

    const formattedBedrooms = property?.bedrooms
        ? `${property.bedrooms} ${property.bedrooms === '1' ? i18n.t("publishTaskPost.bedroom") : i18n.t("publishTaskPost.bedrooms")}`
        : i18n.t("publishTaskPost.bedroomsNotSpecified");

    const formattedBathrooms = property?.bathrooms
        ? `${property.bathrooms} ${property.bathrooms === '1' ? i18n.t("publishTaskPost.bathroom") : i18n.t("publishTaskPost.bathrooms")}`
        : i18n.t("publishTaskPost.bathroomsNotSpecified");

    const locationText = property
        ? `${property.address}, ${property.suburb}, ${property.state} ${property.postcode}`
        : i18n.t("publishTaskPost.locationNotSpecified");

    const equipmentText =
        equipment === 'Yes'
            ? i18n.t("publishTaskPost.taskerBrings")
            : i18n.t("publishTaskPost.clientProvides");

    const budgetText = budget ? `$${budget}` : i18n.t("publishTaskPost.budgetNotSpecified");

    const openFullScreenImage = (imageUri: string) => {
        setSelectedImage(imageUri);
        setIsFullScreenVisible(true);
    };

    const closeFullScreenImage = () => {
        setIsFullScreenVisible(false);
        setSelectedImage(null);
    };

    const renderPhoto = ({ item }) => (
        <TouchableOpacity onPress={() => openFullScreenImage(item)}>
            <Image source={{ uri: item }} style={styles.photo} />
        </TouchableOpacity>
    );

    const handlePostTask = () => {
        Alert.alert(i18n.t("publishTaskPost.taskPosted"), "", [
            { text: i18n.t("common.ok"), onPress: () => navigation.navigate('PublishTaskScreen') }
        ]);
    };

    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={
                    <View style={styles.contentContainer}>
                        <AirCarerText variant="h1" style={styles.header}>
                            {i18n.t("publishTaskPost.readyToPost")}
                        </AirCarerText>
                        <AirCarerText style={styles.subHeader}>
                            {i18n.t("publishTaskPost.postWhenReady")}
                        </AirCarerText>

                        {/* Clean Type */}
                        <View style={styles.detailContainer}>
                            <MaterialCommunityIcons name="clipboard-text" size={24} color={theme.colors.primary} />
                            <AirCarerText style={styles.detailText}>
                                {cleanType === 'Regular' ? i18n.t("publishTaskPost.regularCleaning") : i18n.t("publishTaskPost.endOfLeaseCleaning")}
                            </AirCarerText>
                        </View>

                        {/* Date */}
                        <View style={styles.detailContainer}>
                            <MaterialCommunityIcons name="calendar" size={24} color={theme.colors.primary} />
                            <AirCarerText style={styles.detailText}>{formattedDate}</AirCarerText>
                        </View>

                        {/* Property Details */}
                        <View style={styles.detailContainer}>
                            <MaterialCommunityIcons name="home-outline" size={24} color={theme.colors.primary} />
                            <View>
                                <AirCarerText style={styles.detailText}>
                                    {`${formattedBedrooms}, ${formattedBathrooms}`}
                                </AirCarerText>
                                <AirCarerText style={styles.detailText}>{locationText}</AirCarerText>
                                <AirCarerText style={styles.detailText}>{equipmentText}</AirCarerText>
                                <AirCarerText style={styles.detailText}>
                                    {cleaningDetails || i18n.t("publishTaskPost.noAdditionalDetails")}
                                </AirCarerText>
                            </View>
                        </View>

                        {/* Budget */}
                        <View style={styles.detailContainer}>
                            <MaterialCommunityIcons name="currency-usd" size={24} color={theme.colors.primary} />
                            <AirCarerText style={styles.detailText}>{budgetText}</AirCarerText>
                        </View>

                        {/* Uploaded Photos Header */}
                        {photos.length > 0 && (
                            <AirCarerText variant="bold" style={styles.photoSectionHeader}>
                                {i18n.t("publishTaskPost.uploadedPhotos")}
                            </AirCarerText>
                        )}
                    </View>
                }
                data={photos}
                renderItem={renderPhoto}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
                contentContainerStyle={styles.photoGrid}
            />

            {/* Full-Screen Image Modal */}
            <Modal visible={isFullScreenVisible} transparent={true} onRequestClose={closeFullScreenImage}>
                <TouchableOpacity style={styles.fullScreenContainer} onPress={closeFullScreenImage}>
                    {selectedImage && (
                        <Image source={{ uri: selectedImage }} style={styles.fullScreenImage} resizeMode="contain" />
                    )}
                </TouchableOpacity>
            </Modal>

            {/* Fixed Post Task Button */}
            <View style={styles.postButtonContainer}>
                <Button
                    mode="contained"
                    style={styles.postButton}
                    contentStyle={styles.postButtonContent}
                    onPress={handlePostTask}
                >
                    <AirCarerText variant="button" style={styles.postButtonText}>
                        {i18n.t("publishTaskPost.postTask")}
                    </AirCarerText>
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.paper,
    },
    contentContainer: {
        paddingHorizontal: 10,
    },
    header: {
        marginBottom: 5,
    },
    subHeader: {
        marginBottom: 20,
        color: theme.colors.text,
    },
    detailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    detailText: {
        fontSize: 16,
        color: theme.colors.text,
        marginLeft: 10,
    },
    postButtonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    postButton: {
        backgroundColor: theme.colors.primary,
        borderRadius: theme.rouded.large,
    },
    postButtonContent: {
        justifyContent: 'center',
    },
    postButtonText: {
        color: theme.colors.paper,
        fontWeight: 'bold',
    },
    photoSectionHeader: {
        marginTop: 20,
        marginBottom: 10,
        color: theme.colors.text,
    },
    photoGrid: {
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
    photo: {
        width: 100,
        height: 100,
        borderRadius: 8,
        margin: 5,
    },
    fullScreenContainer: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullScreenImage: {
        width: width,
        height: height,
        resizeMode: 'contain',
    },
});