import { View, Text } from "react-native";
import theme from '@app/constants/theme';
import AirCarerText from "@app/constants/AirCarerText";

export default function PublishTaskScreen() {
    
    return (
        <View>
            <AirCarerText variant="h1" style={{color: theme.colors.primary}}>Primary: {theme.colors.primary}</AirCarerText>

            <AirCarerText variant="h1" style={{color: theme.colors.secondary}}>Secondary: {theme.colors.secondary}</AirCarerText>
        </View>
    )
}