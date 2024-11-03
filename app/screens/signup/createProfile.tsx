import AirCarerText from "@app/constants/AirCarerText";
import theme from "@app/constants/theme";
import { i18n } from "@app/locales/i18n";
import { useCallback, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, TextInput } from "react-native-paper";


const CreateProfile = (props: any) => {
    const { navigation } = props;

    const [purpose, setPurpose] = useState<String>("getThingsDone");
    const [userType, setUserType] = useState<String>("individual");


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.expectedPricingContainer}>
         
            <AirCarerText variant="bold">{i18n.t('signupTab.firstName')}</AirCarerText>
            <TextInput
                mode='outlined'
                style={styles.input}
                placeholder={i18n.t('signupTab.firstName')}
                outlineStyle={{ borderRadius: theme.rouded.small, borderWidth: 2.5 }}
            />

            <AirCarerText variant="bold">{i18n.t('signupTab.lastName')}</AirCarerText>
            <TextInput
                mode='outlined'
                style={styles.input}
                placeholder={i18n.t('signupTab.lastName')}
                outlineStyle={{ borderRadius: theme.rouded.small, borderWidth: 2.5 }}
            />

            <AirCarerText variant="bold">{i18n.t('signupTab.homeSuburb')}</AirCarerText>
            <TextInput
                mode='outlined'
                style={styles.input}
                placeholder={i18n.t('signupTab.homeSuburb')}
                outlineStyle={{ borderRadius: theme.rouded.small, borderWidth: 2.5 }}
            />

            <AirCarerText variant="bold">{i18n.t('signupTab.mainGoal')}</AirCarerText>

            <View style={styles.flexRow}>
     
            <Button
                contentStyle={styles.flexColumn}
                icon="checkbox-marked-circle-outline" mode="outlined" 
                style={[styles.buttonTile, "getThingsDone" === purpose && styles.buttonTilePressed]} 
                labelStyle={[styles.fontStyles, theme.isV3 && styles.md3FontStyles]}
                onPress={() => {setPurpose("getThingsDone")}}>
                {i18n.t('signupTab.getThingsDone')}
            </Button>
            <Button
                contentStyle={styles.flexColumn}
                icon="currency-usd" mode="outlined" 
                style={[styles.buttonTile, "earnMoney" === purpose && styles.buttonTilePressed]} 
                labelStyle={[styles.fontStyles, theme.isV3 && styles.md3FontStyles]}
                onPress={() => {setPurpose("earnMoney")}}>
                {i18n.t('signupTab.earnMoney')}
            </Button>
            </View>
            <AirCarerText variant="bold">{i18n.t('signupTab.areYouIndiOrBiz')}</AirCarerText>


            <View style={styles.flexRow}> 
            <Button
                contentStyle={styles.flexColumn}
                icon="account-outline" mode="outlined" 
                style={[styles.buttonTile, "individual" === userType && styles.buttonTilePressed]} 
                labelStyle={[styles.fontStyles, theme.isV3 && styles.md3FontStyles]}
                onPress={() => {setUserType('individual')}}>
                {i18n.t('signupTab.individual')}
            </Button>
            <Button
                contentStyle={styles.flexColumn}
                icon="account-tie-outline" mode="outlined" 
                style={[styles.buttonTile, "business" === userType && styles.buttonTilePressed]} 
                labelStyle={[styles.fontStyles, theme.isV3 && styles.md3FontStyles]}
                onPress={() => {setUserType('business')}}>
                {i18n.t('signupTab.business')}
            </Button>
            </View>
            <AirCarerText variant="bold">{i18n.t('signupTab.abn')}</AirCarerText>
            <TextInput
                mode='outlined'
                style={styles.input}
                placeholder={'ABN'}
                outlineStyle={{ borderRadius: theme.rouded.small, borderWidth: 2.5 }}
            />

            <Button mode='contained' style={styles.nextButton}  onPress={()=>{}}>
                <AirCarerText variant='button'>{i18n.t('next')}</AirCarerText>
            </Button>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    flexColumn: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        padding: 10,
        paddingTop: 16
      },
      buttonTile: {
        margin: 10,
      },
      buttonTilePressed: {
        backgroundColor: theme.colors.secondaryContainer,
      },
      md3FontStyles: {
        lineHeight: 22,
      },
      fontStyles: {
        fontWeight: '500',
        fontSize: 20,
      },
    flexRow: {
        flex: 1,  
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
    largeChip:{
        borderColor: theme.colors.primaryContainer,
        borderWidth: 2,
        backgroundColor: theme.colors.paper,
        // marginVertical: 30,
        // marginHorizontal: 4
    },
    chipContainer:{
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

export default CreateProfile;