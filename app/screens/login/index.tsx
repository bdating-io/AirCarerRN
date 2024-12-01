import React, { useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { i18n } from "@app/locales/i18n";
import { useAuth0 } from "react-native-auth0";
import theme from "@app/constants/theme";
import Welcome from "@assets/images/welcome.png";
import HalfScreenModal from "../../components/halfScreen.modal";
import { useLanguage } from "@app/contexts/language.context";
import AirCarerText from "@app/constants/AirCarerText";

export default function LoginScreen(props: any) {
  const { authorize, error } = useAuth0();
  const { navigation } = props;
  const { lang, changeLanguage } = useLanguage();

  useEffect(() => {
    console.log("Authentication error:", error);
  }, [error]);

  const signin = async () => {
    authorize({
      audience: "https://aircarer.au.auth0.com/api/v2/",
    })
      .then((user) => {
        if (user?.accessToken !== undefined) {
          navigation.navigate("signup/profile");
        }
      })
      .catch((error: any) => {
        console.log("Login error:", error);
      });
  };

  const testSignIN = () => {
    navigation.navigate("/");
  };

  const LanguageSelector = () => {
    return (
      <View style={styles.languageSelector}>
        <TouchableOpacity
          onPress={() => changeLanguage("en")}
          activeOpacity={0.8}
        >
          <AirCarerText
            style={[styles.languageText, lang === "en" && styles.selectedLanguageText]}
          >
            English
          </AirCarerText>
        </TouchableOpacity>
        <AirCarerText style={styles.languageSeparator}>|</AirCarerText>
        <TouchableOpacity
          onPress={() => changeLanguage("zh")}
          activeOpacity={0.8}
        >
          <AirCarerText
            style={[styles.languageText, lang === "zh" && styles.selectedLanguageText]}
          >
            中文
          </AirCarerText>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.imagesContainer}>
          <Image
            source={Welcome}
            style={styles.welcomeImage}
            resizeMode="contain"
          />
        </View>

        <HalfScreenModal heightPerc="25%" persist>
          <View style={styles.bottomContainer}>
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                buttonColor={theme.colors.secondary}
                textColor="white"
                style={styles.button}
                contentStyle={styles.buttonContent}
                onPress={testSignIN}
              >
                <AirCarerText variant="button">{i18n.t("login")}</AirCarerText>
              </Button>
              <Button
                mode="contained"
                buttonColor={theme.colors.primary}
                textColor="white"
                style={styles.button}
                contentStyle={styles.buttonContent}
                onPress={signin}
              >
                <AirCarerText variant="button">{i18n.t("signup")}</AirCarerText>
              </Button>
            </View>
            <LanguageSelector />
          </View>
        </HalfScreenModal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.scrim,
  },
  searchContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  imagesContainer: {
    marginTop: 20,
    width: "100%",
  },
  welcomeImage: {
    width: "100%",
    height: 500,
    borderRadius: 10,
    alignSelf: "center",
  },
  bottomContainer: {
    backgroundColor: "white",
    width: "100%",
    height: 100,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: theme.rouded.large,
  },
  buttonContent: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  languageSelector: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  languageText: {
    fontSize: 14,
    color: theme.colors.primary,
    marginHorizontal: 5,
  },
  selectedLanguageText: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  languageSeparator: {
    fontSize: 14,
    color: theme.colors.primary,
    marginHorizontal: 5,
    textAlign: "center",
  },
});