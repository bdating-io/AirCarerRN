import AirCarerText from "@app/constants/AirCarerText";
import { useFontSize } from "@app/contexts/font.context";
import { aircarerSlice } from "@app/slices/aircarer.slice";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { i18n } from "@app/locales/i18n";
import { useLanguage } from "@app/contexts/language.context";
import { useAuth0 } from "react-native-auth0";
import { useEffect } from "react";
import theme from "@app/constants/theme";
import Welcome from "@assets/images/welcome.png";

export default function LoginScreen() {
  const dirspatch = useDispatch();
  const { user, authorize, error, clearSession } = useAuth0();
  const { lang, changeLanguage } = useLanguage();

  useEffect(() => {
    console.log(error);
  }, [error]);
  const signin = async () => {
    await authorize();
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

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            buttonColor={theme.colors.secondary}
            textColor="white"
            style={styles.button}
            contentStyle={styles.buttonContent}
            onPress={signin}
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
        <AirCarerText style={styles.termsText}>
          {i18n.t("termsAndConditions")}
        </AirCarerText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.scrim,
    width:'100%'
  },
  searchContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  goodDayText: {
    color: theme.colors.contrastText,
  },
  slogan: {
    paddingTop: 20,
    color: theme.colors.contrastText,
    fontWeight: "900",
  },
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
    width:'100%'
  },
  newTaskButton: {
    justifyContent: "center",
    width: "100%",
    marginTop: 20,
    borderRadius: theme.rouded.large,
  },
  newTaskButtonContent: {
    height: 53,
  },
  welcomeImage: {
    width: '100%',
    height: 500,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: theme.rouded.large,
  },
  buttonContent: {
    height: 53,
    paddingVertical: 8,
  },
  termsText: {
    marginTop: 20,
    color: theme.colors.contrastText,
    fontSize: 12,
    textAlign: 'center',
  },
});
