import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import AirCarerText from "@app/constants/AirCarerText";
import { useFontSize } from "@app/contexts/font.context";
import { useLanguage } from "@app/contexts/language.context";
import { useAuth0 } from "react-native-auth0";
import { useDispatch } from "react-redux";
import theme from "@app/constants/theme";
import { i18n } from "@app/locales/i18n";

const FontSizeControls: React.FC = () => {
  const { fontSize, changeFontSize } = useFontSize();

  return (
    <View style={styles.fontControlsContainer}>
      <AirCarerText>Current font size: {fontSize}</AirCarerText>
      <View style={styles.buttonGroup}>
        <Button
          icon="plus"
          mode="contained"
          onPress={() => changeFontSize(fontSize + 2)}
          style={styles.button}
        >
          <AirCarerText variant="button">increase</AirCarerText>
        </Button>
        <Button
          icon="minus"
          mode="contained"
          onPress={() => changeFontSize(fontSize - 2)}
          style={styles.button}
        >
          <AirCarerText variant="button">decrease</AirCarerText>
        </Button>
      </View>
    </View>
  );
};

const AccountScreen: React.FC = (props: any) => {
  const dispatch = useDispatch();
  const { user, authorize, error, clearSession } = useAuth0();
  const { lang, changeLanguage } = useLanguage();
  const { navigation } = props;

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

  const Edit = async () => {
    console.log("Edit on click");
  };

  const handlePublicProfile = () => {
    console.log("Public profile clicked");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar} />
        </View>
        <View style={styles.profileInfo}>
          <AirCarerText style={styles.username}>
            {user ? user.name : "No user"}
          </AirCarerText>
          <AirCarerText style={styles.location}>
            Melbourne VIC, Australia (Sample)
          </AirCarerText>
          <View style={styles.editContainer}>
            <TouchableOpacity onPress={handlePublicProfile}>
              <AirCarerText style={styles.publicProfile}>
                {i18n.t("accountTab.publicProfile")}
              </AirCarerText>
            </TouchableOpacity>
            <Button
              mode="contained"
              buttonColor={theme.colors.primary}
              textColor="white"
              style={styles.button}
              contentStyle={styles.editContainer}
              onPress={Edit}
            >
              <AirCarerText variant="button">{i18n.t("edit")}</AirCarerText>
            </Button>
          </View>
        </View>
      </View>

      <View style={styles.settingsSection}>
        <AirCarerText style={styles.sectionTitle}>
          ACCOUNT SETTINGS
        </AirCarerText>

        <View style={styles.menuItem}>
          <AirCarerText style={styles.menuText}>Payment options</AirCarerText>
        </View>

        <View style={styles.menuItem}>
          <AirCarerText style={styles.menuText}>
            Notification preferences
          </AirCarerText>
        </View>

        <View style={styles.menuItem}>
          <AirCarerText style={styles.menuText}>
            Account information
          </AirCarerText>
        </View>

        <AirCarerText style={styles.sectionTitle}>EARNING MONEY</AirCarerText>
        <View style={styles.menuItem}>
          <AirCarerText style={styles.menuText}>My dashboard</AirCarerText>
        </View>
      </View>

      <View style={styles.controlsSection}>
        <FontSizeControls />

        <View style={styles.languageControls}>
          <Button
            mode="contained"
            onPress={() => changeLanguage("zh")}
            style={styles.button}
          >
            <AirCarerText variant="button">ZH</AirCarerText>
          </Button>
          <Button
            mode="contained"
            onPress={() => changeLanguage("en")}
            style={styles.button}
          >
            <AirCarerText variant="button">EN</AirCarerText>
          </Button>
        </View>

        <View style={styles.authControls}>
          <AirCarerText variant="h2">User</AirCarerText>
          <AirCarerText>{user ? user.name : "No user"}</AirCarerText>

          <View style={styles.buttonGroup}>
            <Button mode="contained" onPress={signin} style={styles.button}>
              <AirCarerText variant="button">Login</AirCarerText>
            </Button>
            <Button mode="contained" onPress={signout} style={styles.button}>
              <AirCarerText variant="button">Log out</AirCarerText>
            </Button>
          </View>
        </View>
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
  profileSection: {
    backgroundColor: theme.colors.scrim,
    padding: 20,
    paddingVertical: 40,
    flexDirection: "row",
    alignItems: "flex-start",
    paddingBottom: 60,
    paddingRight: 15,
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  location: {
    color: theme.colors.contrastText,
    fontSize: 16,
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
    fontSize: 15,
    flex: 1,
    fontWeight: "bold",
  },
  editButton: {
    color: theme.colors.contrastText,
    paddingHorizontal: 12,
    paddingVertical: 0,
    backgroundColor: "transparent",
  },
  settingsSection: {
    padding: 20,
    backgroundColor: theme.colors.contrastText,
    borderRadius: theme.rouded.large,
  },
  sectionTitle: {
    color: "#666",
    fontSize: 12,
    marginBottom: 15,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuText: {
    fontSize: 16,
    color: "#333",
  },
  controlsSection: {
    padding: 20,
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
    marginRight: 10,
  },
});

export default AccountScreen;
