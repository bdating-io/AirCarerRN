import React from 'react';
import AirCarerText from "@app/constants/AirCarerText";
import { View, StyleSheet, Image, FlatList, Text } from "react-native";
import { Button, Card, Icon } from "react-native-paper";
import { i18n } from "@app/locales/i18n";
import theme from "@app/constants/theme";
import { useNavigation } from '@react-navigation/native';
import { useProperties } from "@app/contexts/PropertiesContext";

const PropertyList = () => {
  const { properties } = useProperties();
  const navigation = useNavigation();

  const bedroomNumber = (value: string) => {
    if (Number(value) === 0) {
      return;
    } else if (Number(value) > 1) {
      return value + " bedrooms";
    } else {
      return "1 bedroom";
    }
  };

  const bathroomNumber = (value: string) => {
    if (Number(value) === 0) {
      return;
    } else if (Number(value) > 1) {
      return value + " bathrooms";
    } else {
      return "1 bathroom";
    }
  };

  const renderPhoto = (item: string[]) => (
    <View style={styles.photoContainer}>
      {item.map((url, index) => (
        <Image key={index} source={{ uri: url }} style={styles.photo} />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Button 
        mode="contained" 
        onPress={() => navigation.navigate("property/add")}
        style={styles.addButton}
      >
        <AirCarerText variant="button">{i18n.t("propertyList.addProperty")}</AirCarerText>
      </Button>
      {properties.length > 0 ? (
        properties.map((property, index) => (
          <Card key={index} style={styles.card}>
            <Card.Content>
              <AirCarerText variant="bold" style={styles.title}>{property.address}</AirCarerText>
              <AirCarerText variant="default">{property.suburb}, {property.state}, {property.postcode}</AirCarerText>
              <View style={styles.address}>
                <Icon source="home" color={theme.colors.primary} size={20}/>
                <AirCarerText variant="default">
                  {bedroomNumber(property.bedrooms)} {bathroomNumber(property.bathrooms)}
                </AirCarerText>
              </View>
              <FlatList
                data={property.photos}
                horizontal
                showsHorizontalScrollIndicator={true}
                renderItem={({ item }) => renderPhoto([item])}
                keyExtractor={(item, index) => index.toString()}
                pagingEnabled
             />
            </Card.Content>
          </Card>
        ))
      ) : (
        <AirCarerText>{i18n.t("propertyList.noProperty")}</AirCarerText>
      )}           
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.paper,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  addButton: {
    marginBottom: 20,
  },
  card: {
    marginBottom: 15,
  },
  title: {
    marginTop: 10,
    marginBottom: 5,
  },
  address: {
    flexDirection: 'row',
    marginTop: 5,
  },
  photoContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
  },
  photo: {
    width: 50,
    height: 50,
    marginTop: 5,
    borderRadius: 5,
    marginRight: 5,
  },
});

export default PropertyList;