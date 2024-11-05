import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import theme from "@app/constants/theme";
import AirCarerText from "@app/constants/AirCarerText";
import { i18n } from "@app/locales/i18n";
import HalfScreenModal from "../../components/halfScreen.modal";

export default function TaskConclusionScreen(props: any) {
  const { navigation } = props;

  const makeOffer = () => {
    // Handle make offer logic
    console.log("Make offer pressed");
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Budget Section */}
        <View style={styles.budgetSection}>
          <Text style={styles.currencySymbol}>$</Text>
          <View style={styles.budgetTextContainer}>
            <Text style={styles.budgetAmount}>150 AUD</Text>
            <Text style={styles.budgetLabel}>Budget</Text>
          </View>
        </View>

        {/* Task Details Section */}
        <View style={styles.detailsSection}>
          <Text style={styles.detailsTitle}>An old bed frame consisting of:</Text>
          <Text style={styles.detailsText}>- 2 x 1.8m metal poles</Text>
          <Text style={styles.detailsText}>- 2 x metal bed ends</Text>
          <Text style={styles.detailsText}>- 1 x set of single-bed Ikea bed slats</Text>
        </View>

        {/* Location Details */}
        <View style={styles.locationSection}>
          <View style={styles.locationItem}>
            <Text style={styles.locationLabel}>Pickup location:</Text>
            <Text style={styles.locationText}>Thornbury VIC, Australia</Text>
          </View>
          <View style={styles.locationItem}>
            <Text style={styles.locationLabel}>Drop-off location:</Text>
            <Text style={styles.locationText}>Parkdale VIC, Australia</Text>
          </View>
          <View style={styles.locationItem}>
            <Text style={styles.locationLabel}>Removals size:</Text>
            <Text style={styles.locationText}>A few items</Text>
          </View>
          <View style={styles.locationItem}>
            <Text style={styles.locationLabel}>Stairs:</Text>
            <Text style={styles.locationText}>No</Text>
          </View>
        </View>

        {/* Tab Section */}
        <View style={styles.tabSection}>
          <View style={styles.tabContainer}>
            <View style={[styles.tab, styles.activeTab]}>
              <Text style={[styles.tabText, styles.activeTabText]}>Offers 2</Text>
            </View>
            <View style={styles.tab}>
              <Text style={styles.tabText}>Questions</Text>
            </View>
          </View>
        </View>

        {/* Task Description */}
        <View style={styles.taskDescription}>
          <Text style={styles.taskTitle}>Move a bed frame and drive it to another location</Text>
          <Text style={styles.taskDate}>Before Sun, 20 Oct·Thornbury VIC, Australia</Text>
          <Text style={styles.taskBudget}>Task budget</Text>
          <Text style={styles.taskAmount}>$150.00</Text>
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
              <AirCarerText variant="button">Make offer</AirCarerText>
            </Button>
          </View>
        </HalfScreenModal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  budgetSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  currencySymbol: {
    fontSize: 24,
    color: theme.colors.primary,
    marginRight: 8,
  },
  budgetTextContainer: {
    flexDirection: 'column',
  },
  budgetAmount: {
    fontSize: 24,
    fontWeight: 'bold',
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
    fontWeight: 'bold',
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
    fontWeight: '500',
    color: theme.colors.primary,
  },
  locationText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  tabSection: {
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    borderRadius: theme.rouded.medium,
    backgroundColor: theme.colors.surface,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.rouded.small,
  },
  tabText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  activeTabText: {
    color: 'white',
  },
  taskDescription: {
    marginBottom: 20,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: 'white',
  },
  button: {
    borderRadius: theme.rouded.large,
  },
  buttonContent: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});