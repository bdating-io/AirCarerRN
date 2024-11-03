import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import { Button, IconButton } from "react-native-paper";
import AirCarerText from "@app/constants/AirCarerText";
import { useFontSize } from "@app/contexts/font.context";
import { useLanguage } from "@app/contexts/language.context";
import { useAuth0 } from "react-native-auth0";
import { useDispatch } from "react-redux";
import theme from "@app/constants/theme";
import { i18n } from "@app/locales/i18n";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const FontSizeControls: React.FC = () => {
  const { fontSize, changeFontSize } = useFontSize();

  return (
    <View style={styles.fontControlsContainer}>
      <AirCarerText>{i18n.t("accountTab.currentFont")} {fontSize}</AirCarerText>
      <View style={styles.buttonGroup}>
        <Button icon="plus" mode="contained" onPress={() => changeFontSize(fontSize + 2)} style={styles.button}>
          <AirCarerText variant="button">increase</AirCarerText>
        </Button>
        <Button icon="minus" mode="contained" onPress={() => changeFontSize(fontSize - 2)} style={styles.button}>
          <AirCarerText variant="button">decrease</AirCarerText>
        </Button>
      </View>
    </View>
  );
};

const MenuItem = ({ icon, text, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.menuItem}>
      <View style={styles.menuItemContent}>
        <IconButton icon={icon} size={24} iconColor={theme.colors.primary} style={styles.menuIcon} />
        <AirCarerText style={styles.menuText}>{text}</AirCarerText>
      </View>
      <IconButton icon="chevron-right" size={24} iconColor={theme.colors.primary} />
    </View>
  </TouchableOpacity>
);
export default function AccountScreen({navigation}: any) {
    const dirspatch = useDispatch();
    const { user, authorize, error, clearSession } = useAuth0();
    const { lang, changeLanguage } = useLanguage();

const AccountScreen: React.FC = (props: any) => {
  const dispatch = useDispatch();
  const { user, authorize, clearSession } = useAuth0();
  const { lang, changeLanguage } = useLanguage();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  // Profile data states
  const [profileImage, setProfileImage] = useState(null);
  const [firstName, setFirstName] = useState("No user");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("Melbourne VIC, Australia");
  const [portfolioImages, setPortfolioImages] = useState([]);
  const [bio, setBio] = useState("");

  const signin = async () => {
    authorize()
      .then((user) => {
        if (user?.accessToken !== undefined) {
          navigation.navigate("index");
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const signout = async () => {
    await clearSession();
  };

  const Edit = () => {
    navigation.navigate("EditPublicProfile", {
      profileImage,
      firstName,
      lastName,
      location,
      portfolioImages,
      bio,
    });
  };

  useEffect(() => {
    if (isFocused) {
      const updateListener = navigation.addListener("focus", () => {
        if (props.route?.params) {
          const { profileImage, firstName, lastName, location, portfolioImages, bio } = props.route.params;
          setProfileImage(profileImage);
          setFirstName(firstName || "No user");
          setLastName(lastName || "");
          setLocation(location || "Melbourne VIC, Australia");
          setPortfolioImages(portfolioImages || []);
          setBio(bio || "");
          Alert.alert("Profile Updated", "Your profile changes have been saved successfully.");
        }
      });

      return updateListener;
    }
  }, [isFocused, props.route?.params]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.avatar} />
          ) : (
            <View style={styles.avatar} />
          )}
        </View>
        <View style={styles.profileInfo}>
          <AirCarerText style={styles.username}>{firstName} {lastName}</AirCarerText>
          <AirCarerText style={styles.location}>{location}</AirCarerText>
          <View style={styles.editContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("PublicProfile")}>
              <AirCarerText style={styles.publicProfile}>{i18n.t("accountTab.publicProfile")}</AirCarerText>
            </TouchableOpacity>
            <Button
              mode="contained"
              buttonColor={theme.colors.primary}
              textColor="white"
              style={styles.button}
              icon="pencil"
              onPress={Edit}
            >
              <AirCarerText variant="button">{i18n.t("edit")}</AirCarerText>
            </Button>
          </View>
        </View>
      </View>

      <View style={styles.controlsSection}>
        <FontSizeControls />
        <AirCarerText style={styles.languageTitle}>{i18n.t("accountTab.language")}</AirCarerText>
        <View style={styles.languageControls}>
          <Button mode="contained" onPress={() => changeLanguage("zh")} style={styles.button}>
            <AirCarerText variant="button">ZH</AirCarerText>
          </Button>
          <Button mode="contained" onPress={() => changeLanguage("en")} style={styles.button}>
            <AirCarerText variant="button">EN</AirCarerText>
          </Button>
        </View>
        <AirCarerText>{i18n.t("accountTab.loginLogout")}</AirCarerText>
        <View style={styles.authControls}>
          <View style={styles.buttonGroup}>
            <Button mode="contained" onPress={signin} style={styles.button}>
              <AirCarerText variant="button">Login</AirCarerText>
            </Button>
            <Button mode="contained" onPress={signout} style={styles.button}>
              <AirCarerText variant="button">Log out</AirCarerText>
            </Button>
            <Button mode="contained" onPress={() => navigation.navigate("signup/profile")}>
                <AirCarerText variant="button">Test Create Profile</AirCarerText>
                </Button>
          </View>
        </View>
      </View>

      <View style={styles.settingsSection}>
        <AirCarerText style={styles.sectionTitle}>{i18n.t("accountTab.accountSettings")}</AirCarerText>
        <MenuItem icon="credit-card" text="Payment options" onPress={() => console.log('Payment options')} />
        <MenuItem icon="bell" text="Notification preferences" onPress={() => console.log('Notifications')} />
        <MenuItem icon="lock" text="Account information" onPress={() => console.log('Account info')} />
        
        <AirCarerText style={[styles.sectionTitle, styles.earningTitle]}>EARNING MONEY</AirCarerText>
        <MenuItem icon="view-dashboard" text="My dashboard" onPress={() => navigation.navigate('browsing-task/task-detail')} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.scrim,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  userContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  profileSection: {
    backgroundColor: theme.colors.scrim,
    padding: 20,
    paddingVertical: 40,
    flexDirection: "row",
    alignItems: "flex-start",
    paddingBottom: 60,
    paddingRight: 15,
  },
  languageTitle: {
    marginBottom: 10,
  },
  avatarContainer: {
    marginRight: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.contrastText,
  },
  profileInfo: {
    flex: 1,
    justifyContent: "center",
  },
  username: {
    color: theme.colors.contrastText,
    fontWeight: "bold",
    marginBottom: 8,
  },
  location: {
    color: theme.colors.contrastText,
    marginBottom: 12,
  },
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  publicProfile: {
    color: theme.colors.contrastText,
    flex: 1,
    fontWeight: "bold",
  },
  settingsSection: {
    marginTop: 20,
    padding: 20,
    backgroundColor: theme.colors.contrastText,
    borderRadius: theme.rouded.large,
  },
  sectionTitle: {
    marginBottom: 15,
    fontWeight: "600",
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    marginRight: 12,
    margin: 0,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
  },
  controlsSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: theme.colors.contrastText,
    borderRadius: theme.rouded.large,
  },
  fontControlsContainer: {
    marginBottom: 20,
  },
  languageControls: {
    flexDirection: "row",
    marginBottom: 20,
  },
  authControls: {
    marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: "row",
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: theme.rouded.large,
  },
  earningTitle: {
    marginTop: 20,
  },
});

export default AccountScreen;