import React, { useState, useLayoutEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSkills } from '@app/contexts/SkillsContext';
import { i18n } from '@app/locales/i18n';
import AirCarerText from '@app/constants/AirCarerText';
import theme from '@app/constants/theme';

const EducationScreen = () => {
  const navigation = useNavigation();
  const { skills, updateSkills } = useSkills();
  const [education, setEducation] = useState<string[]>(skills.education || []);
  const [educationInput, setEducationInput] = useState('');

  const addEducation = () => {
    if (educationInput.trim() && !education.includes(educationInput.trim())) {
      setEducation((prev) => [...prev, educationInput.trim()]);
      setEducationInput('');
    }
  };

  const removeEducation = (item: string) => {
    setEducation(education.filter((entry) => entry !== item));
  };

  const saveChanges = () => {
    updateSkills('education', education); // Update context with new education list
    navigation.goBack(); // Use goBack for consistent navigation behavior
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: i18n.t('educationScreen.title'), // Use default header styling
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Input Field */}
      <TextInput
        mode="outlined"
        label={i18n.t('educationScreen.placeholder')}
        value={educationInput}
        onChangeText={setEducationInput}
        onSubmitEditing={addEducation}
        style={styles.input}
        outlineColor={theme.colors.primary}
        activeOutlineColor={theme.colors.primary}
      />

      {/* List of Education Entries */}
      <FlatList
        data={education}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <AirCarerText variant="default" style={styles.text}>
              {item}
            </AirCarerText>
            <Button
              mode="text"
              onPress={() => removeEducation(item)}
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
            {i18n.t('educationScreen.saveButton')}
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

export default EducationScreen;