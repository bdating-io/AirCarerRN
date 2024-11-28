import { useAxios } from "@app/hooks/useAxios";
import { i18n } from "@app/locales/i18n";
import { aircarerSlice } from "@app/slices/aircarer.slice";
import { useDispatch } from "@app/store";
import { RootStackParamList } from "@app/types/common.type";
import React from "react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { Credentials, useAuth0 } from "react-native-auth0";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useSnackbar } from "./snackbar.context";


interface AuthContextProps {
  logged_user: any;
  signin: () => void;
  signout: () => void;
  updateProfile: (profile: any) => void;
}
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user, isLoading, getCredentials, authorize, clearSession } = useAuth0();
  const [logged_user, setLoggedUser] = useState<any>(null);
  const dispatch = useDispatch();
  const { get } = useAxios();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { error } = useSnackbar();

  useEffect(() => {
    console.log("isLoading", isLoading);
    if (!isLoading && !user) {
      // navigation.navigate('login');
      // console.log('Not logged in, redirect to login');
    }

    if (user) {
      console.log("User", user);
      getCredentials()
        .then((credential: Credentials | undefined) => {
          dispatch(aircarerSlice.actions.setAccessToken(credential?.accessToken));
          console.log("credential", credential);
          get("/profile")
            .then((res: any) => {
              const profile = res;
              profile.nickname = profile.firstName;
              const aircarerUser = { ...user, ...profile };
              setLoggedUser(aircarerUser);
              console.log("Logged user", aircarerUser);
            })
            .catch((err) => {
              console.error("Error getting user:", err);
              if (err.status === 404) {
                error(i18n.t("noProfile"));
                navigation.navigate("signup/profile");
              }
            });
        })
        .catch((error) => {
          console.error("Error getting credentials:", error);
        });
    }

  }, [isLoading, user]);

  const signin = () => {
    authorize({
      audience: "https://aircarer.au.auth0.com/api/v2/",
    }).catch((error: any) => {
      console.log(error);
    });
  };

  const signout = () => {
    clearSession().then(() => {
      setLoggedUser(null);
    });
  };

  const updateProfile = (profile: any) => {
    setLoggedUser(profile);
  };

  return (
    <AuthContext.Provider value={{ logged_user, signin, signout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}


export const useAirCarerAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAirCarerAuth must be used within a AuthContextProvider');
  }
  return context;
};