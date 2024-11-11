import AirCarerText from "@app/constants/AirCarerText";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from "react-native-paper";
import { i18n } from "@app/locales/i18n";
import { useAuth0 } from "react-native-auth0";
import { useEffect, useState } from "react";
import theme from "@app/constants/theme";
import Welcome from "@assets/images/welcome.png";
import HalfScreenModal from "../../components/halfScreen.modal";

export default function LoginScreen(props: any) {
  const { authorize, error } = useAuth0();
  const { navigation } = props;

  useEffect(() => {
    console.log(error);
  }, [error]);

  const signin = async () => {
    authorize({
      audience: "https://aircarer.au.auth0.com/api/v2/",
    })
    .then((user) => {
      if (user?.accessToken !== undefined) {
        // if user has registered, navigate to index
        // navigation.navigate("/");
        // if user has not registered, navigate to signup
        navigation.navigate("signup/profile")
      }
    })
    .catch((error: any) => {
      console.log(error);
    });
  };

  //test only，to index
  const testSignIN = () => {
    navigation.navigate("/");
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

        <HalfScreenModal heightPerc="20%" persist>
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
            <AirCarerText style={styles.termsText}>
              {i18n.t("termsAndConditions")}
            </AirCarerText>
          </View>
        </HalfScreenModal>
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
    width: "100%",
  },
  searchContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  welcomeImage: {
    width: "100%",
    height: 500,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    alignSelf: "center",
  },
  bottomContainer: {
    backgroundColor: "white",
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: theme.rouded.large,
  },
  buttonContent: {
    height: 60,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
  },
  termsText: {
    color: theme.colors.contrastText,
    fontSize: 12,
    textAlign: "center",
  },
});
