import { View, StyleSheet } from "react-native";
import { Button, Avatar } from "react-native-paper";
import theme from "@app/constants/theme";
import AirCarerText from "@app/constants/AirCarerText";
import { i18n } from "@app/locales/i18n";
import HalfScreenModal from "../../components/halfScreen.modal";
import { MaterialIcons } from "@expo/vector-icons";

export default function TaskConclusionScreen(props: any) {
  const { navigation } = props;

  const makeOffer = () => {
    console.log("Make offer pressed");
    navigation.navigate("index")
  };

  const viewOnMap = () => {
    console.log("View on map pressed");
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <AirCarerText style={styles.taskHeader}>Task Title</AirCarerText>
          <View style={styles.posterInfo}>
            <Avatar.Text
              size={48}
              label="PA"
              color="white"
              style={styles.avatar}
            />
            <View style={styles.posterDetails}>
              <View style={styles.nameRow} >
                <AirCarerText style={styles.posterName} >
                  Provider A
                </AirCarerText>
              </View>
              <View style={styles.ratingRow}>
                <AirCarerText style={styles.rating}>5.0</AirCarerText>
                <MaterialIcons
                  name="star"
                  size={16}
                  color="#FFB800"
                  style={styles.starIcon}
                />
                <AirCarerText style={styles.reviewCount}>(999)</AirCarerText>
              </View>
              <View style={styles.completionRow}>
                <AirCarerText style={styles.completionRate}>99%</AirCarerText>
                <AirCarerText style={styles.completionText}>
                  {i18n.t("taskConclusion.completionRate")}
                </AirCarerText>
              </View>
            </View>
          </View>

          <View style={styles.locationTimeContainer}>
            <View style={styles.locationContainer}>
              <MaterialIcons
                name="location-on"
                size={24}
                color={theme.colors.primary}
              />
              <View style={styles.locationTextContainer}>
                <AirCarerText style={styles.locationText}>
                  Some Location
                </AirCarerText>
                <AirCarerText style={styles.locationSubText}>
                  3000, Australia
                </AirCarerText>
              </View>
              <Button
                mode="text"
                textColor={theme.colors.primary}
                onPress={viewOnMap}
              >
                {i18n.t("taskConclusion.viewOnMap")}
              </Button>
            </View>

            <View style={styles.timeContainer}>
              <MaterialIcons
                name="calendar-today"
                size={24}
                color={theme.colors.primary}
              />
              <AirCarerText style={styles.timeText}>
                Before Sun, 10 Nov
              </AirCarerText>
            </View>
          </View>
        </View>

        {/* Budget Section */}
        <View style={styles.budgetSection}>
          <AirCarerText style={styles.currencySymbol}>$</AirCarerText>
          <View style={styles.budgetTextContainer}>
            <AirCarerText style={styles.budgetAmount}>150 AUD</AirCarerText>
            <AirCarerText style={styles.budgetLabel}>
              {i18n.t("taskConclusion.budget")}
            </AirCarerText>
          </View>
        </View>

        {/* Task Details Section */}
        <View style={styles.detailsSection}>
          <AirCarerText style={styles.detailsTitle}>
            {i18n.t("taskConclusion.taskDescription")}
          </AirCarerText>
          <AirCarerText style={styles.detailsText}>
            Information Line 1
          </AirCarerText>
          <AirCarerText style={styles.detailsText}>
            Information Line 2
          </AirCarerText>
          <AirCarerText style={styles.detailsText}>
            Information Line 3
          </AirCarerText>
        </View>

        {/* Location Details */}
        <View style={styles.locationSection}>
          <View style={styles.locationItem}>
            <AirCarerText style={styles.locationLabel}>
              {i18n.t("taskConclusion.propertyPhotos")}
            </AirCarerText>
            <AirCarerText style={styles.locationText}>
              Sample Photos
            </AirCarerText>
          </View>
        </View>

        {/* Bottom Button Section */}
        <HalfScreenModal heightPerc="15%" persist>
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              buttonColor={theme.colors.primary}
              textColor="white"
              style={styles.button}
              contentStyle={styles.buttonContent}
              onPress={makeOffer}
            >
              <AirCarerText variant="button">
                {i18n.t("taskConclusion.acceptTask")}
              </AirCarerText>
            </Button>
          </View>
        </HalfScreenModal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  posterInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    gap: 12,
  },
  avatar: {
    backgroundColor: theme.colors.primary,
  },
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  posterDetails: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  posterName: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.primary,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    gap: 4,
  },
  rating: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.warning,
  },
  starIcon: {
    marginRight: 4,
  },
  reviewCount: {
    fontSize: 16,
    color: theme.colors.secondary,
  },
  completionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  completionRate: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.primary,
  },
  completionText: {
    fontSize: 16,
    color: theme.colors.secondary,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  headerSection: {
    marginBottom: 24,
  },
  taskHeader: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 16,
  },
  wTag: {
    fontSize: 16,
    color: theme.colors.warning,
  },
  locationTimeContainer: {
    gap: 12,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  locationTextContainer: {
    flex: 1,
  },
  locationText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  locationSubText: {
    fontSize: 14,
    color: theme.colors.secondary,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  timeText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  budgetSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  currencySymbol: {
    fontSize: 24,
    color: theme.colors.primary,
    marginRight: 8,
  },
  budgetTextContainer: {
    flexDirection: "column",
  },
  budgetAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  budgetLabel: {
    fontSize: 16,
    color: theme.colors.secondary,
  },
  detailsSection: {
    marginBottom: 20,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 5,
    color: theme.colors.text,
  },
  locationSection: {
    marginBottom: 20,
  },
  locationItem: {
    marginBottom: 10,
  },
  locationLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.primary,
  },
  taskDescription: {
    marginBottom: 20,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  taskDate: {
    fontSize: 14,
    color: theme.colors.secondary,
    marginBottom: 8,
  },
  taskBudget: {
    fontSize: 14,
    color: theme.colors.secondary,
  },
  taskAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: "white",
  },
  button: {
    borderRadius: theme.rouded.large,
  },
  buttonContent: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
