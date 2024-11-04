import AirCarerText from "@app/constants/AirCarerText";
import theme from "@app/constants/theme";
import { i18n } from "@app/locales/i18n";
import { useCallback, useState } from "react";
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Button, TextInput } from "react-native-paper";


const CreateProfile = (props: any) => {
    const { navigation } = props;

    const [purpose, setPurpose] = useState<String>("getThingsDone");
    const [userType, setUserType] = useState<String>("individual");


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.expectedPricingContainer}>
         
            <TextInput
                mode='outlined'
                style={styles.input}
                label={i18n.t('signupTab.firstName')}
                outlineStyle={{ borderRadius: theme.rouded.small, borderWidth: 2.5 }}
            />

            <TextInput
                mode='outlined'
                style={styles.input}
                label={i18n.t('signupTab.lastName')}
                outlineStyle={{ borderRadius: theme.rouded.small, borderWidth: 2.5 }}
            />

            <TextInput
                mode='outlined'
                style={styles.input}
                label={i18n.t('signupTab.homeSuburb')}
                outlineStyle={{ borderRadius: theme.rouded.small, borderWidth: 2.5 }}
            />

            <AirCarerText>{i18n.t('signupTab.mainGoal')}</AirCarerText>

            <View style={styles.flexRow}>
     
            <Button
                contentStyle={styles.flexColumn}
                icon="checkbox-marked-circle-outline" mode="outlined" 
                style={[styles.buttonTile, "getThingsDone" === purpose && styles.buttonTilePressed]} 
                labelStyle={[styles.fontStyles]}
                onPress={() => {setPurpose("getThingsDone")}}>
         
                    <View style={{}}>
                        <AirCarerText style={{ textAlign: "center"}}>
                        {i18n.t('signupTab.getThingsDone')}
                        </AirCarerText>
                    </View>
            
            </Button>

            <Button
                contentStyle={styles.flexColumn}
                icon="currency-usd" mode="outlined" 
                style={[styles.buttonTile, "earnMoney" === purpose && styles.buttonTilePressed]} 
                labelStyle={styles.fontStyles}
                onPress={() => {setPurpose("earnMoney")}}>
 
                    <View>
                        <AirCarerText style={{height: 42}}>
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
                labelStyle={[styles.fontStyles ]}
                onPress={() => {setUserType('individual')}}>
                     <View>
                        <AirCarerText>
                        {i18n.t('signupTab.individual')}
                        </AirCarerText>
                    </View>
             </Button>
        
            <Button
                contentStyle={styles.flexColumn}
                icon="account-tie-outline" mode="outlined" 
                style={[styles.buttonTile, "business" === userType && styles.buttonTilePressed]} 
                labelStyle={[styles.fontStyles ]}
                onPress={() => {setUserType('business')}}>
                     <View>
                        <AirCarerText >
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
        padding: 6,
        paddingTop: 16,
        
      },
      buttonTile: {
        flexGrow: 1,
        margin: 6,
        width: 1,
      },
      wrappedViewText:{
    
      },
      buttonTilePressed: {
        backgroundColor: theme.colors.secondaryContainer,
      },
      fontStyles: {
        fontWeight: '500',
        fontSize: 24,
      },
    flexRow: {
        flex: 1,  
        flexDirection: 'row',
        flexWrap: 'nowrap',
      },
    largeChip:{
        borderColor: theme.colors.primaryContainer,
        borderWidth: 2,
        backgroundColor: theme.colors.paper,
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