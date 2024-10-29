import React, { useState, useLayoutEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSkills } from '@app/contexts/SkillsContext';
import { i18n } from '@app/locales/i18n';

const WorkScreen = () => {
  const navigation = useNavigation();
  const { skills, updateSkills } = useSkills();

  const [work, setWork] = useState<string[]>(skills.work || []);
  const [workInput, setWorkInput] = useState('');

  const addWork = () => {
    if (workInput.trim() && !work.includes(workInput.trim())) {
      setWork((prev) => [...prev, workInput.trim()]);
      setWorkInput(''); // Reset input after adding
    }
  };

  const removeWork = (item: string) => {
    setWork(work.filter((entry) => entry !== item));
  };

  const saveChanges = () => {
    updateSkills("work", work); // Update context with new work list
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
      title: i18n.t("workScreen.title")
    });
  }, [navigation, work]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={i18n.t("workScreen.placeholder")}
        placeholderTextColor="#000"
        value={workInput}
        onChangeText={setWorkInput}
        onSubmitEditing={addWork}
      />

      <FlatList
        data={work}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.text}>{item}</Text>
            <TouchableOpacity onPress={() => removeWork(item)}>
              <Text style={styles.removeButton}>✖</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
        <Text style={styles.saveButtonText}>{i18n.t("workScreen.saveButton")}</Text>
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

export default WorkScreen;