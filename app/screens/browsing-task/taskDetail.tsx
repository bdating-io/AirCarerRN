import AirCarerText from "@app/constants/AirCarerText";
import { View } from "react-native";
import { i18n } from "@app/locales/i18n";

export default function TaskDetailScreen() {
    return (
        <View>
            <AirCarerText>{i18n.t("taskDetail.header")}</AirCarerText>
        </View>
    );
}