import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { TextInput, Button, Card, SegmentedButtons, shadow } from 'react-native-paper';
import AirCarerText from '@app/constants/AirCarerText';
import theme from "@app/constants/theme";
import { Colors } from '@app/constants/Colors';
import { i18n } from "@app/locales/i18n";
import RNPickerSelect from "react-native-picker-select";
import { useSnackbar } from '@app/contexts/snackbar.context';
import { useProperties } from '@app/contexts/PropertiesContext';
import { v4 as uuidv4 } from 'uuid';


const AddProperty = (props: any) => {
  const { navigation, route } = props;
  const { property } = route.params || {};

  const { addProperty, editProperty } = useProperties();
  const [bedrooms, setBedrooms] = useState(property?.bedrooms || '');
  const [bathrooms, setBathrooms] = useState(property?.bathrooms || '');
  const [address, setAddress] = useState(property?.address || '');
  const [postcode, setPostcode] = useState(property?.postcode || '');
  const [state, setState] = useState(property?.state || '');
  const [type, setType] = useState(property?.type || '');
  const [suburb, setSuburb] = useState(property?.suburb || '');
  const [photos, setPhotos] = useState(property?.photos || []);

  const { error, success } = useSnackbar();

  const states = [
    { label: 'Victoria', value: 'Victoria', key: 'VIC' },
    { label: 'New South Wales', value: 'New South Wales', key: 'NSW' },
    { label: 'Queensland', value: 'Queensland', key: 'QLD' },
    { label: 'South Australia', value: 'South Australia', key: 'SA' },
    { label: 'Western Australia', value: 'Western Australia', key: 'WA' },
    { label: 'Tasmania', value: 'Tasmania', key: 'TAS' },
    { label: 'Australian Capital Territory', value: 'Australian Capital Territory', key: 'ACT' },
    { label: 'Northern Territory', value: 'Northern Territory', key: 'NT' },
  ];

  const handleSubmit = () => {
    if (!address || !postcode || !type) {
      error('Please fill in all required fields.');
      return;
    }

    if (!/^\d{4}$/.test(postcode)) {
      error('Postcode must be a 4-digit number.');
      return;
    }

    if (!property) {
      const newProperty = { id: uuidv4(), bedrooms, bathrooms, address, postcode, suburb, state, type, photos };
      addProperty(newProperty);
    } else {
      const updatedProperty = { ...property, bedrooms, bathrooms, address, postcode, suburb, state, type, photos };
      editProperty(property.id, updatedProperty);
    }

    success('Property information submitted successfully!');
    navigation.navigate('property/list');
  };

  const getButtonStyle = (value: any, selectedValue: any) => ({
    ...styles.optionButton,
    backgroundColor: value === selectedValue ? theme.colors.primary : Colors.light.tabDefault,
    overflow: 'hidden' as 'hidden',
  });

  const getLabelStyle = (value: any, selectedValue: any) => ({
    ...styles.optionButtonLabel,
    color: value === selectedValue ? theme.colors.paper : theme.colors.primary,
  });

  const setStudio = () => {
    setType('Studio');
    setBedrooms('0');
    setBathrooms('1');
  }

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <AirCarerText variant="h1">{i18n.t("addProperty.title")}</AirCarerText>
      <View style={styles.subTitle}>
        <AirCarerText variant="default">{i18n.t("addProperty.subTitle")}</AirCarerText>
      </View>
      <View >
        <AirCarerText style={styles.subTitle} variant="bold">{i18n.t("addProperty.type")}</AirCarerText>
        <View style={styles.typeSection} >
          <Button mode="contained"
            onPress={() => setType('House')}
            style={{ backgroundColor: type === 'House' ? theme.colors.primary : Colors.light.tabDefault, borderRadius: theme.rouded.small }}
            contentStyle={styles.typeButton}
          >
            <AirCarerText variant="button" style={{ color: type === 'House' ? theme.colors.paper : theme.colors.primary }}>
              House
            </AirCarerText>
          </Button>
          <Button mode="contained" onPress={() => setType('Townhouse')}
            contentStyle={styles.typeButton}
            style={{ backgroundColor: type === 'Townhouse' ? theme.colors.primary : Colors.light.tabDefault, borderRadius: theme.rouded.small }}>
            <AirCarerText variant="button" style={{ color: type === 'Townhouse' ? theme.colors.paper : theme.colors.primary }}>
              Townhouse
            </AirCarerText>
          </Button>
          <Button mode="contained" onPress={() => setType('Apartment')}
            contentStyle={styles.typeButton}
            style={{ backgroundColor: type === 'Apartment' ? theme.colors.primary : Colors.light.tabDefault, borderRadius: theme.rouded.small }}>
            <AirCarerText variant="button" style={{ color: type === 'Apartment' ? theme.colors.paper : theme.colors.primary }}>
              Apartment
            </AirCarerText>
          </Button>
          <Button mode="contained" onPress={setStudio}
            contentStyle={styles.typeButton}
            style={{ backgroundColor: type === 'Studio' ? theme.colors.primary : Colors.light.tabDefault, borderRadius: theme.rouded.small }}>
            <AirCarerText variant="button" style={{ color: type === 'Studio' ? theme.colors.paper : theme.colors.primary }}>
              Studio
            </AirCarerText>
          </Button>
        </View>
      </View>

      <View>
        <AirCarerText style={styles.subTitle} variant="bold">{i18n.t("addProperty.askBedroom")}</AirCarerText>
        <SegmentedButtons
          value={bedrooms}
          onValueChange={setBedrooms}

          buttons={[
            { value: '0', label: '0', style: getButtonStyle('0', bedrooms), labelStyle: getLabelStyle('0', bedrooms), disabled: type === 'Studio' },
            { value: '1', label: '1', style: getButtonStyle('1', bedrooms), labelStyle: getLabelStyle('1', bedrooms), disabled: type === 'Studio' },
            { value: '2', label: '2', style: getButtonStyle('2', bedrooms), labelStyle: getLabelStyle('2', bedrooms), disabled: type === 'Studio' },
            { value: '3', label: '3', style: getButtonStyle('3', bedrooms), labelStyle: getLabelStyle('3', bedrooms), disabled: type === 'Studio' },
            { value: '4+', label: '4+', style: getButtonStyle('4+', bedrooms), labelStyle: getLabelStyle('4+', bedrooms), disabled: type === 'Studio' },
          ]}
          style={styles.segmentedButtons}
        />
      </View>

      <View>
        <AirCarerText style={styles.subTitle} variant="bold">{i18n.t("addProperty.askBathroom")}</AirCarerText>
        <SegmentedButtons
          value={bathrooms}
          onValueChange={setBathrooms}
          buttons={[
            { value: '0', label: '0', style: getButtonStyle('0', bathrooms), labelStyle: getLabelStyle('0', bathrooms), disabled: type === 'Studio' },
            { value: '1', label: '1', style: getButtonStyle('1', bathrooms), labelStyle: getLabelStyle('1', bathrooms), disabled: type === 'Studio' },
            { value: '2', label: '2', style: getButtonStyle('2', bathrooms), labelStyle: getLabelStyle('2', bathrooms), disabled: type === 'Studio' },
            { value: '3', label: '3', style: getButtonStyle('3', bathrooms), labelStyle: getLabelStyle('3', bathrooms), disabled: type === 'Studio' },
            { value: '4+', label: '4+', style: getButtonStyle('4+', bathrooms), labelStyle: getLabelStyle('4+', bathrooms), disabled: type === 'Studio' },
          ]}
          style={styles.segmentedButtons}
        />
      </View>
      <View style={styles.addressSection}>
        <AirCarerText variant="bold">{i18n.t("addProperty.askAddress")}</AirCarerText>
        <TextInput
          label={i18n.t("addProperty.address")}
          value={address}
          onChangeText={setAddress}
          mode='outlined'
          outlineStyle={styles.input}
        />

        {/* <Dropdown
          label={i18n.t("addProperty.state")}
          placeholder="Select Select"
          options={states}
          value={state}
          onSelect={(selectedValue) => setState(selectedValue || '')}
          mode='outlined'
          menuContentStyle={styles.dropDown}
        /> */}
        <RNPickerSelect
          items={states}
          // for android, the value is updated in onValueChange
          onValueChange={(value) => setState(value)}
          placeholder={{ label: 'Select a state', value: null }}
        >
          <TextInput label={i18n.t("addProperty.state")} outlineStyle={{
            borderRadius: theme.rouded.small,
            padding: 0
          }}
            style={{ padding: 0 }}
            right={<TextInput.Icon size={15} style={{ right: 0 }} icon="arrow-down-drop-circle" color={theme.colors.primary} />}
            mode="outlined"
            value={state} />
        </RNPickerSelect>
        <TextInput
          label={i18n.t("addProperty.suburb")}
          value={suburb}
          onChangeText={setSuburb}
          mode="outlined"
          outlineStyle={styles.input}
        />
        <TextInput
          label={i18n.t("addProperty.postcode")}
          value={postcode}
          onChangeText={setPostcode}
          mode="outlined"
          keyboardType="numeric"
          maxLength={4}
          outlineStyle={styles.input}
        />
      </View>

      <View>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('property/addPhotos', { setPhotos })}
          style={[styles.button, { backgroundColor: theme.colors.secondary }]}
        >
          <AirCarerText variant="button">{i18n.t("addProperty.addPhoto")}</AirCarerText>
        </Button>
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.button}
        >
          <AirCarerText variant="button">{i18n.t("addProperty.submit")}</AirCarerText>
        </Button>
      </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.paper,
    minHeight: '100%',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    gap: 15,
    paddingTop: 20,
    paddingBottom: 40,
  },
  addressSection: {
    gap: 10,
  },
  typeSection: {
    width: '100%',
    // flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    overflow: 'hidden',
  },
  typeButton: {
    height: 50,
    // width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: theme.rouded.small,
  },
  subTitle: {
    marginTop: 3,
    marginBottom: 13,
  },
  segmentedButtons: {
    // marginBottom: 20,
    marginHorizontal: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  optionButton: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginHorizontal: 2,
    // borderColor: theme.colors.paper,
    borderWidth: 0,
  },
  optionButtonLabel: {
    marginVertical: 15,
    fontSize: 18,
  },
  addressInput: {
    padding: 2,
  },
  input: {
    borderRadius: theme.rouded.small,
  },
  dropDown: {
    backgroundColor: theme.colors.paper,
  },
  button: {
    marginVertical: 10,
  },
});

export default AddProperty;