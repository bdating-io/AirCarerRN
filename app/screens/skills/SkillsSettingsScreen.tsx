import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSkills } from '@app/contexts/SkillsContext';
import { i18n } from '@app/locales/i18n';

const SkillsSettingsScreen = () => {
  const navigation = useNavigation();
  const { skills, updateSkills } = useSkills();

  // Local state initialized with context values
  const [transportation, setTransportation] = useState(skills.transportation);
  const [languages, setLanguages] = useState(skills.languages);
  const [education, setEducation] = useState(skills.education);
  const [work, setWork] = useState(skills.work);
  const [specialties, setSpecialties] = useState(skills.specialties);

  // Sync changes to context once the screen is closed
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      updateSkills("transportation", transportation);
      updateSkills("languages", languages);
      updateSkills("education", education);
      updateSkills("work", work);
      updateSkills("specialties", specialties);
    });
    return unsubscribe;
  }, [navigation, transportation, languages, education, work, specialties]);

  const MAX_VISIBLE_ITEMS = 2;

  const renderSkillValue = (skillArray: string[]) => {
    if (skillArray.length === 0) return i18n.t("common.notSpecified");
    if (skillArray.length > MAX_VISIBLE_ITEMS) {
      return `${skillArray.slice(0, MAX_VISIBLE_ITEMS).join(', ')}...`;
    }
    return skillArray.join(', ');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Transportation', { selectedTransport: transportation, setTransportation })}>
        <View style={styles.row}>
          <Text style={styles.skillLabel}>{i18n.t("editProfile.transportation")}</Text>
          <Text style={styles.skillValue}>{renderSkillValue(transportation)}</Text>
          <Ionicons name="chevron-forward" size={24} color="#ccc" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Languages', { languages, setLanguages })}>
        <View style={styles.row}>
          <Text style={styles.skillLabel}>{i18n.t("editProfile.languages")}</Text>
          <Text style={styles.skillValue}>{renderSkillValue(languages)}</Text>
          <Ionicons name="chevron-forward" size={24} color="#ccc" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Education', { education, setEducation })}>
        <View style={styles.row}>
          <Text style={styles.skillLabel}>{i18n.t("editProfile.education")}</Text>
          <Text style={styles.skillValue}>{renderSkillValue(education)}</Text>
          <Ionicons name="chevron-forward" size={24} color="#ccc" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Work', { work, setWork })}>
        <View style={styles.row}>
          <Text style={styles.skillLabel}>{i18n.t("editProfile.work")}</Text>
          <Text style={styles.skillValue}>{renderSkillValue(work)}</Text>
          <Ionicons name="chevron-forward" size={24} color="#ccc" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Specialties', { specialties, setSpecialties })}>
        <View style={styles.row}>
          <Text style={styles.skillLabel}>{i18n.t("editProfile.specialties")}</Text>
          <Text style={styles.skillValue}>{renderSkillValue(specialties)}</Text>
          <Ionicons name="chevron-forward" size={24} color="#ccc" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  skillLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  skillValue: {
    fontSize: 16,
    color: '#666',
    flexShrink: 1,
    marginRight: 10,
  },
});

export default SkillsSettingsScreen;