import AirCarerText from "@app/constants/AirCarerText";
import theme from "@app/constants/theme";
import { useSnackbar } from "@app/contexts/snackbar.context";
import { i18n } from "@app/locales/i18n";
import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Button, TextInput } from "react-native-paper";


const CreateProfile = (props: any) => {
    const { navigation } = props;

    const [purpose, setPurpose] = useState<string>("getThingsDone");
    const [userType, setUserType] = useState<string>("individual");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [suburb, setSuburb] = useState<string>("");
    const [disableNext, setDisableNext] = useState<boolean>(true);
    const { info, error, success } = useSnackbar();

    const validate = useCallback(() => {
        const postCode = parseInt(suburb ?? '0');
        if (firstName === "" || lastName === "" || isNaN(postCode) || postCode >= 4000 || postCode < 3000) {
            setDisableNext(true);
        } else {
            setDisableNext(false);
        }
    }, [firstName, lastName, suburb]);

    useEffect(() => {
        validate();
    }, [firstName, lastName, suburb]);

    const onChangeSuburb = useCallback((text: string) => {
        setSuburb(text);
        if (text.length < 4) {
            return;
        }
        const postCode = parseInt(text);
        if (isNaN(postCode) || postCode >= 4000 || postCode < 3000) {
            error(i18n.t('signupTab.noService'));
            return;
        }

    }, []);

    const next = () => {

        navigation.navigate('signup/pricing');
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.expectedPricingContainer}>

                <TextInput
                    mode='outlined'
                    style={styles.input}
                    label={i18n.t('signupTab.firstName')}
                    onChangeText={(text) => setFirstName(text)}
                    outlineStyle={{ borderRadius: theme.rouded.small, borderWidth: 2.5 }}
                />

                <TextInput
                    mode='outlined'
                    style={styles.input}
                    label={i18n.t('signupTab.lastName')}
                    onChangeText={(text) => setLastName(text)}
                    outlineStyle={{ borderRadius: theme.rouded.small, borderWidth: 2.5 }}
                />

                <TextInput
                    mode='outlined'
                    style={styles.input}
                    label={i18n.t('signupTab.servicingSuburb')}
                    placeholder="3000"
                    keyboardType="numeric"
                    maxLength={4}
                    onChangeText={onChangeSuburb}
                    outlineStyle={{ borderRadius: theme.rouded.small, borderWidth: 2.5 }}
                />

                <AirCarerText>{i18n.t('signupTab.mainGoal')}</AirCarerText>

                <View style={styles.flexRow}>

                    <Button
                        contentStyle={styles.flexColumn}
                        icon="checkbox-marked-circle-outline" mode="outlined"
                        style={[styles.buttonTile, "getThingsDone" === purpose && styles.buttonTilePressed]}
                        labelStyle={[styles.fontStyles]}
                        onPress={() => { setPurpose("getThingsDone") }}>

                        <View style={{ width: 140 }}>
                            <AirCarerText style={{ marginLeft: -14 }}>
                                {i18n.t('signupTab.getThingsDone')}
                            </AirCarerText>
                        </View>

                    </Button>

                    <Button
                        contentStyle={styles.flexColumn}
                        icon="currency-usd" mode="outlined"
                        style={[styles.buttonTile, "earnMoney" === purpose && styles.buttonTilePressed]}
                        labelStyle={styles.fontStyles}
                        onPress={() => { setPurpose("earnMoney") }}>

                        <View style={{ width: 140 }}>
                            <AirCarerText style={{ marginLeft: 4 }}>
                                {i18n.t('signupTab.earnMoney')}
                            </AirCarerText>
                        </View>
                    </Button>
                </View>
                <AirCarerText>{i18n.t('signupTab.areYouIndiOrBiz')}</AirCarerText>


                <View style={styles.flexRow}>
                    <Button
                        contentStyle={styles.flexColumn}
                        icon="account-outline" mode="outlined"
                        style={[styles.buttonTile, "individual" === userType && styles.buttonTilePressed]}
                        labelStyle={[styles.fontStyles]}
                        onPress={() => { setUserType('individual') }}>

                        <View style={{ width: 140 }}>
                            <AirCarerText style={{ marginLeft: 10 }}>
                                {i18n.t('signupTab.individual')}
                            </AirCarerText>
                        </View>
                    </Button>

                    <Button
                        contentStyle={styles.flexColumn}
                        icon="account-tie-outline" mode="outlined"
                        style={[styles.buttonTile, "business" === userType && styles.buttonTilePressed]}
                        labelStyle={[styles.fontStyles]}
                        onPress={() => { setUserType('business') }}>
                        <View style={{ width: 140 }}>
                            <AirCarerText style={{ marginLeft: 12 }}>
                                {i18n.t('signupTab.business')}
                            </AirCarerText>
                        </View>
                    </Button>
                </View>
                <AirCarerText>{i18n.t('signupTab.abn')}</AirCarerText>
                <TextInput
                    mode='outlined'
                    style={styles.input}
                    placeholder={'ABN'}
                    outlineStyle={{ borderRadius: theme.rouded.small, borderWidth: 2.5 }}
                />
                <Button mode='contained' style={styles.nextButton} onPress={next} disabled={disableNext}>
                    <AirCarerText variant='button' >{i18n.t('next')}</AirCarerText>
                </Button>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    flexColumn: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        padding: 6,
        paddingTop: 16

    },
    buttonTile: {
        flexGrow: 1,
        margin: 4,
        width: 1
    },
    wrappedViewText: {

    },
    buttonTilePressed: {
        backgroundColor: theme.colors.secondaryContainer,
    },
    fontStyles: {
        fontSize: 24,
    },
    flexRow: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
    largeChip: {
        borderColor: theme.colors.primaryContainer,
        borderWidth: 2,
        backgroundColor: theme.colors.paper,
    },
    chipContainer: {
        justifyContent: 'flex-end',
    },
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
    },
    nextButton: {
        height: 50,
        width: '100%',
        marginTop: 10,
        justifyContent: 'center',
        // backgroundColor: theme.colors.primary,
        borderRadius: theme.rouded.large,
    }
});

export default CreateProfile;