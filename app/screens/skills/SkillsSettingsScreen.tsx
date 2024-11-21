import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSkills } from '@app/contexts/SkillsContext';
import { i18n } from '@app/locales/i18n';
import AirCarerText from '@app/constants/AirCarerText';
import theme from '@app/constants/theme';

const SkillsSettingsScreen = () => {
  const navigation = useNavigation();
  const { skills, updateSkills } = useSkills();

  const [transportation, setTransportation] = useState(skills.transportation);
  const [languages, setLanguages] = useState(skills.languages);
  const [education, setEducation] = useState(skills.education);
  const [work, setWork] = useState(skills.work);
  const [specialties, setSpecialties] = useState(skills.specialties);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      updateSkills('transportation', transportation);
      updateSkills('languages', languages);
      updateSkills('education', education);
      updateSkills('work', work);
      updateSkills('specialties', specialties);
    });
    return unsubscribe;
  }, [navigation, transportation, languages, education, work, specialties]);

  const MAX_VISIBLE_ITEMS = 2;

  const renderSkillValue = (skillArray: string[]) => {
    if (skillArray.length === 0) return i18n.t('common.notSpecified');
    if (skillArray.length > MAX_VISIBLE_ITEMS) {
      return `${skillArray.slice(0, MAX_VISIBLE_ITEMS).join(', ')}...`;
    }
    return skillArray.join(', ');
  };

  return (
    <View style={styles.container}>
      {/* Transportation */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Transportation', {
            selectedTransport: transportation,
            setTransportation,
          })
        }
        activeOpacity={0.7} // Adjust opacity feedback
      >
        <List.Item
          title={<AirCarerText variant="bold">{i18n.t('editProfile.transportation')}</AirCarerText>}
          description={<AirCarerText variant="default">{renderSkillValue(transportation)}</AirCarerText>}
          right={() => <List.Icon icon="chevron-right" color={theme.colors.grey} />}
        />
      </TouchableOpacity>

      {/* Languages */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Languages', { languages, setLanguages })
        }
        activeOpacity={0.7}
      >
        <List.Item
          title={<AirCarerText variant="bold">{i18n.t('editProfile.languages')}</AirCarerText>}
          description={<AirCarerText variant="default">{renderSkillValue(languages)}</AirCarerText>}
          right={() => <List.Icon icon="chevron-right" color={theme.colors.grey} />}
        />
      </TouchableOpacity>

      {/* Education */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Education', { education, setEducation })
        }
        activeOpacity={0.7}
      >
        <List.Item
          title={<AirCarerText variant="bold">{i18n.t('editProfile.education')}</AirCarerText>}
          description={<AirCarerText variant="default">{renderSkillValue(education)}</AirCarerText>}
          right={() => <List.Icon icon="chevron-right" color={theme.colors.grey} />}
        />
      </TouchableOpacity>

      {/* Work */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Work', { work, setWork })}
        activeOpacity={0.7}
      >
        <List.Item
          title={<AirCarerText variant="bold">{i18n.t('editProfile.work')}</AirCarerText>}
          description={<AirCarerText variant="default">{renderSkillValue(work)}</AirCarerText>}
          right={() => <List.Icon icon="chevron-right" color={theme.colors.grey} />}
        />
      </TouchableOpacity>

      {/* Specialties */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Specialties', { specialties, setSpecialties })
        }
        activeOpacity={0.7}
      >
        <List.Item
          title={<AirCarerText variant="bold">{i18n.t('editProfile.specialties')}</AirCarerText>}
          description={<AirCarerText variant="default">{renderSkillValue(specialties)}</AirCarerText>}
          right={() => <List.Icon icon="chevron-right" color={theme.colors.grey} />}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.paper,
  },
});

export default SkillsSettingsScreen;