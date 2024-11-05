
import AirCarerText from '@app/constants/AirCarerText';
import theme from '@app/constants/theme';
import { useFontSize } from '@app/contexts/font.context';
import { useLanguage } from '@app/contexts/language.context';
import { i18n } from '@app/locales/i18n';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

const FontSizeControls: React.FC = () => {
  const { fontSize, changeFontSize } = useFontSize();

  return (
    <View>
      <AirCarerText>{i18n.t("accountTab.currentFont")} {fontSize}</AirCarerText>
      <View style={styles.buttonGroup}>
        <Button icon="plus" mode="contained" onPress={() => changeFontSize(fontSize + 2)} style={styles.button}>
          <AirCarerText variant="button">increase</AirCarerText>
        </Button>
        <Button icon="minus" mode="contained" onPress={() => changeFontSize(fontSize - 2)} style={styles.button}>
          <AirCarerText variant="button">decrease</AirCarerText>
        </Button>
      </View>
    </View>
  );
};

const LanguageControls = () => {
  const { lang, changeLanguage } = useLanguage();
  return (
    <View style={styles.buttonGroup}>
      <Button mode="contained" onPress={() => changeLanguage("zh")} style={[styles.button, lang === 'zh' && styles.selectedButton]}>
        <AirCarerText variant="button">中文</AirCarerText>
      </Button>
      <Button mode="contained" onPress={() => changeLanguage("en")} style={[styles.button, lang === 'en' && styles.selectedButton]}>
        <AirCarerText variant="button">English</AirCarerText>
      </Button>
    </View>
  );
}

const SettingItem = (props: any) => {
  const { title, children } = props;
  return (
    <View style={styles.settingItem}>
      <AirCarerText variant='h2'>{title}</AirCarerText>
      {children}
    </View>
  );
}

const AppSetting = () => {
  const { lang, changeLanguage } = useLanguage();
  return (
    <ScrollView style={styles.controlsSection}>
      <SettingItem title={i18n.t("accountTab.fontSize")}>
        <FontSizeControls />
      </SettingItem>
      <SettingItem title={i18n.t("accountTab.language")}>
        <LanguageControls />
      </SettingItem>
    </ScrollView>
  )
}


const styles = StyleSheet.create({

  controlsSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: theme.colors.contrastText,
  },
  buttonGroup: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: 'space-around',
    gap: 10
  },
  settingItem: {
    paddingVertical: 20,
    gap: 10,
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
  },
  button: {
    borderRadius: theme.rouded.large,
    flex: 1,
  },
  selectedButton: {
    backgroundColor: theme.colors.secondary
  }
});

export default AppSetting;