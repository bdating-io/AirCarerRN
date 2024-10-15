import { Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';

import { store } from "@src/store";
import theme from "./app/constants/theme";

export default function App() {
    return (
        <SafeAreaProvider>
            <ReduxProvider store={store}>
                <PaperProvider theme={theme}>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text>hello world.</Text>
                    </View>
                </PaperProvider>
            </ReduxProvider>
        </SafeAreaProvider>
    );
}
