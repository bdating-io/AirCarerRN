import AirCarerText from "@app/constants/AirCarerText";
import { View, StyleSheet, Image, FlatList, Alert, TouchableOpacity} from "react-native";
import { i18n } from "@app/locales/i18n";
import theme from "@app/constants/theme";
import React, { useState } from 'react';
import { Appbar, Card, IconButton, Text, Icon, Button } from 'react-native-paper';
import { useNavigation } from 'expo-router';

const TaskList = (props: any) => {
  
  const { navigation } = props

  // Example data
  const [taskData] = useState([
    {
      id: '1',
      title: '1 Bedroom 2 Bathrooms',
      address: '123 Main St, Melbourne VIC',
      availableTime: 'Before Sun, 20 Oct 13PM',
      price: 70,
    },
    {
      id: '2',
      title: '2 Bedrooms 1 Bathroom',
      address: '456 Maple Ave, Sydney NSW',
      availableTime: 'Before Mon, 21 Oct 10AM',
      price: 85,
    },
    {
      id: '3',
      title: '3 Bedrooms 2 Bathrooms',
      address: '789 Oak Rd, Brisbane QLD',
      availableTime: 'Before Wed, 23 Oct 9AM',
      price: 95,
    },
    {
      id: '4',
      title: '1 Bedroom 1 Bathroom',
      address: '101 Pine St, Adelaide SA',
      availableTime: 'Before Fri, 25 Oct 12PM',
      price: 60,
    },
    {
      id: '4',
      title: '1 Bedroom 1 Bathroom',
      address: '101 Pine St, Adelaide SA',
      availableTime: 'Before Fri, 25 Oct 12PM',
      price: 60,
    },
    {
      id: '4',
      title: '1 Bedroom 1 Bathroom',
      address: '101 Pine St, Adelaide SA',
      availableTime: 'Before Fri, 25 Oct 12PM',
      price: 60,
    },
  ]);

  const renderTaskCard = ({ item }: { item: typeof taskData[0] }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <AirCarerText variant="bold">{item.title}</AirCarerText>
          <AirCarerText variant="bold">${item.price}</AirCarerText>
        </View>
        <View style={styles.address}>
          <Icon source="map-marker-outline" color={theme.colors.primary} size={20}/>
          <AirCarerText>{item.address}</AirCarerText>
        </View>
        <View style={styles.time}>
          <Icon source="calendar-month-outline" color={theme.colors.primary} size={18}/>
          <AirCarerText>{item.availableTime}</AirCarerText>
        </View>
        {/* <AirCarerText>{item.offers} offers</AirCarerText> */}
        <TouchableOpacity onPress={() => navigation.navigate("browsing-task/task-conclusion/customer")}>
          <AirCarerText style={styles.link}>See Detail</AirCarerText>
        </TouchableOpacity>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Top Bar with Filter and Sort Buttons */}
      {/* <Appbar.Header style={styles.appbar}>
        <Button
          mode="text" 
          onPress={() => console.log('Filter pressed')}
          style={styles.iconButton}
        >
          <Icon source="filter-variant" color={theme.colors.primary} size={20}/>
          <AirCarerText>Filter</AirCarerText>
        </Button>
        <View style={{ flex: 1 }} />
        <Button
          mode="text" 
          onPress={() => console.log('Filter pressed')}
          style={styles.iconButton}
        >
          <Icon source="sort" color={theme.colors.primary} size={20}/>
          <AirCarerText>Sort</AirCarerText>
        </Button>
      </Appbar.Header> */}

      {/* Main Content: Task List */}
      <FlatList
        data={taskData}
        renderItem={renderTaskCard}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<AirCarerText>No tasks available</AirCarerText>}
      />
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
  appbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.paper,
    elevation: 0,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  iconButton: {
    marginHorizontal: -10,
  },
  card: {
    margin: 8,
    padding: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  address: {
    flexDirection: 'row',
    marginLeft: -3,
    marginBottom: 8,
  },
  time: {
    flexDirection: 'row',
    marginLeft: -1,
    marginBottom: 5,
  },
  link: {
    textDecorationLine: "underline",
    
  }
});

export default TaskList;