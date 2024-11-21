import React, { useState, useLayoutEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSkills } from '@app/contexts/SkillsContext';
import { i18n } from '@app/locales/i18n';
import AirCarerText from '@app/constants/AirCarerText';
import theme from '@app/constants/theme';

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
    updateSkills('work', work); // Update context with new work list
    navigation.goBack(); // Use goBack for consistent navigation behavior
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: i18n.t('workScreen.title'), // Use default header styling
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Input Field */}
      <TextInput
        mode="outlined"
        label={i18n.t('workScreen.placeholder')}
        value={workInput}
        onChangeText={setWorkInput}
        onSubmitEditing={addWork}
        style={styles.input}
        outlineColor={theme.colors.primary}
        activeOutlineColor={theme.colors.primary}
      />

      {/* List of Work Entries */}
      <FlatList
        data={work}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <AirCarerText variant="default" style={styles.text}>
              {item}
            </AirCarerText>
            <Button
              mode="text"
              onPress={() => removeWork(item)}
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
            {i18n.t('workScreen.saveButton')}
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
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
    borderRadius: theme.rouded.large,
  },
  saveButtonContent: {
    justifyContent: 'center',
  },
  saveButtonText: {
    color: theme.colors.paper,
    fontWeight: 'bold',
  },
});

export default WorkScreen;