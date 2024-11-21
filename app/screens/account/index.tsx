import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
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
    authorize().catch((error: any) => {
      console.log(error);
    });
  };

  const signout = async () => {
    await clearSession();
  };

  const Edit = () => {
    navigation.navigate("EditPublicProfile");
  };

  useEffect(() => {
    if (isFocused) {
      const updateListener = navigation.addListener("focus", () => {
        if (props.route?.params) {
          const { profileImage, location, portfolioImages, bio } = props.route.params;
          setProfileImage(profileImage);
          setLocation(location || "Melbourne VIC, Australia");
          setPortfolioImages(portfolioImages || []);
          setBio(bio || "");
          Alert.alert(
            i18n.t("accountTab.profileUpdated"),
            i18n.t("accountTab.profileUpdatedMessage")
          );
        }
      });

      return updateListener;
    }
  }, [isFocused, props.route?.params]);

  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.avatar} />
          ) : (
            <View style={styles.avatar} />
          )}
        </View>
        <View style={styles.profileInfo}>
          <AirCarerText variant="bold" style={{ color: theme.colors.contrastText }}>
            {i18n.t("accountTab.greeting")}, {user?.nickname}
          </AirCarerText>
          <AirCarerText style={{ color: theme.colors.contrastText }}>{location}</AirCarerText>
          <View style={styles.editContainer}>
            <Button
              mode="contained"
              style={styles.button}
              onPress={Edit}
              contentStyle={styles.editButtonContent}
            >
              <AirCarerText variant="button">{i18n.t("edit")}</AirCarerText>
            </Button>
          </View>
        </View>
      </View>

      {/* Settings Section */}
      <View style={styles.settingsSection}>
        <AirCarerText variant="bold" style={styles.sectionTitle}>
          {i18n.t("accountTab.accountSettings")}
        </AirCarerText>
        <MenuItem
          icon="credit-card"
          text={i18n.t("accountTab.paymentOptions")}
          onPress={() => console.log("Payment options")}
        />
        <MenuItem
          icon="bell"
          text={i18n.t("accountTab.notifications")}
          onPress={() => console.log("Notifications")}
        />
        <MenuItem
          icon="cog"
          text={i18n.t("accountTab.settings")}
          onPress={() => navigation.navigate("account/setting")}
        />

        <AirCarerText variant="bold" style={[styles.sectionTitle, styles.earningMoneyTitle]}>
          {i18n.t("accountTab.earningMoney")}
        </AirCarerText>
        <MenuItem
          icon="view-dashboard"
          text={i18n.t("accountTab.myDashboard")}
          onPress={() => navigation.navigate("browsing-task/task-detail")}
        />

        {/* Login/Logout Button */}
        {user ? (
          <Button
            mode="contained"
            style={styles.loginoutButtonBody}
            onPress={signout}
            contentStyle={styles.logoutButtonContent}
            icon="logout"
          >
            <AirCarerText variant="button">{i18n.t("logout")}</AirCarerText>
          </Button>
        ) : (
          <Button
            mode="contained"
            style={styles.loginoutButtonBody}
            onPress={signin}
            contentStyle={styles.loginButtonContent}
            icon="login"
          >
            <AirCarerText variant="button">{i18n.t("login")}</AirCarerText>
          </Button>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.contrastText,
  },
  profileSection: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 80,
    flexDirection: "row",
    alignItems: "flex-start",
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
  },
  earningMoneyTitle: {
    marginTop: 30,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIcon: {
    marginRight: 12,
    margin: 0,
  },
  menuText: {
    flex: 1,
  },
  button: {
    borderRadius: theme.rouded.large,
  },
  editButtonContent: {
    justifyContent: "center",
  },
  loginoutButtonBody: {
    marginVertical: 20,
    borderRadius: theme.rouded.large,
    marginHorizontal: 5,
  },
  loginButtonContent: {
    justifyContent: "center",
  },
  logoutButtonContent: {
    justifyContent: "center",
    backgroundColor: theme.colors.secondary,
  },
});

export default AccountScreen;