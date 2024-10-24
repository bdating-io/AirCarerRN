import AirCarerText from "@app/constants/AirCarerText";
import { useFontSize } from "@app/contexts/font.context";
import { aircarerSlice } from "@app/slices/aircarer.slice";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { i18n } from "@app/locales/i18n";
import { useLanguage } from "@app/contexts/language.context";
import { useAuth0 } from "react-native-auth0";
import { useEffect } from "react";

const FontSizeControls: React.FC = () => {
    const { fontSize, changeFontSize } = useFontSize();

    return (
        <View>
            <AirCarerText>Current font size: {fontSize}</AirCarerText>
            <Button icon="plus" mode="contained" onPress={() => changeFontSize(fontSize + 2)}>
                <AirCarerText variant="button">increase</AirCarerText>
            </Button>
            <Button icon="minus" mode="contained" onPress={() => changeFontSize(fontSize - 2)}>
                <AirCarerText variant="button">decrease</AirCarerText>
            </Button>
        </View>
    );
};

export default function AccountScreen() {
    const dispatch = useDispatch();
    const { user, authorize, error, clearSession } = useAuth0();
    const { lang, changeLanguage } = useLanguage();

    useEffect(() => {
        console.log(error)
    },[error])
    const signin = async () => {
        await authorize();
    };

    const signout = async  () => {
        await clearSession();
    }

    return (
        <View>
            <FontSizeControls />
            <AirCarerText variant="h1">{i18n.t('account')}</AirCarerText>
            <AirCarerText variant="h2">Subtitle</AirCarerText>
            <AirCarerText>Body</AirCarerText>

            <Button mode="contained" onPress={() => changeLanguage('zh')}>
                <AirCarerText variant="button">ZH</AirCarerText>
            </Button>
            <Button mode="contained" onPress={() => changeLanguage('en')}>
                <AirCarerText variant="button">EN</AirCarerText>
            </Button>

            <AirCarerText variant="h2">User</AirCarerText>
            <AirCarerText>{user ? user.name : 'No user'}</AirCarerText> 
            <Button mode="contained" onPress={signin}>
                <AirCarerText variant="button">Login</AirCarerText>
            </Button>
            <Button mode="contained" onPress={signout}>
                <AirCarerText variant="button">Log out</AirCarerText>
            </Button>
        </View>
    )
}