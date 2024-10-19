import AirCarerText from "@app/constants/AirCarerText";
import theme from "@app/constants/theme";
import { i18n } from "@app/locales/i18n";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, TextInput } from "react-native-paper";

const SignupServicing = (props: any) => {
    const { navigation } = props;
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View>
                <AirCarerText variant="h1" style={styles.expectedPricingText}>{i18n.t('signupTab.expectedPricing')}</AirCarerText>
                <TextInput
                    // label={i18n.t('publishTab.taskTitle')}
                    mode='outlined'
                    keyboardType="numeric"
                    inputMode="numeric"
                    style={styles.input}
                    placeholder={i18n.t('publishTab.taskTitle')}
                    outlineStyle={{ borderRadius: theme.rouded.small, borderWidth: 2.5 }}
                    right={<TextInput.Affix text="/Hour" textStyle={{ fontWeight: '900', color: theme.colors.primary }} />}
                />
            </View>
            <View>
                <AirCarerText variant="h1" style={styles.expectedPricingText}>{i18n.t('signupTab.servicingTime')}</AirCarerText>
                <TextInput
                    // label={i18n.t('publishTab.taskTitle')}
                    mode='outlined'
                    keyboardType="numeric"
                    inputMode="numeric"
                    style={styles.input}
                    placeholder={i18n.t('publishTab.taskTitle')}
                    outlineStyle={{ borderRadius: theme.rouded.small, borderWidth: 2.5 }}
                    right={<TextInput.Affix text="/Hour" textStyle={{ fontWeight: '900', color: theme.colors.primary }} />}
                />
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    searchContainer: {
        flex: 1,
        alignItems: 'flex-start',
        borderRadius: 10,
        paddingTop: '30%',
    },
    expectedPricingText: {
        color: theme.colors.primary,
    },
    input: {
        width: '100%',
        marginVertical: 20,
    },
});

export default SignupServicing;