import React, { useState, useLayoutEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSkills } from '@app/contexts/SkillsContext';
import { i18n } from '@app/locales/i18n';

const LanguagesScreen = () => {
  const navigation = useNavigation();
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
    updateSkills("languages", languages);
    navigation.navigate('SkillsSettings');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={saveChanges} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#000" />
          <Text style={styles.backText}>{i18n.t("common.back")}</Text>
        </TouchableOpacity>
      ),
      title: i18n.t("languagesScreen.title")
    });
  }, [navigation, languages]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={i18n.t("languagesScreen.placeholder")}
        placeholderTextColor="#000"
        value={languageInput}
        onChangeText={setLanguageInput}
        onSubmitEditing={addLanguage}
      />
      <FlatList
        data={languages}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.languageRow}>
            <Text style={styles.languageText}>{item}</Text>
            <TouchableOpacity onPress={() => removeLanguage(item)}>
              <Text style={styles.removeButton}>✖</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
        <Text style={styles.saveButtonText}>{i18n.t("languagesScreen.saveButton")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 10, borderRadius: 5, marginBottom: 20, color: '#000' },
  languageRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  languageText: { fontSize: 16, color: '#333' },
  removeButton: { fontSize: 18, color: '#999' },
  saveButton: { marginTop: 20, backgroundColor: '#007bff', paddingVertical: 10, borderRadius: 5, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  backButton: { flexDirection: 'row', alignItems: 'center', marginLeft: 5 },
  backText: { fontSize: 18, color: '#000' }
});

export default LanguagesScreen;