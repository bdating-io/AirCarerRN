import AirCarerText from "@app/constants/AirCarerText";
import { View, StyleSheet, Image, FlatList, Alert, TouchableOpacity} from "react-native";
import { i18n } from "@app/locales/i18n";
import theme from "@app/constants/theme";
import React, { useState } from 'react';
import { Appbar, Card, IconButton, Text, Icon, Button } from 'react-native-paper';
import { useNavigation } from 'expo-router';

export default function MyTaskScreen(props: any) {
  const { navigation } = props

  // Example data
  const [taskData] = useState([
    {
      id: '1',
      title: '1 Bedroom 2 Bathrooms',
      address: '123 Main St, Melbourne VIC',
      availableTime: 'Sun, 20 Oct 13PM - 14PM',
      price: 70,
      status: false,
    },
    {
      id: '2',
      title: '2 Bedrooms 1 Bathroom',
      address: '456 Maple Ave, Sydney NSW',
      availableTime: 'Mon, 21 Oct 10AM - 11AM',
      price: 85,
      status: false,
    },
    {
      id: '3',
      title: '3 Bedrooms 2 Bathrooms',
      address: '789 Oak Rd, Brisbane QLD',
      availableTime: 'Wed, 23 Oct 9AM - 11AM',
      price: 95,
      status: false,
    },
    {
      id: '4',
      title: '1 Bedroom 1 Bathroom',
      address: '101 Pine St, Adelaide SA',
      availableTime: 'Fri, 25 Oct 12PM - 14PM',
      price: 60,
      status: false,
    },
    {
      id: '4',
      title: '1 Bedroom 1 Bathroom',
      address: '101 Pine St, Adelaide SA',
      availableTime: 'Fri, 25 Oct 12PM - 15PM',
      price: 60,
      status: true,
    },
    {
      id: '4',
      title: '1 Bedroom 1 Bathroom',
      address: '101 Pine St, Adelaide SA',
      availableTime: 'Fri, 25 Oct 12PM - 14PM',
      price: 60,
      status: true,
    },
  ]);

  const taskStatus = (value: boolean) => {
    if (value) {
      return i18n.t("publishTab.complete");
    } else {
      return i18n.t("publishTab.inprogress");
    }
  };

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
        <View style={styles.time}>
          <Icon source="checkbox-marked-outline" color={theme.colors.primary} size={18}/>
          <AirCarerText>{taskStatus(item.status)}</AirCarerText>
        </View>
        {/* <AirCarerText>{item.offers} offers</AirCarerText> */}
        <TouchableOpacity onPress={() => navigation.navigate("browsing-task/task-conclusion/provider")}>
          <AirCarerText style={styles.link}>See Detail</AirCarerText>
        </TouchableOpacity>
      </Card.Content>
    </Card>
  );
    return (
      <View style={styles.container}>
      {/* Main Content: Task List */}
      <FlatList
        data={taskData}
        renderItem={renderTaskCard}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<AirCarerText>No tasks available</AirCarerText>}
      />
    </View>
    )
}

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