import React, { useState, useLayoutEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const SpecialtiesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [specialties, setSpecialties] = useState(route.params?.specialties || []);
  const [specialtyInput, setSpecialtyInput] = useState('');

  const addSpecialty = () => {
    if (specialtyInput.trim() && !specialties.includes(specialtyInput.trim())) {
      setSpecialties((prev) => [...prev, specialtyInput.trim()]);
      setSpecialtyInput('');
    }
  };

  const removeSpecialty = (item) => {
    setSpecialties(specialties.filter((entry) => entry !== item));
  };

  const saveChanges = () => {
    navigation.navigate('SkillsSettings', { updatedSpecialties: specialties });
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
  }, [navigation, specialties]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your area of expertise"
        placeholderTextColor="#000"
        value={specialtyInput}
        onChangeText={setSpecialtyInput}
        onSubmitEditing={addSpecialty}
      />

      <FlatList
        data={specialties}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.text}>{item}</Text>
            <TouchableOpacity onPress={() => removeSpecialty(item)}>
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

export default SpecialtiesScreen;