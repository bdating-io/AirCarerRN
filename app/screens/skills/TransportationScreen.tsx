import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const transportationOptions = ['Bicycle', 'Car', 'Online', 'Scooter', 'Truck', 'Walk'];

const TransportationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedTransport, setSelectedTransport] = useState([]);

  // Load previous selections when navigating to the Transportation screen
  useEffect(() => {
    if (route.params?.selectedTransport) {
      setSelectedTransport(route.params.selectedTransport);
    }
  }, [route.params?.selectedTransport]);

  const toggleOption = (option) => {
    setSelectedTransport((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  const goBackWithSelected = () => {
    navigation.navigate('SkillsSettings', { selectedTransport });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={goBackWithSelected} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#000" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, selectedTransport]);

  return (
    <View style={styles.container}>
      {transportationOptions.map((option) => (
        <View key={option} style={styles.row}>
          <Text style={styles.optionLabel}>{option}</Text>
          <Switch
            value={selectedTransport.includes(option)}
            onValueChange={() => toggleOption(option)}
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
    marginLeft: 5, // Adjust the margin to match the SkillsSettings back button
  },
  backText: {
    fontSize: 18,
    color: '#000',
  },
});

export default TransportationScreen;