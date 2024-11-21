import React, { useState, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Switch, List } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useSkills } from '@app/contexts/SkillsContext';
import { i18n } from '@app/locales/i18n';
import { RootStackParamList } from '@app/types/common.type';
import AirCarerText from '@app/constants/AirCarerText';
import theme from '@app/constants/theme';

const transportationOptions = [
  { label: 'Bicycle', key: 'bicycle' },
  { label: 'Car', key: 'car' },
  { label: 'Online', key: 'online' },
  { label: 'Scooter', key: 'scooter' },
  { label: 'Truck', key: 'truck' },
  { label: 'Walk', key: 'walk' },
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
    updateSkills('transportation', selectedTransport);
    navigation.navigate('SkillsSettings');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: i18n.t('editProfile.transportation'),
      headerLeft: () => (
        <View style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={theme.colors.primary} />
          <AirCarerText
            variant="button"
            style={styles.backText}
            onPress={goBackWithSelected}
          >
            {i18n.t('back')}
          </AirCarerText>
        </View>
      ),
    });
  }, [navigation, selectedTransport]);

  return (
    <View style={styles.container}>
      {transportationOptions.map((option) => (
        <List.Item
          key={option.key}
          title={<AirCarerText variant="default">{i18n.t(`editProfile.${option.key}`)}</AirCarerText>}
          right={() => (
            <Switch
              value={selectedTransport.includes(option.key)}
              onValueChange={() => toggleOption(option.key)}
              color={theme.colors.primary}
            />
          )}
          style={styles.listItem}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.paper,
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey,
    paddingVertical: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  backText: {
    fontSize: 16,
    color: theme.colors.primary,
    marginLeft: 5,
  },
});

export default TransportationScreen;