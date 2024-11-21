import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { i18n } from '@app/locales/i18n';
import theme from '@app/constants/theme';
import { useSkills } from '@app/contexts/SkillsContext';
import * as FileSystem from 'expo-file-system';
import { Button } from 'react-native-paper';
import AirCarerText from "@app/constants/AirCarerText";

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
            <AirCarerText
                variant="default"
                style={styles.description}
                allowFontScaling={true}
            >
                {i18n.t("editProfile.verificationDescription")}
            </AirCarerText>

            <Button
                mode="contained"
                onPress={handleFileUpload}
                style={styles.uploadButton}
                contentStyle={styles.uploadButtonContent}
            >
                <AirCarerText
                    variant="button"
                    style={styles.uploadButtonText}
                    allowFontScaling={true}
                >
                    {i18n.t("editProfile.uploadFile")}
                </AirCarerText>
            </Button>

            <AirCarerText
                variant="default"
                style={styles.status}
                allowFontScaling={true}
            >
                {i18n.t("editProfile.currentVerificationStatus")}:{" "}
                {skills.verificationStatus === "verified"
                    ? i18n.t("editProfile.verified")
                    : i18n.t("editProfile.notVerified")}
            </AirCarerText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: theme.colors.paper,
        alignItems: 'center',
        justifyContent: 'center',
    },
    description: {
        fontSize: 16,
        color: theme.colors.text,
        textAlign: 'center',
        marginBottom: 40,
    },
    uploadButton: {
        backgroundColor: theme.colors.primary,
        borderRadius: theme.rouded.large,
        paddingVertical: 10,
        paddingHorizontal: 40,
        marginBottom: 20,
    },
    uploadButtonContent: {
        justifyContent: 'center',
    },
    uploadButtonText: {
        color: theme.colors.paper,
        fontWeight: 'bold',
    },
    status: {
        fontSize: 16,
        color: theme.colors.text,
        marginTop: 20,
        textAlign: 'center',
    },
});

export default VerificationScreen;