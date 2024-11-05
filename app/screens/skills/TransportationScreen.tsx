import React, { useState, useLayoutEffect } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSkills } from '@app/contexts/SkillsContext';
import { i18n } from '@app/locales/i18n';
import { RootStackParamList } from '@app/types/common.type';

const transportationOptions = [
  { label: 'Bicycle', key: 'bicycle' },
  { label: 'Car', key: 'car' },
  { label: 'Online', key: 'online' },
  { label: 'Scooter', key: 'scooter' },
  { label: 'Truck', key: 'truck' },
  { label: 'Walk', key: 'walk' }
];

const TransportationScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { skills, updateSkills } = useSkills();

  const [selectedTransport, setSelectedTransport] = useState<string[]>(skills.transportation || []);

  const toggleOption = (option: string) => {
    setSelectedTransport((prev) => 
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  const goBackWithSelected = () => {
    updateSkills("transportation", selectedTransport);
    navigation.navigate('SkillsSettings');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: i18n.t('editProfile.transportation'),
      headerLeft: () => (
        <TouchableOpacity onPress={goBackWithSelected} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#000" />
          <Text style={styles.backText}>{i18n.t('back')}</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, selectedTransport]);

  return (
    <View style={styles.container}>
      {transportationOptions.map((option) => (
        <View key={option.key} style={styles.row}>
          <Text style={styles.optionLabel}>{i18n.t(`editProfile.${option.key}`)}</Text>
          <Switch
            value={selectedTransport.includes(option.key)}
            onValueChange={() => toggleOption(option.key)}
          />
        </View>
      ))}
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
  },
  optionLabel: {
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

export default TransportationScreen;