import AirCarerText from "@app/constants/AirCarerText";
import { View, StyleSheet, Image, FlatList } from "react-native";
import { Button, Card, Icon} from "react-native-paper";
import { i18n } from "@app/locales/i18n";
import { useState } from "react";
import theme from "@app/constants/theme";

import { useNavigation } from 'expo-router';

const PropertyList = (props: any) => {
  const [properties, setProperties] = useState([]);
  const navigation = useNavigation();

  const bedroomNumber = (value: string) => {
    if (Number(value) === 0) {
      return;
    } else if (Number(value) >1 ) {
      return value +" bedrooms";
    } else {
      return "1 bedroom"
    }
  }
  const bathroomNumber = (value: string) => {
    if (Number(value) === 0) {
      return;
    } else if (Number(value) >1) {
      return value + " bathrooms";
    } else {
      return "1 bathroom";
    }
  }

  const renderPhoto = ({item}) => (
    <View style={styles.photoContainer}>
      <Image source={item} style={styles.photo} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Button 
        mode="contained" 
        onPress={() => navigation.navigate("property/add", {setProperties})}
        style={styles.addButton}
      >
        <AirCarerText variant="button">Add Property</AirCarerText>
      </Button>
      {properties.length > 0 ? (
        properties.map((property, index) => (
          <Card key={index} style={styles.card}>
            {/* <Card.Title title={`Property ${index + 1}`} /> */}
            <Card.Content>

              <AirCarerText variant="bold">{property.address}</AirCarerText>
              <AirCarerText variant="default">{property.suburb}, {property.state}, {property.postcode}</AirCarerText>
              
              <View style={styles.address}>
                <Icon source="home" color={theme.colors.primary} size={20}/>
                <AirCarerText variant="default">{bedroomNumber(property.bedrooms)} {bathroomNumber(property.bathrooms)}</AirCarerText>
              </View>
              <FlatList
                data={property.photos}
                horizontal
                showsHorizontalScrollIndicator={true}
                renderItem={renderPhoto}
                keyExtractor={(item, index) => index.toString()}
                pagingEnabled
             />
            </Card.Content>
          </Card>
        ))
      ) : (
        <AirCarerText>No properties added yet</AirCarerText>
      )}           
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: theme.colors.paper,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    //gap: 15,
    paddingTop: 20,
    //paddingBottom: 40,
  },
  addButton: {
    marginBottom: 20,
  },
  card: {
    marginBottom: 15,
  },
  address: {
    flexDirection: 'row',
    marginTop: 5
  },
  photoContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    //marginBottom: 5,
    marginRight: 5,
  },
  photo: {
    width: 50,
    height: 50,
    marginTop: 5,
    borderRadius: 5,
  },
});

export default PropertyList;