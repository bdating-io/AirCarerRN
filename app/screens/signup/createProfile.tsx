import AirCarerText from "@app/constants/AirCarerText";
import theme from "@app/constants/theme";
import { useSnackbar } from "@app/contexts/snackbar.context";
import { i18n } from "@app/locales/i18n";
import { aircarerSlice } from "@app/slices/aircarer.slice";
import { RootState } from "@app/store";
import { isEmailValid } from "@app/utils/email.util";
import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";


const CreateProfile = (props: any) => {
    const { navigation } = props;

    const [purpose, setPurpose] = useState<string>("getThingsDone");
    // const [userType, setUserType] = useState<string>("individual");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [suburb, setSuburb] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [abn, setAbn] = useState<string>("");
    const [disableNext, setDisableNext] = useState<boolean>(true);
    const { info, error, success } = useSnackbar();
    const dispatch = useDispatch();
    const { logged_user } = useSelector((state: RootState) => state.aircarer);
    
    const validate = useCallback(() => {
        const postCode = parseInt(suburb ?? '0');
        if (firstName === "" || lastName === "" || isNaN(postCode) || postCode >= 4000 || postCode < 3000 || !isEmailValid(email)) {
            setDisableNext(true);
        } else {
            setDisableNext(false);
        }
    }, [firstName, lastName, suburb, email]);

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

    const onChangeEmail = useCallback((text: string) => {
        setEmail(text);
        if (!isEmailValid(text)) {
            error(i18n.t('signupTab.invalidEmail'));
            return false;
        } 
        return true;
    }, []);

    const next = () => {
        dispatch(aircarerSlice.actions.setLoggedUser({
            ...logged_user,
            firstName: firstName,
            lastName: lastName,
            suburb: suburb,
            email: email,
            purpose: purpose,
        }))

        if (purpose === 'earnMoney') {
            navigation.navigate('signup/pricing');
        } else {
            navigation.navigate('property/add');
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.expectedPricingContainer}>

                <TextInput
                    mode='outlined'
                    style={styles.input}
                    label={i18n.t('signupTab.firstName')}
                    onChangeText={(text) => setFirstName(text)}
                    outlineStyle={{ borderRadius: theme.rouded.small, borderWidth: 2 }}
                />

                <TextInput
                    mode='outlined'
                    style={styles.input}
                    label={i18n.t('signupTab.lastName')}
                    onChangeText={(text) => setLastName(text)}
                    outlineStyle={{ borderRadius: theme.rouded.small, borderWidth: 2 }}
                />

                <TextInput
                    mode='outlined'
                    style={styles.input}
                    label={i18n.t('signupTab.servicingSuburb')}
                    placeholder="3000"
                    keyboardType="numeric"
                    maxLength={4}
                    onChangeText={onChangeSuburb}
                    outlineStyle={{ borderRadius: theme.rouded.small, borderWidth: 2 }}
                />

                <TextInput
                    mode='outlined'
                    style={styles.input}
                    label={i18n.t('signupTab.email')}
                    onChangeText={(text) => onChangeEmail(text)}
                    outlineStyle={{ borderRadius: theme.rouded.small, borderWidth: 2 }}
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
                {/* <AirCarerText>{i18n.t('signupTab.areYouIndiOrBiz')}</AirCarerText>


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
                </View> */}
                <AirCarerText>{i18n.t('signupTab.abn')}</AirCarerText>
                <TextInput
                    mode='outlined'
                    style={styles.input}
                    placeholder={'ABN'}
                    onChangeText={(text) => setAbn(text)}
                    outlineStyle={{ borderRadius: theme.rouded.small, borderWidth: 2 }}
                />
                <Button mode='contained' style={styles.nextButton} onPress={next} disabled={disableNext}>
                    <AirCarerText variant='button' >{i18n.t('next')}</AirCarerText>
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
        minHeight: '100%',
    },
    flexColumn: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        padding: 6,
        paddingTop: 16

    },
    buttonTile: {
        flexGrow: 1,
        margin: 4,
        width: 1,
        borderRadius: theme.rouded.small,
        borderWidth: 2
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
        // flex: 1,
        flexDirection: 'row',
        // flexWrap: 'nowrap',
    },
    largeChip: {
        borderColor: theme.colors.primaryContainer,
        borderWidth: 2,
        backgroundColor: theme.colors.primaryContainer,
    },
    chipContainer: {
        justifyContent: 'flex-end',
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