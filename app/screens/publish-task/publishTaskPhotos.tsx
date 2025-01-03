import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Alert, FlatList, Modal, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import theme from '@app/constants/theme';
import AirCarerText from '@app/constants/AirCarerText';
import { i18n } from '@app/locales/i18n';
import { useDispatch } from 'react-redux';
import { updateDraftTask } from '../../slices/task.slice';

const { width, height } = Dimensions.get('window');

const PublishTaskPhotosScreen = () => {
    const navigation = useNavigation();
    //const route = useRoute();
    //const { taskDetails } = route.params || {};
    const dispatch = useDispatch();

    const [photos, setPhotos] = useState<string[]>([]);
    const [isFullScreenVisible, setIsFullScreenVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const maxPhotos = 10;

    const handleAddPhoto = () => {
        Alert.alert(
            i18n.t("publishTaskPhotos.addPhotoTitle"),
            i18n.t("publishTaskPhotos.addPhotoOptions"),
            [
                { text: i18n.t("publishTaskPhotos.takePhoto"), onPress: handleTakePhoto },
                { text: i18n.t("publishTaskPhotos.uploadFromAlbum"), onPress: handlePickImage },
                { text: i18n.t("common.cancel"), style: "cancel" }
            ]
        );
    };

    const handleTakePhoto = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert(i18n.t("common.permissionRequired"), i18n.t("publishTaskPhotos.cameraPermissionMessage"));
            return;
        }
        const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [4, 3], quality: 1 });
        if (!result.canceled && result.assets && result.assets.length > 0) {
            setPhotos([...photos, result.assets[0].uri]);
        }
    };

    const handlePickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert(i18n.t("common.permissionRequired"), i18n.t("publishTaskPhotos.libraryPermissionMessage"));
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
        });
        if (!result.canceled && result.assets) {
            const selectedImages = result.assets.map(image => image.uri);
            if (photos.length + selectedImages.length > maxPhotos) {
                Alert.alert(i18n.t("publishTaskPhotos.imageLimitExceeded"), i18n.t("publishTaskPhotos.maxPhotosMessage", { max: maxPhotos }));
            } else {
                setPhotos([...photos, ...selectedImages]);
            }
        }
    };

    const openFullScreenImage = (imageUri: string) => {
        setSelectedImage(imageUri);
        setIsFullScreenVisible(true);
    };

    const closeFullScreenImage = () => {
        setIsFullScreenVisible(false);
        setSelectedImage(null);
    };

    const handleImageTap = (index: number) => {
        Alert.alert(
            i18n.t("publishTaskPhotos.imageOptionsTitle"),
            "",
            [
                { text: i18n.t("editProfile.viewInFullScreen"), onPress: () => openFullScreenImage(photos[index]) },
                { text: i18n.t("editProfile.deleteImage"), onPress: () => deleteImage(index), style: "destructive" },
                { text: i18n.t("common.cancel"), style: "cancel" }
            ]
        );
    };

    const deleteImage = (index: number) => {
        setPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index));
    };

    const renderPhoto = ({ item, index }: { item: string; index: number }) => (
        <TouchableOpacity onPress={() => handleImageTap(index)}>
            <Image source={{ uri: item }} style={styles.photo} />
        </TouchableOpacity>
    );

    const handleContinue = () => {
        dispatch(updateDraftTask({
            descImages: photos
        }));

        navigation.navigate("publishTaskBudget");
    };

    return (
        <View style={styles.container}>
            <AirCarerText variant="h1" style={styles.header}>{i18n.t("publishTaskPhotos.header")}</AirCarerText>
            <AirCarerText style={styles.subHeader}>{i18n.t("publishTaskPhotos.subHeader", { max: maxPhotos })}</AirCarerText>
            
            <View style={styles.photoGrid}>
                <FlatList
                    data={[...photos, "add-button"]}
                    renderItem={({ item }) =>
                        item === "add-button" ? (
                            photos.length < maxPhotos && (
                                <TouchableOpacity style={styles.addPhotoButton} onPress={handleAddPhoto}>
                                    <MaterialCommunityIcons name="plus" size={30} color={theme.colors.primary} />
                                </TouchableOpacity>
                            )
                        ) : (
                            renderPhoto({ item, index: photos.indexOf(item) })
                        )
                    }
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={3}
                />
            </View>

            <Modal visible={isFullScreenVisible} transparent={true} onRequestClose={closeFullScreenImage}>
                <TouchableOpacity style={styles.fullScreenContainer} onPress={closeFullScreenImage}>
                    {selectedImage && (
                        <Image source={{ uri: selectedImage }} style={styles.fullScreenImage} resizeMode="contain" />
                    )}
                </TouchableOpacity>
            </Modal>

            <View style={styles.continueButtonContainer}>
                <Button
                    mode="contained"
                    style={styles.continueButton}
                    contentStyle={styles.continueButtonContent}
                    onPress={handleContinue}
                    disabled={photos.length === 0}
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
        paddingHorizontal: 20,
        backgroundColor: theme.colors.paper,
    },
    header: {
        marginBottom: 10,
    },
    subHeader: {
        marginVertical: 10,
        color: theme.colors.text,
    },
    photoGrid: {
        marginTop: 20,
        marginBottom: 60,
    },
    addPhotoButton: {
        width: 100,
        height: 100,
        borderRadius: 8,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    photo: {
        width: 100,
        height: 100,
        margin: 5,
        borderRadius: 8,
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
    fullScreenContainer: {
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullScreenImage: {
        width: width,
        height: height,
        resizeMode: 'contain',
    },
});

export default PublishTaskPhotosScreen;