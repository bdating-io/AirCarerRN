import AirCarerText from "@app/constants/AirCarerText";
import { View } from "react-native";
import { Button } from "react-native-paper";

export default function MyTaskDetailScreen(props: any) {
    const { navigation } = props;
    return (
        <View>
            <AirCarerText>My Task Detail</AirCarerText>
            <Button onPress={() => navigation.navigate('/browsing-task/task-detail')}>Go to task detail</Button>
        </View>
    )
}