import AirCarerText from "@app/constants/AirCarerText";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { i18n } from "@app/locales/i18n";

export default function MyTaskDetailScreen(props: any) {
    const { navigation } = props;
    return (
        <View>
            <AirCarerText>{i18n.t("myTaskDetail.header")}</AirCarerText>
            <Button onPress={() => navigation.navigate('/browsing-task/task-detail')}>
                {i18n.t("myTaskDetail.goToTaskDetail")}
            </Button>
        </View>
    );
}