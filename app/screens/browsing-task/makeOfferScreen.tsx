import AirCarerText from "@app/constants/AirCarerText";
import theme from "@app/constants/theme";
import { useSnackbar } from "@app/contexts/snackbar.context";
import { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, TextInput, Modal } from "react-native-paper";

interface MakeOfferScreenProps {
  visible: boolean;
  onDismiss: () => void;
}

const MakeOfferScreen = ({ visible, onDismiss }: MakeOfferScreenProps) => {
  const { info, error, success } = useSnackbar();
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handlePriceChange = (text: string) => {
    const numericValue = text.replace(/[^0-9.]/g, "");
    const parts = numericValue.split(".");
    if (parts.length > 2) {
      return;
    }
    if (parts[1] && parts[1].length > 2) {
      return;
    }
    setPrice(numericValue);
  };

  const onConfirm = () => {
    console.log({ price, description });
    onDismiss();
  };

  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      contentContainerStyle={styles.modalContainer}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.expectedPricingContainer}>
          <AirCarerText style={styles.title}>Task Title</AirCarerText>
          <TextInput
            mode="outlined"
            style={styles.input}
            label="Your Price"
            value={price}
            onChangeText={handlePriceChange}
            keyboardType="decimal-pad"
            maxLength={10}
            placeholder="0.00"
            outlineStyle={{
              borderRadius: theme.rouded.small,
              borderWidth: 2.5,
            }}
            left={<TextInput.Affix text="$" />}
          />

          <TextInput
            mode="outlined"
            style={[styles.input, styles.textArea]}
            label="Your Description"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            outlineStyle={{
              borderRadius: theme.rouded.small,
              borderWidth: 2.5,
            }}
          />

          <Button
            mode="contained"
            style={styles.nextButton}
            onPress={onConfirm}
            disabled={!price}
          >
            <AirCarerText variant="button">Confirm</AirCarerText>
          </Button>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: theme.rouded.medium,
    padding: 20,
    maxHeight: "80%",
  },
  container: {
    backgroundColor: theme.colors.paper,
    justifyContent: "flex-start",
    gap: 15,
  },
  expectedPricingContainer: {
    flex: 1,
    gap: 15,
    alignItems: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: theme.colors.primary,
  },
  input: {
    width: "100%",
  },
  textArea: {
    minHeight: 200,
  },
  nextButton: {
    height: 50,
    width: "100%",
    marginTop: 10,
    justifyContent: "center",
    borderRadius: theme.rouded.large,
  },
});

export default MakeOfferScreen;
