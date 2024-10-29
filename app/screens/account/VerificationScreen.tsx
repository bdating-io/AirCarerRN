import React from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { i18n } from '@app/locales/i18n';
import theme from '@app/constants/theme';
import { useSkills } from '@app/contexts/SkillsContext';
import * as FileSystem from 'expo-file-system';

const VerificationScreen: React.FC = () => {
    const { skills, setVerificationStatus } = useSkills();

    const firstName = "UserFirstName"; // Replace with actual user's first name
    const lastName = "UserLastName"; // Replace with actual user's last name

    const handleFileUpload = async () => {
        const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
        if (result.type === "success") {
            const fileUri = result.uri;
            const fileContent = await FileSystem.readAsStringAsync(fileUri);

            if (fileContent.includes(firstName) && fileContent.includes(lastName)) {
                setVerificationStatus("verified");
                Alert.alert(i18n.t("editProfile.verificationSuccess"), i18n.t("editProfile.verificationComplete"));
            } else {
                Alert.alert(i18n.t("editProfile.verificationFailed"), i18n.t("editProfile.verificationNameMismatch"));
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.description}>{i18n.t("editProfile.verificationDescription")}</Text>

            <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
                <Text style={styles.uploadButtonText}>{i18n.t("editProfile.uploadFile")}</Text>
            </TouchableOpacity>

            <Text style={styles.status}>
                {i18n.t("editProfile.currentVerificationStatus")}: {skills.verificationStatus === "verified" ? i18n.t("editProfile.verified") : i18n.t("editProfile.notVerified")}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 40,
    },
    uploadButton: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 8,
        marginBottom: 20,
    },
    uploadButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    status: {
        fontSize: 16,
        color: '#333',
        marginTop: 20,
    },
});

export default VerificationScreen;