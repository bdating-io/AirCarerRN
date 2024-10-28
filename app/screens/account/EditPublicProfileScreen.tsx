import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, FlatList, Modal, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { i18n } from '@app/locales/i18n';
import theme from '@app/constants/theme';

const { width, height } = Dimensions.get('window');

const EditPublicProfileScreen: React.FC = () => {
    const navigation = useNavigation();

    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [portfolioImages, setPortfolioImages] = useState<string[]>([]);
    const [isFullScreenVisible, setIsFullScreenVisible] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [location, setLocation] = useState('');

    const maxPortfolioImages = 30;

    const handleChangePhoto = () => {
        Alert.alert(
            i18n.t("editProfile.changePhotoTitle"),
            i18n.t("editProfile.changePhotoOptions"),
            [
                { text: i18n.t("editProfile.takePhoto"), onPress: handleTakePhoto },
                { text: i18n.t("editProfile.selectFromAlbum"), onPress: handlePickImage },
                { text: i18n.t("common.cancel"), style: "cancel" }
            ]
        );
    };

    const handleTakePhoto = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert(i18n.t("common.permissionRequired"), i18n.t("editProfile.cameraPermissionMessage"));
            return;
        }
        const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [4, 3], quality: 1 });
        if (!result.canceled && result.assets && result.assets.length > 0) {
            setProfileImage(result.assets[0].uri);
        }
    };

    const handlePickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert(i18n.t("common.permissionRequired"), i18n.t("editProfile.libraryPermissionMessage"));
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            allowsEditing: false,
            quality: 1,
        });
        if (!result.canceled && result.assets) {
            const selectedImages = result.assets.map(image => image.uri);
            if (portfolioImages.length + selectedImages.length > maxPortfolioImages) {
                Alert.alert(i18n.t("editProfile.imageLimitExceeded"), `${i18n.t("editProfile.maxImages")}: ${maxPortfolioImages}`);
            } else {
                setPortfolioImages([...portfolioImages, ...selectedImages]);
            }
        }
    };

    const openFullScreenImage = (index: number) => {
        setSelectedImageIndex(index);
        setIsFullScreenVisible(true);
    };

    const closeFullScreenImage = () => {
        setIsFullScreenVisible(false);
    };

    const handleImageTap = (index: number) => {
        Alert.alert(
            i18n.t("editProfile.imageOptionsTitle"),
            "",
            [
                { text: i18n.t("editProfile.viewInFullScreen"), onPress: () => openFullScreenImage(index) },
                { text: i18n.t("editProfile.deleteImage"), onPress: () => deleteImage(index), style: "destructive" },
                { text: i18n.t("common.cancel"), style: "cancel" }
            ]
        );
    };

    const deleteImage = (index: number) => {
        setPortfolioImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    const renderPortfolioImage = ({ item, index }: { item: string; index: number }) => (
        <TouchableOpacity onPress={() => handleImageTap(index)}>
            <Image source={{ uri: item }} style={styles.portfolioImage} />
        </TouchableOpacity>
    );

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                {/* Information Box */}
                <View style={styles.infoBox}>
                    <Ionicons name="bulb-outline" size={24} color={theme.colors.primary} />
                    <Text style={styles.infoBoxText}>
                        {i18n.t("editProfile.infoBoxTitle")}
                        {"\n"}
                        <Text style={styles.subInfoBoxText}>{i18n.t("editProfile.infoBoxDescription")}</Text>
                    </Text>
                </View>

                {/* Profile Picture */}
                <View style={styles.section}>
                    <Text style={styles.label}>{i18n.t("editProfile.profilePicture")}</Text>
                    <Text style={styles.descriptionText}>
                        Show yourself clearly to let others know who they’re connecting with.
                    </Text>
                    <TouchableOpacity style={styles.imageContainer} onPress={handleChangePhoto}>
                        <Image
                            style={styles.image}
                            source={profileImage ? { uri: profileImage } : require('@assets/images/placeholder_image.png')}
                        />
                        <Text style={styles.changePhotoText}>{i18n.t("editProfile.changePhoto")}</Text>
                    </TouchableOpacity>
                </View>

                {/* Bio Section */}
                <View style={styles.section}>
                    <Text style={styles.label}>Bio</Text>
                    <Text style={styles.descriptionText}>
                        Introduce yourself to new customers.
                    </Text>
                    <TextInput
                        style={styles.bioInput}
                        placeholder="A brief introduction of who you are and what you do on Airtasker"
                        multiline
                    />
                </View>

                {/* Portfolio Section */}
                <View style={styles.section}>
                    <Text style={styles.label}>Portfolio</Text>
                    <Text style={styles.descriptionText}>Show off your work (Max. 30 images).</Text>
                    <TouchableOpacity style={styles.portfolioContainer} onPress={handlePickImage}>
                        <View style={styles.addIcon}>
                            <MaterialCommunityIcons name="plus" size={30} color={theme.colors.primary} />
                        </View>
                    </TouchableOpacity>
                    {portfolioImages.length > 0 && (
                        <FlatList
                            data={portfolioImages}
                            renderItem={renderPortfolioImage}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={3}
                            style={styles.portfolioGrid}
                            scrollEnabled={false}
                        />
                    )}
                </View>

                {/* Full-Screen Image Viewer */}
                <Modal visible={isFullScreenVisible} transparent={true} onRequestClose={closeFullScreenImage}>
                    <View style={styles.fullScreenContainer}>
                        <FlatList
                            data={portfolioImages}
                            renderItem={({ item }) => <Image source={{ uri: item }} style={styles.fullScreenImage} />}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal
                            pagingEnabled
                            initialScrollIndex={selectedImageIndex}
                            getItemLayout={(data, index) => ({ length: width, offset: width * index, index })}
                        />
                        <TouchableOpacity style={styles.closeButton} onPress={closeFullScreenImage}>
                            <Ionicons name="close" size={30} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </Modal>

                {/* Verifications Section */}
                <View style={styles.section}>
                    <Text style={styles.label}>{i18n.t("editProfile.verificationTitle")}</Text>
                    <Text style={styles.descriptionText}>{i18n.t("editProfile.verificationDescription")}</Text>
                    <View style={styles.verificationContainer}>
                        <Ionicons name="alert-circle-outline" size={24} color="#999" />
                        <Text style={styles.verificationText}>{i18n.t("editProfile.notVerified")}</Text>
                        <TouchableOpacity>
                            <Text style={styles.getVerifiedText}>{i18n.t("editProfile.getVerified")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Skills Section */}
                <View style={styles.section}>
                    <Text style={styles.label}>{i18n.t("editProfile.skills")}</Text>
                    <Text style={styles.descriptionText}>{i18n.t("editProfile.skillsDescription")}</Text>
                    <TouchableOpacity style={styles.addSkillContainer} onPress={() => navigation.navigate("SkillsSettings")}>
                        <MaterialCommunityIcons name="plus" size={24} color={theme.colors.primary} />
                        <Text style={styles.addSkillText}>{i18n.t("editProfile.addSkills")}</Text>
                    </TouchableOpacity>
                </View>

                {/* First Name Section */}
                <View style={styles.section}>
                    <Text style={styles.label}>{i18n.t("editProfile.firstName")}</Text>
                    <TextInput style={styles.input} placeholder={i18n.t("editProfile.firstNamePlaceholder")} value={firstName} onChangeText={setFirstName} />
                </View>

                {/* Last Name Section */}
                <View style={styles.section}>
                    <Text style={styles.label}>{i18n.t("editProfile.lastName")}</Text>
                    <TextInput style={styles.input} placeholder={i18n.t("editProfile.lastNamePlaceholder")} value={lastName} onChangeText={setLastName} />
                </View>

                {/* Location Section */}
                <View style={styles.section}>
                    <Text style={styles.label}>{i18n.t("editProfile.location")}</Text>
                    <TextInput style={styles.input} placeholder={i18n.t("editProfile.locationPlaceholder")} value={location} onChangeText={setLocation} />
                </View>

                {/* Save Button */}
                <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>{i18n.t("editProfile.saveChanges")}</Text>
                </TouchableOpacity>
            </ScrollView>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 20, backgroundColor: '#fff' },
    infoBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F7FF', padding: 15, borderRadius: 8, marginBottom: 20, marginTop: 10 },
    infoBoxText: { flex: 1, fontSize: 16, color: theme.colors.primary, marginLeft: 10 },
    subInfoBoxText: { color: '#4F6C92', fontSize: 14 },
    section: { marginBottom: 25 },
    label: { fontSize: 16, fontWeight: 'bold', color: '#2F2F2F', marginBottom: 5 },
    descriptionText: { fontSize: 14, color: '#666', marginBottom: 5 },
    imageContainer: { flexDirection: 'row', alignItems: 'center' },
    image: { width: 80, height: 80, borderRadius: 40, marginRight: 15 },
    changePhotoText: { color: theme.colors.primary, fontSize: 16 },
    bioInput: { height: 100, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, padding: 12, fontSize: 14, textAlignVertical: 'top' },
    portfolioContainer: { flexDirection: 'row', alignItems: 'center' },
    addIcon: { width: 50, height: 50, backgroundColor: '#E6E9EF', justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginRight: 12 },
    portfolioGrid: { marginTop: 10 },
    portfolioImage: { width: 100, height: 100, margin: 5, borderRadius: 5 },
    fullScreenContainer: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
    fullScreenImage: { width: width, height: height, resizeMode: 'contain' },
    closeButton: { position: 'absolute', top: 40, right: 20 },
    verificationContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
    verificationText: { fontSize: 14, color: '#999', marginLeft: 10 },
    getVerifiedText: { color: theme.colors.primary, marginLeft: 10 },
    addSkillContainer: { borderColor: theme.colors.primary, borderWidth: 1, borderRadius: 5, padding: 12, alignItems: 'center', flexDirection: 'row', marginTop: 10 },
    addSkillText: { color: theme.colors.primary, fontWeight: 'bold', marginLeft: 5 },
    input: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, fontSize: 14, color: '#333', backgroundColor: '#fff' },
    saveButton: { backgroundColor: theme.colors.primary, padding: 18, borderRadius: 8, alignItems: 'center', marginTop: 20 },
    saveButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default EditPublicProfileScreen;