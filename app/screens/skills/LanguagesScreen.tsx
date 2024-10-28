import React, { useState, useLayoutEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const LanguagesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [languages, setLanguages] = useState(route.params?.languages || []);
  const [languageInput, setLanguageInput] = useState('');

  const addLanguage = () => {
    if (languageInput.trim() && !languages.includes(languageInput.trim())) {
      setLanguages((prev) => [...prev, languageInput.trim()]);
      setLanguageInput('');
    }
  };

  const removeLanguage = (language) => {
    setLanguages(languages.filter((item) => item !== language));
  };

  const saveChanges = () => {
    navigation.navigate('SkillsSettings', { updatedLanguages: languages });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={saveChanges} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#000" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, languages]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter a language (e.g., English)"
        placeholderTextColor="#000"  // Set placeholder text color to black
        value={languageInput}
        onChangeText={setLanguageInput}
        onSubmitEditing={addLanguage}
      />

      {/* Language List */}
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

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
        <Text style={styles.saveButtonText}>Save settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 20,
    color: '#000',  // Ensure main text input is also black
  },
  languageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  languageText: {
    fontSize: 16,
    color: '#333',
  },
  removeButton: {
    fontSize: 18,
    color: '#999',
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  backText: {
    fontSize: 18,
    color: '#000',
  },
});

export default LanguagesScreen;