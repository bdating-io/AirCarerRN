import React, { useState } from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';
import { IconButton, Button } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import AirCarerText from '@app/constants/AirCarerText';
import theme from "@app/constants/theme";
import * as ImagePicker from 'expo-image-picker';
import { i18n } from "@app/locales/i18n";

const AddPropertyPhotos = () => {
  const [photo, setPhoto] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { setPhotos } = route.params;

  // Function to pick an image
  const pickImage = async () => {
    // Request permission to access media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert(i18n.t('addPropertyPhoto.cameraPermissionMessage'));
      return;
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    // Check if the user canceled the picker
    if (!result.canceled) {
      // Add the selected image to the photos state
      const selectedUris = result.assets.map(asset => asset.uri);
      //setPhoto([...photo, result.assets[0].uri]);
      setPhoto((photo) => [...photo, ...selectedUris]); // Append new selections
    }
  };

  // Function to delete a photo
  const deletePhoto = (uri: string) => {
    setPhoto(photo.filter(photo => photo !== uri));
  };

  // Render each photo in the grid
  const renderItem = ({item}) => (
    <View style={styles.photoContainer}>

      <Image source={{ uri: item }} style={styles.photo} />

      <IconButton
        icon="delete-outline"
        iconColor={theme.colors.error}
        size={15}
        onPress={() => deletePhoto(item)}
        style={styles.deleteButton}
      /> 
    </View>
  );
  
  const handleAddPhoto = () => {
    setPhotos((prevPhotos) => [...prevPhotos, photo]);
    console.log(photo);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <AirCarerText variant='h1'>{i18n.t("addPropertyPhoto.title")}</AirCarerText>
        <AirCarerText variant='default'>{i18n.t("addPropertyPhoto.subTitle")}</AirCarerText>
      </View>
      
      {/* <Button title="Pick an Image" onPress={pickImage} /> */}
      <Button mode="contained" onPress={pickImage} style={styles.button}>
        <AirCarerText variant='button'>{i18n.t("addPropertyPhoto.upload")}</AirCarerText>
      </Button>

      <FlatList
        data={photo}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3} // Show 3 photos per row
        contentContainerStyle={styles.grid}
      />

      <Button mode="contained" onPress={handleAddPhoto} style={styles.button}>
        <AirCarerText variant='button'>{i18n.t("addPropertyPhoto.submit")}</AirCarerText>
      </Button>

      
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.paper,
  },
  title: {
    marginBottom: 10,
  },
  grid: {
    justifyContent: 'space-between',
  },
  photoContainer: {
    position: 'relative',
    marginBottom: 10,
    width: '30%', // 3 photos per row
    marginHorizontal: '1%',
  },
  photo: {
    width: '100%',
    height: 100, // Adjust height as needed
    borderRadius: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: 1,
    right: 1,
    padding: 1,
    backgroundColor: theme.colors.paper,
    borderRadius: 20,
    height: 20.,
    width: 20,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    marginVertical: 10,
  },
});

export default AddPropertyPhotos;