import React, { useState, useLayoutEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const EducationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [education, setEducation] = useState(route.params?.education || []);
  const [educationInput, setEducationInput] = useState('');

  const addEducation = () => {
    if (educationInput.trim() && !education.includes(educationInput.trim())) {
      setEducation((prev) => [...prev, educationInput.trim()]);
      setEducationInput('');
    }
  };

  const removeEducation = (item) => {
    setEducation(education.filter((entry) => entry !== item));
  };

  const saveChanges = () => {
    navigation.navigate('SkillsSettings', { updatedEducation: education });
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
  }, [navigation, education]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your educational background"
        placeholderTextColor="#000"
        value={educationInput}
        onChangeText={setEducationInput}
        onSubmitEditing={addEducation}
      />

      <FlatList
        data={education}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.text}>{item}</Text>
            <TouchableOpacity onPress={() => removeEducation(item)}>
              <Text style={styles.removeButton}>✖</Text>
            </TouchableOpacity>
          </View>
        )}
      />

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
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
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

export default EducationScreen;