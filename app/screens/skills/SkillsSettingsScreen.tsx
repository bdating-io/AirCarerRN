import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const SkillsSettingsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [transportation, setTransportation] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [education, setEducation] = useState([]);
  const [work, setWork] = useState([]);
  const [specialties, setSpecialties] = useState([]);

  const MAX_VISIBLE_ITEMS = 2; // Maximum number of items to show before using "..."

  useEffect(() => {
    if (route.params?.selectedTransport) {
      setTransportation(route.params.selectedTransport);
    }
    if (route.params?.updatedLanguages) {
      setLanguages(route.params.updatedLanguages);
    }
    if (route.params?.updatedEducation) {
      setEducation(route.params.updatedEducation);
    }
    if (route.params?.updatedWork) {
      setWork(route.params.updatedWork);
    }
    if (route.params?.updatedSpecialties) {
      setSpecialties(route.params.updatedSpecialties);
    }
  }, [route.params]);

  // Helper function to display skill values concisely
  const renderSkillValue = (skillArray) => {
    if (skillArray.length === 0) return 'Not specified';
    if (skillArray.length > MAX_VISIBLE_ITEMS) {
      return `${skillArray.slice(0, MAX_VISIBLE_ITEMS).join(', ')}...`;
    }
    return skillArray.join(', ');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Transportation', { selectedTransport: transportation })}>
        <View style={styles.row}>
          <Text style={styles.skillLabel}>Transportation</Text>
          <Text style={styles.skillValue}>{renderSkillValue(transportation)}</Text>
          <Ionicons name="chevron-forward" size={24} color="#ccc" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Languages', { languages })}>
        <View style={styles.row}>
          <Text style={styles.skillLabel}>Languages</Text>
          <Text style={styles.skillValue}>{renderSkillValue(languages)}</Text>
          <Ionicons name="chevron-forward" size={24} color="#ccc" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Education', { education })}>
        <View style={styles.row}>
          <Text style={styles.skillLabel}>Education</Text>
          <Text style={styles.skillValue}>{renderSkillValue(education)}</Text>
          <Ionicons name="chevron-forward" size={24} color="#ccc" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Work', { work })}>
        <View style={styles.row}>
          <Text style={styles.skillLabel}>Work</Text>
          <Text style={styles.skillValue}>{renderSkillValue(work)}</Text>
          <Ionicons name="chevron-forward" size={24} color="#ccc" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Specialties', { specialties })}>
        <View style={styles.row}>
          <Text style={styles.skillLabel}>Specialties</Text>
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