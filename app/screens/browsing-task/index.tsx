import AirCarerText from "@app/constants/AirCarerText";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { i18n } from "@app/locales/i18n";

export default function BrowsingTaskScreen({navigation}: any) {
    return (
        <View>
            <AirCarerText>Browsing Task.</AirCarerText>
            <Button mode="contained" onPress={() => navigation.navigate("signup/pricing")}>
                <AirCarerText variant="button">Test signup</AirCarerText>
            </Button>
            <Button mode="contained" onPress={() => navigation.navigate("property/list")}>
                <AirCarerText variant="button">Test Property List</AirCarerText>
            </Button>
            <Button mode="contained" onPress={() => navigation.navigate("task/list")}>
                <AirCarerText variant="button">Test browse task</AirCarerText>
            </Button>
        </View>
    )
}