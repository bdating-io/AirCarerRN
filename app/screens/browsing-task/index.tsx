import AirCarerText from "@app/constants/AirCarerText";
import { View } from "react-native";
import { Button } from "react-native-paper";

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
            <Button mode="contained" onPress={() => navigation.navigate("browsing-task/task-conclusion")}>
                <AirCarerText variant="button">Test Tasks Conclusion</AirCarerText>
            </Button>
        </View>
    )
}