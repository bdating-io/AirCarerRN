// AddProperty.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Alert} from 'react-native';
import { TextInput, Button, Card, SegmentedButtons} from 'react-native-paper';
import { Dropdown } from 'react-native-paper-dropdown';
import { useNavigation, useRoute } from '@react-navigation/native';
import AirCarerText from '@app/constants/AirCarerText';
import DropDownPicker from 'react-native-dropdown-picker';
import theme from "@app/constants/theme";
import { Colors } from '@app/constants/Colors';

const AddProperty = () => {
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [address, setAddress] = useState('');
  const [suburb, setSuburb] = useState('');
  const [postcode, setPostcode] = useState('');
  const [state, setState] = useState('');
  const [photos, setPhotos] = useState([]);

  const states = [
    { label: 'Victoria', value: 'Victoria' },
    { label: 'New South Wales', value: 'New South Wales' },
    { label: 'Queensland', value: 'Queensland' },
    { label: 'South Australia', value: 'South Australia' },
    { label: 'Western Australia', value: 'Western Australia' },
    { label: 'Tasmania', value: 'Tasmania' },
    { label: 'Australian Capital Territory', value: 'Australian Capital Territory' },
    { label: 'Northern Territory', value: 'Northern Territory' },
  ];

  const navigation = useNavigation();
  const route = useRoute();
  const { setProperties } = route.params;

  const handleSubmit = () => {
    // //setProperties((prevProperties) => [...prevProperties, newProperty]);
    // navigation.goBack();

    // Validate the fields
    if (!address || !suburb || !postcode) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    // Validate postcode length (must be 4 digits)
    if (!/^\d{4}$/.test(postcode)) {
      Alert.alert('Error', 'Postcode must be a 4-digit number.');
      return;
    }

    // If validation passes, submit the form
    Alert.alert('Success', 'Property information submitted successfully!');
    const newProperty = { bedrooms, bathrooms, address, suburb, postcode, state, photos };
    setProperties((prevProperties) => [...prevProperties, newProperty]);
    navigation.goBack();
  };

  const getButtonStyle = (value:string, selectedValue:string) => ({
    ...styles.optionButton,
    backgroundColor: value === selectedValue ? theme.colors.primary : Colors.light.tabDefault, // Blue background if selected
  });

  const getLabelStyle = (value:string, selectedValue:string) => ({
    ...styles.optionButtonLabel,
    color: value === selectedValue ? theme.colors.paper : theme.colors.primary, // Blue background if selected
  });

  return (
    <View style={styles.container}>
      <AirCarerText variant="h1">What's the place like?</AirCarerText>
      <View style={styles.subTitle}>
        <AirCarerText variant="default">Provide more details</AirCarerText>
      </View>
      <View style={styles.questionTitle}>
        <AirCarerText variant="bold">How many bedrooms do you have?</AirCarerText>
      </View>
      <View>
        <SegmentedButtons
          value={bedrooms}
          onValueChange={setBedrooms}
          buttons={[
            { value: '0', label: '0', style: getButtonStyle('0', bedrooms), labelStyle: getLabelStyle('0', bedrooms)},
            { value: '1', label: '1', style: getButtonStyle('1', bedrooms),labelStyle: getLabelStyle('1', bedrooms) },
            { value: '2', label: '2', style: getButtonStyle('2', bedrooms),labelStyle: getLabelStyle('2', bedrooms) },
            { value: '3', label: '3', style: getButtonStyle('3', bedrooms),labelStyle: getLabelStyle('3', bedrooms) },
            { value: '4+', label: '4+', style: getButtonStyle('4+', bedrooms),labelStyle: getLabelStyle('4+', bedrooms) },
          ]}
          style={styles.segmentedButtons}
        />
      </View>
      <View style={styles.questionTitle}>
        <AirCarerText variant="bold">How many bathrooms do you have?</AirCarerText>
      </View>
      <View>
        <SegmentedButtons
          value={bathrooms}
          onValueChange={setBathrooms}
          buttons={[
            { value: '0', label: '0', style: getButtonStyle('0', bathrooms), labelStyle: getLabelStyle('0', bathrooms) },
            { value: '1', label: '1', style: getButtonStyle('1', bathrooms), labelStyle: getLabelStyle('1', bathrooms) },
            { value: '2', label: '2', style: getButtonStyle('2', bathrooms), labelStyle: getLabelStyle('2', bathrooms) },
            { value: '3', label: '3', style: getButtonStyle('3', bathrooms), labelStyle: getLabelStyle('3', bathrooms) },
            { value: '4+', label: '4+', style: getButtonStyle('4+', bathrooms), labelStyle: getLabelStyle('4+', bathrooms) },
          ]}
          style={styles.segmentedButtons}
        />
      </View>
      <View>
        <View style={styles.questionTitle}>
          <AirCarerText variant="bold">What is your address?</AirCarerText>
        </View>
          
          <View style={styles.input}>
            {/* <AirCarerText>Address</AirCarerText> */}
            <TextInput
              label="Address"
              value={address}
              onChangeText={setAddress}
              mode='outlined'
            />
          </View>
          
          <View style={styles.input}>
            {/* <AirCarerText variant="default">Suburb</AirCarerText> */}
            <TextInput
              label="Suburb"
              value={suburb}
              onChangeText={setSuburb}
              mode="outlined"
            />
          </View>

          
          <View style={styles.input}>
            {/* <AirCarerText variant="default">State</AirCarerText> */}
            <Dropdown
              label="State"
              placeholder="Select Select"
              options={states}
              value={state}
              onSelect={(selectedValue) => setState(selectedValue || '')}
              mode='outlined'
              menuContentStyle={styles.dropDown}
            />
          </View>

          <View style={styles.input}>
            {/* <AirCarerText variant="default">Postcode</AirCarerText> */}
            <TextInput
              label="Postcode"
              value={postcode}
              onChangeText={setPostcode}
              mode="outlined"
              keyboardType="numeric"
              maxLength={4}
            />
          </View>
      </View>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('property/addPhotos', { setPhotos })}
        style={styles.button}
      >
        <AirCarerText variant="button">Add Photos</AirCarerText>
      </Button>
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
      >
        <AirCarerText variant="button">Submit</AirCarerText>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.paper,
  },
  subTitle: {
    marginTop: 3,
    marginBottom: 13,
  },
  questionTitle:{
    marginBottom: 10,
  },
  segmentedButtons: {
    marginBottom: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  optionButton: {
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginHorizontal: 2,
    borderColor: theme.colors.paper,        // Custom border color
  },
  optionButtonLabel: {
    marginVertical: 15,
    fontSize: 18,
  },
  addressInput: {
    padding: 2,
  },
  input: {
    marginBottom: 10,
  },
  dropDown: {
    backgroundColor: theme.colors.paper,
  },
  button: {
    marginVertical: 10,
  },
});

export default AddProperty;