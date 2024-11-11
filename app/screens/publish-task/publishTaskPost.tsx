import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, Modal, TouchableOpacity, Dimensions, FlatList, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import theme from '@app/constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { i18n } from '@app/locales/i18n';

const { width, height } = Dimensions.get('window');

export default function PublishTaskPostScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const { taskDetails } = route.params;

    const {
        date,
        cleanType,
        property,
        equipment,
        cleaningDetails,
        budget,
        photos = []
    } = taskDetails || {};

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
                        <Text style={styles.header}>{i18n.t("publishTaskPost.readyToPost")}</Text>
                        <Text style={styles.subHeader}>{i18n.t("publishTaskPost.postWhenReady")}</Text>

                        {/* Clean Type */}
                        <View style={styles.detailContainer}>
                            <MaterialCommunityIcons name="clipboard-text" size={24} color={theme.colors.primary} />
                            <Text style={styles.detailText}>
                                {cleanType === 'Regular' ? i18n.t("publishTaskPost.regularCleaning") : i18n.t("publishTaskPost.endOfLeaseCleaning")}
                            </Text>
                        </View>

                        {/* Date */}
                        <View style={styles.detailContainer}>
                            <MaterialCommunityIcons name="calendar" size={24} color={theme.colors.primary} />
                            <Text style={styles.detailText}>{formattedDate}</Text>
                        </View>

                        {/* Property Details */}
                        <View style={styles.detailContainer}>
                            <MaterialCommunityIcons name="home-outline" size={24} color={theme.colors.primary} />
                            <View>
                                <Text style={styles.detailText}>
                                    {`${formattedBedrooms}, ${formattedBathrooms}`}
                                </Text>
                                <Text style={styles.detailText}>{locationText}</Text>
                                <Text style={styles.detailText}>{equipmentText}</Text>
                                <Text style={styles.detailText}>
                                    {cleaningDetails || i18n.t("publishTaskPost.noAdditionalDetails")}
                                </Text>
                            </View>
                        </View>

                        {/* Budget */}
                        <View style={styles.detailContainer}>
                            <MaterialCommunityIcons name="currency-usd" size={24} color={theme.colors.primary} />
                            <Text style={styles.detailText}>{budgetText}</Text>
                        </View>

                        {/* Uploaded Photos Header */}
                        {photos.length > 0 && (
                            <Text style={styles.photoSectionHeader}>{i18n.t("publishTaskPost.uploadedPhotos")}</Text>
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
            <Button
                mode="contained"
                style={styles.postButton}
                onPress={handlePostTask}
            >
                {i18n.t("publishTaskPost.postTask")}
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingHorizontal: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.primary,
        marginBottom: 5,
    },
    subHeader: {
        fontSize: 16,
        color: theme.colors.primary,
        marginBottom: 20,
    },
    detailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    detailText: {
        fontSize: 16,
        color: theme.colors.primary,
        marginLeft: 10,
    },
    postButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: theme.colors.primary,
    },
    photoSectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.primary,
        marginTop: 20,
        marginBottom: 10,
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