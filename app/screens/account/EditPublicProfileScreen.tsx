import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, FlatList, Modal, Dimensions } from 'react-native';
import { TextInput, Button } from 'react-native-paper'; // TextInput and Button from react-native-paper
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { i18n } from '@app/locales/i18n';
import theme from '@app/constants/theme';
import { useSkills } from '@app/contexts/SkillsContext';
import { RootStackParamList } from '@app/types/common.type';
import { useFontSize } from '@app/contexts/font.context';
import AirCarerText from '@app/constants/AirCarerText';

const { width, height } = Dimensions.get('window');

const EditPublicProfileScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { skills, updateSkills } = useSkills();
    const { fontSize } = useFontSize();

    const [profileImage, setProfileImage] = useState<string | null>(skills.profilePicture || null);
    const [portfolioImages, setPortfolioImages] = useState<string[]>(skills.portfolioImages || []);
    const [isFullScreenVisible, setIsFullScreenVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [bio, setBio] = useState(skills.bio || '');
    const [firstName, setFirstName] = useState(skills.firstName || '');
    const [lastName, setLastName] = useState(skills.lastName || '');
    const [location, setLocation] = useState(skills.location || '');

    const maxPortfolioImages = 30;

    useEffect(() => {
        navigation.setOptions({
            title: i18n.t("editProfile.title")
        });
    }, [navigation]);

    const handleChangePhoto = () => {
        Alert.alert(
            i18n.t("editProfile.changePhotoTitle"),
            i18n.t("editProfile.changePhotoOptions"),
            [
                { text: i18n.t("editProfile.takePhoto"), onPress: handleTakePhoto },
                { text: i18n.t("editProfile.selectFromAlbum"), onPress: handlePickSingleImage },
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

    const handlePickSingleImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert(i18n.t("common.permissionRequired"), i18n.t("editProfile.libraryPermissionMessage"));
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: false,
            quality: 1,
        });
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
            i18n.t("editProfile.imageOptionsTitle"),
            "",
            [
                { text: i18n.t("editProfile.viewInFullScreen"), onPress: () => openFullScreenImage(portfolioImages[index]) },
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

    const handleSaveChanges = () => {
        // Save profile changes
        updateSkills("profilePicture", profileImage);
        updateSkills("portfolioImages", portfolioImages);
        updateSkills("bio", bio);
        updateSkills("firstName", firstName);
        updateSkills("lastName", lastName);
        updateSkills("location", location);

        // Show alert and then navigate
        Alert.alert(
            i18n.t("editProfile.successAlertTitle"),
            i18n.t("editProfile.successAlertMessage"),
            [
                {
                    text: i18n.t("common.ok"),
                    onPress: () => navigation.navigate("Account"),
                }
            ]
        );
    };

    const skillCategories = [
        { label: i18n.t("editProfile.transportation"), value: skills.transportation },
        { label: i18n.t("editProfile.languages"), value: skills.languages },
        { label: i18n.t("editProfile.education"), value: skills.education },
        { label: i18n.t("editProfile.work"), value: skills.work },
        { label: i18n.t("editProfile.specialties"), value: skills.specialties }
    ].filter(skill => skill.value && skill.value.length > 0);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <View style={styles.infoBox}>
                    <Ionicons name="bulb-outline" size={24} color={theme.colors.primary} />
                    <AirCarerText variant="subtitle">
                        {i18n.t("editProfile.infoBoxTitle")}
                        {"\n"}
                        <AirCarerText>{i18n.t("editProfile.infoBoxDescription")}</AirCarerText>
                    </AirCarerText>
                </View>

                {/* Profile Picture Section */}
                <View style={styles.section}>
                    <AirCarerText variant="h2">{i18n.t("editProfile.profilePicture")}</AirCarerText>
                    <AirCarerText variant="default">{i18n.t("editProfile.profilePictureDescription")}</AirCarerText>
                    <View style={styles.imageContainer}>
                        <Image
                            style={[
                                styles.image,
                                { width: fontSize * 4.5, height: fontSize * 4.5 }, // Dynamically set image size
                            ]}
                            source={profileImage ? { uri: profileImage } : require('@assets/images/placeholder_image.png')}
                        />
                        <TouchableOpacity style={styles.changePhotoButton} onPress={handleChangePhoto}>
                            <AirCarerText style={{ fontSize }}>{i18n.t("editProfile.changePhoto")}</AirCarerText>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Bio Section */}
                <View style={styles.section}>
                    <AirCarerText variant="h2">{i18n.t("editProfile.bio")}</AirCarerText>
                    <AirCarerText variant="default">{i18n.t("editProfile.bioDescription")}</AirCarerText>
                    <View style={styles.bioInputContainer}>
                        {bio === '' && (
                            <AirCarerText style={styles.bioPlaceholder} variant="default">
                                {i18n.t("editProfile.bioPlaceholder")}
                            </AirCarerText>
                        )}
                        <TextInput
                            style={[
                                styles.bioInput,
                                { fontSize }, // Dynamically apply fontSize from context
                            ]}
                            value={bio}
                            onChangeText={setBio}
                            multiline
                            underlineColorAndroid="transparent" // Removes blue underline in Android
                        />
                    </View>
                </View>

                {/* Portfolio Section */}
                <View style={styles.section}>
                    <AirCarerText variant="h2">{i18n.t("editProfile.portfolio")}</AirCarerText>
                    <AirCarerText variant="default">{i18n.t("editProfile.portfolioDescription")}</AirCarerText>
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

                {/* Full-Screen Image Modal */}
                <Modal visible={isFullScreenVisible} transparent={true} onRequestClose={closeFullScreenImage}>
                    <TouchableOpacity style={styles.fullScreenContainer} onPress={closeFullScreenImage}>
                        {selectedImage && (
                            <Image source={{ uri: selectedImage }} style={styles.fullScreenImage} resizeMode="contain" />
                        )}
                    </TouchableOpacity>
                </Modal>

                {/* Verification Section */}
                <View style={styles.section}>
                    <AirCarerText variant="h2">{i18n.t("editProfile.verificationTitle")}</AirCarerText>
                    <AirCarerText variant="default">{i18n.t("editProfile.verificationDescription")}</AirCarerText>
                    <View style={styles.verificationContainer}>
                        <Ionicons
                            name={skills.verificationStatus === "verified" ? "checkmark-circle" : "alert-circle-outline"}
                            size={fontSize * 1.5} // Dynamic size for icon
                            color={skills.verificationStatus === "verified" ? theme.colors.success : "#999"}
                        />
                        <AirCarerText style={{ marginLeft: 10 }}>
                            {skills.verificationStatus === "verified"
                                ? i18n.t("editProfile.verified")
                                : i18n.t("editProfile.notVerified")}
                        </AirCarerText>
                        {skills.verificationStatus !== "verified" && (
                            <TouchableOpacity style={styles.getVerifiedButton} onPress={() => navigation.navigate("VerificationScreen")}>
                                <AirCarerText style={{ fontSize, color: theme.colors.primary }}>
                                    {i18n.t("editProfile.getVerified")}
                                </AirCarerText>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {/* Skills Section */}
                <View style={styles.section}>
                    <AirCarerText variant="h2">{i18n.t("editProfile.skills")}</AirCarerText>
                    <AirCarerText variant="default">{i18n.t("editProfile.skillsDescription")}</AirCarerText>
                    <TouchableOpacity style={styles.addSkillContainer} onPress={() => navigation.navigate("SkillsSettings")}>
                        <MaterialCommunityIcons name="plus" size={fontSize * 1.5} color={theme.colors.primary} />
                        <AirCarerText style={{ fontSize, marginLeft: 5 }} variant="button">
                            {i18n.t("editProfile.addSkills")}
                        </AirCarerText>
                    </TouchableOpacity>
                    {skillCategories.map((skill, index) => (
                        <AirCarerText key={index} variant="default">
                            {skill.label}: {skill.value.join(', ')}
                        </AirCarerText>
                    ))}
                </View>

                {/* Personal Information Section */}
                <View style={styles.section}>
                    <TextInput
                        label={i18n.t("editProfile.firstName")} // Display label
                        value={firstName}
                        onChangeText={setFirstName}
                        mode="outlined"
                        outlineStyle={styles.input} // Apply consistent style
                    />
                </View>
                <View style={styles.section}>
                    <TextInput
                        label={i18n.t("editProfile.lastName")} // Display label
                        value={lastName}
                        onChangeText={setLastName}
                        mode="outlined"
                        outlineStyle={styles.input} // Apply consistent style
                    />
                </View>
                <View style={styles.section}>
                    <TextInput
                        label={i18n.t("editProfile.location")} // Display label
                        value={location}
                        onChangeText={setLocation}
                        mode="outlined"
                        outlineStyle={styles.input} // Apply consistent style
                    />
                </View>

                {/* Save Button */}
                <View style={styles.saveButtonContainer}>
                    <Button
                        mode="contained"
                        onPress={handleSaveChanges}
                        contentStyle={[
                            styles.saveButtonContent,
                            { height: fontSize * 2.5 }, // Dynamically adjust height with font size
                        ]}
                        style={styles.saveButton}
                    >
                        <AirCarerText variant="button" style={styles.saveButtonText}>
                            {i18n.t("editProfile.saveChanges")}
                        </AirCarerText>
                    </Button>
                </View>
            </ScrollView>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 20, backgroundColor: '#fff' },
    infoBox: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#F3F7FF', 
        padding: 15, 
        borderRadius: 8, 
        marginBottom: 20, 
        marginTop: 10 
    },
    section: { marginBottom: 35 },
    imageContainer: { 
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    image: { 
        borderRadius: 50,
        marginRight: 10,
    },
    changePhotoButton: { 
        flex: 1,
        alignItems: 'flex-start',
    },
    bioInputContainer: {
        height: 100,
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        position: 'relative',
        backgroundColor: theme.colors.paper,
    },
    bioPlaceholder: {
        position: 'absolute',
        top: 12,
        left: 12,
        color: '#aaa',
        lineHeight: 20,
    },
    bioInput: {
        flex: 1,
        textAlignVertical: 'top',
        padding: 0,
        color: '#000',
        backgroundColor: 'transparent',
    },
    portfolioGrid: { marginTop: 10 },
    portfolioImage: { 
        width: 100, 
        height: 100, 
        margin: 5, 
        borderRadius: 5 
    },
    fullScreenContainer: { 
        flex: 1, 
        backgroundColor: '#000', 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    fullScreenImage: { 
        width: width, 
        height: height, 
        resizeMode: 'contain' 
    },
    verificationContainer: { 
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    getVerifiedButton: {
        marginLeft: 'auto',
    },
    addSkillContainer: { 
        borderColor: theme.colors.primary, 
        borderWidth: 1, 
        borderRadius: 5, 
        padding: 12, 
        alignItems: 'center', 
        flexDirection: 'row',
        marginTop: 10,
    },
    input: {
        borderRadius: theme.rouded.small,
        backgroundColor: theme.colors.paper,
    },
    saveButtonContainer: {
        marginTop: 20,
        marginBottom: 30,
    },
    saveButton: {
        backgroundColor: theme.colors.primary,
        borderRadius: theme.rouded.large, // Use a consistent radius
    },
    saveButtonContent: {
        justifyContent: "center",
    },
    saveButtonText: {
        color: theme.colors.paper,
        fontWeight: "bold",
    },
});

export default EditPublicProfileScreen;