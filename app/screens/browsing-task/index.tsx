import AirCarerText from "@app/constants/AirCarerText";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { useAxios } from "@app/hooks/useAxios";

export default function BrowsingTaskScreen({ navigation }: any) {
    const { get } = useAxios();       

    const testApi = async () => {
        get('/profile')
        .then((response) => {
            console.log("===", response)
        })
        .catch((error) => {
            console.error("+++", error);
        }
        );
    }

    return (
        <View style={{ gap: 10, padding: 20 }}>
            <AirCarerText>Browsing Task.</AirCarerText>
            <Button mode="contained" onPress={() => navigation.navigate("signup/profile")}>
                <AirCarerText variant="button">Test signup</AirCarerText>
            </Button>
            <Button mode="contained" onPress={() => navigation.navigate("property/list")}>
                <AirCarerText variant="button">Test Property List</AirCarerText>
            </Button>
            <Button mode="contained" onPress={() => navigation.navigate("browsing-task/task-conclusion")}>
                <AirCarerText variant="button">Test Tasks Conclusion</AirCarerText>
            </Button>
            <Button mode="contained" onPress={() => navigation.navigate("browsing-task/task-list")}>
                <AirCarerText variant="button">Test browse list</AirCarerText>
            </Button><Button mode="contained" onPress={testApi}>
                <AirCarerText variant="button">Test get profile</AirCarerText>
            </Button>
        </View>
    )
}