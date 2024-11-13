import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import theme from "@app/constants/theme";
import AirCarerText from "@app/constants/AirCarerText";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { i18n } from "@app/locales/i18n";

interface OfferData {
  id: string;
  providerName: string;
  avatarLabel: string;
  rating: number;
  reviewCount: number;
  completionRate: number;
  price: number;
  description: string;
}

interface OfferItemProps {
  data: OfferData;
}

const OfferItem = ({ data }: OfferItemProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.offerItemContainer}>
      <View style={styles.posterInfo}>
        <Avatar.Text
          size={48}
          label={data.avatarLabel}
          color="white"
          style={styles.avatar}
        />
        <View style={styles.posterDetails}>
          <AirCarerText style={styles.posterName}>
            {data.providerName}
          </AirCarerText>
          <View style={styles.ratingRow}>
            <AirCarerText style={styles.rating}>
              {data.rating.toFixed(1)}
            </AirCarerText>
            <MaterialIcons
              name="star"
              size={16}
              color="#FFB800"
              style={styles.starIcon}
            />
            <AirCarerText style={styles.reviewCount}>
              ({data.reviewCount})
            </AirCarerText>
          </View>
          <View style={styles.completionRow}>
            <AirCarerText
              style={[styles.completionRate, { color: theme.colors.secondary }]}
            >
              {data.completionRate}%{" "}
              <AirCarerText style={styles.completionText}>
                Completion rate
              </AirCarerText>
            </AirCarerText>
          </View>
        </View>
        <AirCarerText style={styles.priceText}>${data.price}</AirCarerText>
      </View>

      <View style={styles.descriptionContainer}>
        <AirCarerText
          style={[
            styles.description,
            expanded ? styles.expandedDescription : styles.collapsedDescription,
          ]}
          numberOfLines={expanded ? undefined : 3}
        >
          {data.description}
        </AirCarerText>
      </View>

      <View style={styles.toggleButtonContainer}>
        <TouchableOpacity onPress={toggleExpanded} style={styles.toggleButton}>
          <AirCarerText style={styles.toggleText}>
            {expanded ? i18n.t("taskConclusion.ShowLess") : i18n.t("taskConclusion.ShowMore")}
          </AirCarerText>
          <MaterialIcons
            name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={20}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const YourOffersScreen = () => {
  const sampleOffers: OfferData[] = [
    {
      id: "1",
      providerName: "Provider A",
      avatarLabel: "PA",
      rating: 5.0,
      reviewCount: 999,
      completionRate: 99,
      price: 150,
      description:
        "Hi dear! I am a professional with extensive experience in this field. I can offer high-quality service with great attention to detail. My rate includes all necessary equipment and insurance.\n\nAdditional details and terms...",
    },
    {
      id: "2",
      providerName: "Provider B",
      avatarLabel: "PB",
      rating: 4.0,
      reviewCount: 99,
      completionRate: 99,
      price: 120,
      description:
        "Hi dear! I am a professional with extensive experience in this field. I can offer high-quality service with great attention to detail. My rate includes all necessary equipment and insurance.\n\nAdditional details and terms...",
    },
    {
      id: "3",
      providerName: "Provider C",
      avatarLabel: "PC",
      rating: 3.0,
      reviewCount: 9,
      completionRate: 9,
      price: 100,
      description:
        "Hi dear! I am a professional with extensive experience in this field. I can offer high-quality service with great attention to detail. My rate includes all necessary equipment and insurance.\n\nAdditional details and terms...",
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {sampleOffers.map((offer) => (
        <OfferItem key={offer.id} data={offer} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  offerItemContainer: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    minHeight: 200,
  },
  posterInfo: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    marginBottom: 8,
  },
  avatar: {
    backgroundColor: theme.colors.primary,
    marginRight: 12,
  },
  posterDetails: {
    flex: 1,
    gap: 2,
  },
  posterName: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.text,
  },
  starIcon: {
    marginRight: 2,
  },
  reviewCount: {
    fontSize: 14,
    color: "#FF9CA3",
  },
  completionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  completionRate: {
    fontSize: 14,
  },
  completionText: {
    fontSize: 14,
    color: "#FF9CA3",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.primary,
  },
  descriptionContainer: {
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: theme.colors.text,
    lineHeight: 20,
  },
  collapsedDescription: {
    height: 60,
  },
  expandedDescription: {
    height: "auto",
  },
  toggleButtonContainer: {
    height: 36,
    justifyContent: "center",
  },
  toggleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  toggleText: {
    color: theme.colors.primary,
    marginRight: 4,
    fontSize: 14,
  },
});

export default YourOffersScreen;
