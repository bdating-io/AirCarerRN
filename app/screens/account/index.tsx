import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, Platform } from "react-native";
import { Button, IconButton } from "react-native-paper";
import AirCarerText from "@app/constants/AirCarerText";
import { useAuth0 } from "react-native-auth0";
import { useDispatch } from "react-redux";
import theme from "@app/constants/theme";
import { i18n } from "@app/locales/i18n";
import { useNavigation, useIsFocused, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@app/types/common.type";


interface MenuItemProps {
  icon: string;
  text: string;
  onPress: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, text, onPress }) => (
  <View style={styles.menuItem}>
    <TouchableOpacity onPress={onPress} style={styles.menuItemContent}>
      <IconButton icon={icon} size={24} iconColor={theme.colors.primary} style={styles.menuIcon} />
      <AirCarerText style={styles.menuText}>{text}</AirCarerText>
      <IconButton icon="chevron-right" size={24} iconColor={theme.colors.primary} />
    </TouchableOpacity>
  </View>
);


const AccountScreen: React.FC = (props: any) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const { user, authorize, clearSession } = useAuth0();
  const isFocused = useIsFocused();

  // Profile data states
  const [profileImage, setProfileImage] = useState(null);
  const [location, setLocation] = useState("Melbourne VIC, Australia");
  const [portfolioImages, setPortfolioImages] = useState([]);
  const [bio, setBio] = useState("");

  const signin = async () => {
    authorize()
      .then((user) => {
        // if (user?.accessToken !== undefined) {
        //   navigation.navigate("index");
        // }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const signout = async () => {
    await clearSession();
  };

  const Edit = () => {
    navigation.navigate('EditPublicProfile');
  };

  useEffect(() => {
    if (isFocused) {
      const updateListener = navigation.addListener("focus", () => {
        if (props.route?.params) {
          const { profileImage, firstName, lastName, location, portfolioImages, bio } = props.route.params;
          setProfileImage(profileImage);
          // setFirstName(firstName || "No user");
          // setLastName(lastName || "");
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
          <AirCarerText variant="bold" style={{ color: theme.colors.contrastText }}>Hi, {user?.nickname}</AirCarerText>
          <AirCarerText style={{ color: theme.colors.contrastText }}>{location}</AirCarerText>
          <View style={styles.editContainer}>
            {/* <TouchableOpacity onPress={() => navigation.navigate("PublicProfile")}>
              <AirCarerText style={styles.publicProfile}>{i18n.t("accountTab.publicProfile")}</AirCarerText>
            </TouchableOpacity> */}
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
          </View>
          
          <View style={styles.buttonGroup}>
                <Button mode="contained" onPress={() => navigation.navigate("signup/profile")}>
                <AirCarerText variant="button">Test Create Profile</AirCarerText>
                </Button>
          </View>
          
        </View>
      </View>

      <View style={styles.settingsSection}>
        <AirCarerText variant="bold" style={styles.sectionTitle}>{i18n.t("accountTab.accountSettings")}</AirCarerText>
        <MenuItem icon="credit-card" text={i18n.t('accountTab.paymentOptions')} onPress={() => console.log('Payment options')} />
        <MenuItem icon="bell" text={i18n.t('accountTab.notifications')} onPress={() => console.log('Notifications')} />
        <MenuItem icon="cog" text={i18n.t('accountTab.settings')} onPress={() => navigation.navigate("account/setting")} />

        <AirCarerText variant="bold" style={[styles.sectionTitle, styles.earningMoneyTitle]}>{i18n.t('accountTab.earningMoney')}</AirCarerText>
        <MenuItem icon="view-dashboard" text="My dashboard" onPress={() => navigation.navigate('browsing-task/task-detail')} />

        {
          user ? (
            <Button
              mode="contained"
              style={styles.loginoutButtonBody}
              contentStyle={styles.logoutButton}
              onPress={signout}
              icon="logout"
            >
              <AirCarerText variant="button">{i18n.t("logout")}</AirCarerText>
            </Button>
          ) : (
            <Button
              mode="contained"
              onPress={signin}
              style={styles.loginoutButtonBody}
              contentStyle={styles.loginButton}
              icon="login"
            >
              <AirCarerText variant="button">{i18n.t("login")}</AirCarerText>
            </Button>
          )

        }

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.contrastText,
  },
  userContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  profileSection: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 80,
    flexDirection: "row",
    alignItems: "flex-start",
    paddingRight: 15,
    backgroundColor: theme.colors.scrim,
  },
  avatarContainer: {
    marginRight: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.contrastText,
  },
  profileInfo: {
    flex: 1,
    justifyContent: "center",
    gap: 8,
  },
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  publicProfile: {
    color: theme.colors.contrastText,
    flex: 1,
    fontWeight: "bold",
  },
  settingsSection: {
    marginTop: -40,
    padding: 20,
    backgroundColor: theme.colors.contrastText,
    borderTopLeftRadius: theme.rouded.large,
    borderTopRightRadius: theme.rouded.large,
  },
  sectionTitle: {
    marginVertical: 15,
    paddingHorizontal: 5,
    fontWeight: "600",
  },
  earningMoneyTitle: {
    marginTop: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
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
  button: {
    borderRadius: theme.rouded.large,
  },
  loginoutButtonBody: {
    marginVertical: 20,
    borderRadius: theme.rouded.large,
    marginHorizontal: 5,
  },
  loginButton: {
    flex: 1,
  },
  logoutButton: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
    paddingVertical: 2,
  },
});

export default AccountScreen;