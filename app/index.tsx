import { Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';

import { store } from "@app/store";
import theme from "@app/constants/theme";
import Navigation from "@app/navigation";
import { FontSizeProvider } from "./contexts/font.context";
import { LanguageProvider } from "./contexts/language.context";
import config from "./config/config";
import { Auth0Provider } from 'react-native-auth0';


export default function Index() {
    return (
        <SafeAreaProvider>
            <ReduxProvider store={store}>
                <Auth0Provider domain={config.auth0Domain} clientId={config.auth0ClientId}>
                    <LanguageProvider>
                        <FontSizeProvider>
                            <PaperProvider theme={theme}>
                                <Navigation />
                            </PaperProvider>
                        </FontSizeProvider>
                    </LanguageProvider>
                </Auth0Provider>
            </ReduxProvider>
        </SafeAreaProvider>
    );
}
