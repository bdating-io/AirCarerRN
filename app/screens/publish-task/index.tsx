import theme from '@app/constants/theme';
import AirCarerText from "@app/constants/AirCarerText";
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { i18n } from '@app/locales/i18n';
import { Button, TextInput } from 'react-native-paper';


export default function PublishTaskScreen() {
    const { user } = useAuth0();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.searchContainer}>
                <AirCarerText variant='bold' style={styles.goodDayText}>{`${i18n.t('publishTab.goodday')}, ${user?.nickname}!`}</AirCarerText>
                <AirCarerText variant='h1' style={styles.slogen}>{i18n.t('publishTab.publishTaskSlogen')}</AirCarerText>

                <TextInput
                    // label={i18n.t('publishTab.taskTitle')}
                    mode='outlined'
                    style={styles.input}
                    placeholder={i18n.t('publishTab.taskTitle')}
                    outlineStyle={{ borderRadius: theme.rouded.large, borderWidth: 2.5}}
                />

                <Button mode='contained' buttonColor={theme.colors.secondary} 
                    textColor='white'
                    style={styles.newTaskButton} contentStyle={styles.newTaskButtonContent} onPress={() => Alert.alert('sss')}>
                    <AirCarerText variant='button'>{i18n.t('publishTab.getItDone')}</AirCarerText>
                </Button>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: theme.colors.scrim,
    },
    searchContainer: {
        flex: 1,
        alignItems: 'flex-start',
        borderRadius: 10,
        paddingTop: '30%',
    },
    goodDayText: {
        color: theme.colors.contrastText,
    },
    input: {
        width: '100%',
        marginVertical: 20,
    },
    slogen: {
        paddingTop: 20,
        color: theme.colors.contrastText,
        fontWeight: 900,
    },
    newTaskButton: {
        justifyContent: 'center',
        width: '100%',
        marginTop: 20,
        borderRadius: theme.rouded.large
    },
    newTaskButtonContent: {
        height: 53,
    }
});
