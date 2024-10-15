import AirCarerText from "@app/constants/AirCarerText"
import { View } from "react-native"
import { Button } from "react-native-paper"

export default function MyTaskScreen(props: any) {
    const { navigation } = props
    return (
        <View>
            <AirCarerText>My Task</AirCarerText>
            <Button onPress={() => navigation.navigate("my-task/detail")}>
                <AirCarerText variant="button">Go to My Task Detail</AirCarerText>
            </Button>
        </View>
    )
}