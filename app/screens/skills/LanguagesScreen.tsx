import React, { useState, useLayoutEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useSkills } from '@app/contexts/SkillsContext';
import { i18n } from '@app/locales/i18n';
import AirCarerText from '@app/constants/AirCarerText';
import theme from '@app/constants/theme';

const LanguagesScreen = (props: any) => {
  const { navigation } = props;
  const { skills, updateSkills } = useSkills();
  const [languages, setLanguages] = useState<string[]>(skills.languages || []);
  const [languageInput, setLanguageInput] = useState('');

  const addLanguage = () => {
    if (languageInput.trim() && !languages.includes(languageInput.trim())) {
      setLanguages((prev) => [...prev, languageInput.trim()]);
      setLanguageInput('');
    }
  };

  const removeLanguage = (language: string) => {
    setLanguages(languages.filter((item) => item !== language));
  };

  const saveChanges = () => {
    updateSkills('languages', languages);
    navigation.goBack(); // Use goBack for consistent navigation behavior
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: i18n.t('languagesScreen.title'), // Use the default header title styling
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Input Field */}
      <TextInput
        mode="outlined"
        label={i18n.t('languagesScreen.placeholder')}
        value={languageInput}
        onChangeText={setLanguageInput}
        onSubmitEditing={addLanguage}
        style={styles.input}
        outlineColor={theme.colors.primary}
        activeOutlineColor={theme.colors.primary}
      />

      {/* List of Languages */}
      <FlatList
        data={languages}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.languageRow}>
            <AirCarerText variant="default" style={styles.languageText}>
              {item}
            </AirCarerText>
            <Button
              mode="text"
              onPress={() => removeLanguage(item)}
              contentStyle={styles.removeButtonContainer}
            >
              ✖
            </Button>
          </View>
        )}
      />

      {/* Save Button */}
      <View style={styles.saveButtonContainer}>
        <Button
          mode="contained"
          onPress={saveChanges}
          contentStyle={styles.saveButtonContent}
          style={styles.saveButton}
        >
          <AirCarerText variant="button" style={styles.saveButtonText}>
            {i18n.t('languagesScreen.saveButton')}
          </AirCarerText>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.paper,
  },
  input: {
    marginBottom: 20,
  },
  languageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  languageText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  removeButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.rouded.large, // Matches the design
  },
  saveButtonContent: {
    justifyContent: 'center',
  },
  saveButtonText: {
    color: theme.colors.paper,
    fontWeight: 'bold',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    marginLeft: 5,
    fontSize: 18,
    color: theme.colors.text,
  },
});

export default LanguagesScreen;