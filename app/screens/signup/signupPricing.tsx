import AirCarerText from "@app/constants/AirCarerText";
import theme from "@app/constants/theme";
import { i18n } from "@app/locales/i18n";
import { useCallback, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Card, TextInput } from "react-native-paper";

interface Pricing {
    id: number;
    type: string;
    pricing: number;
}

const SignupPricing = (props: any) => {
    const { navigation } = props;
    const getDefaultPricing = useCallback(() => {
       return [
        {
            id: 1,
            type: i18n.t('studio'),
            pricing: 30,
        },
        {
            id: 2,
            type: i18n.t('1b1b'),
            pricing: 40
        },
        {
            id: 3,
            type: i18n.t('2b1b'),
            pricing: 60
        },
        {
            id: 4,
            type: i18n.t('2b2b'),
            pricing: 80
        },
        {
            id: 5,
            type: i18n.t('3b2b'),
            pricing: 100
        }
    ];
    }, [i18n]);

    const [expectedPricing, setExpectedPricing] = useState<Pricing[]>(getDefaultPricing());

    const updatePricing = (id: number, pricing: number) => {
        const newPricing = expectedPricing.map((item: Pricing) => {
            if (item.id === id) {
                if (pricing < 0 || isNaN(pricing)) {
                    pricing = 0; 
                }
                return {
                    ...item,
                    pricing: pricing
                }
            }
            return item;
        });

        setExpectedPricing(newPricing);
    }

    const handleNext = () => {
        console.log(expectedPricing);
        navigation.navigate('signup/servicingHours');
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.expectedPricingContainer}>
                <AirCarerText variant="h1" style={styles.expectedPricingText}>{i18n.t('signupTab.expectedPricing')}</AirCarerText>
                <Card style={styles.expectedPricingExplain}>
                    <Card.Content>
                        <AirCarerText variant="default">{i18n.t('signupTab.expectedPricingExplain')}</AirCarerText>
                    </Card.Content>
                </Card>

                {expectedPricing.map((item: Pricing) => (
                    <View key={`pricing-container-${item.id}`} style={styles.pricingItemContainer}>
                        <AirCarerText key={`text-${item.id}`} variant="bold">{item.type}</AirCarerText>

                        <TextInput
                            key={`input-${item.id}`}
                            mode='outlined'
                            keyboardType="numeric"
                            inputMode="numeric"
                            onChange={(e) => {
                                updatePricing(item.id, parseFloat(e.nativeEvent.text))
                            }}
                            value={item.pricing.toString()}
                            style={styles.input}
                            placeholder={i18n.t('publishTab.taskTitle')}
                            outlineStyle={{ borderRadius: theme.rouded.small, borderWidth: 2.5 }}
                            left={<TextInput.Affix text="$" textStyle={{ fontWeight: '900', color: theme.colors.primary }} />}
                            // right={<TextInput.Affix text="/Hour" textStyle={{ fontWeight: '900', color: theme.colors.primary }} />}
                        />
                    </View>
                ))}

                <Button mode='contained' style={styles.nextButton}  onPress={handleNext}>
                    <AirCarerText variant='button'>{i18n.t('next')}</AirCarerText>
                </Button>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.paper,
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        gap: 15,
        paddingTop: 20,
        paddingBottom: 40,
    },
    expectedPricingContainer: {
        flex: 1,
        gap: 15,
        alignItems: 'flex-start',
    },
    pricingItemContainer: {
        width: '100%',
        gap: 10,
        alignItems: 'flex-start',
    },
    expectedPricingText: {
        color: theme.colors.primary,
    },
    expectedPricingExplain: {
        width: '100%',
    },
    input: {
        width: '100%',
        fontWeight: '900',
        
    },
    nextButton: {
        height: 50,
        width: '100%',
        marginTop: 10,
        justifyContent: 'center',
        backgroundColor: theme.colors.primary,
        borderRadius: theme.rouded.large,
    }
});

export default SignupPricing;