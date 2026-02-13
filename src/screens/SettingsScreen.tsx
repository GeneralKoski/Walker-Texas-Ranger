import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type NativeSyntheticEvent,
  type TextInputEndEditingEventData,
} from "react-native";
import GlassCard from "../components/GlassCard";

interface SettingsScreenProps {
  dailyGoal: number;
  onUpdateGoal: (val: string) => void;
  isPedometerAvailable: string;
}

const SettingsScreen = ({
  dailyGoal,
  onUpdateGoal,
  isPedometerAvailable,
}: SettingsScreenProps) => (
  <View style={styles.content}>
    <Text style={styles.sectionTitle}>Impostazioni</Text>
    <GlassCard style={styles.settingsCard}>
      <Text style={styles.label}>Obiettivo Giornaliero</Text>
      <TextInput
        key={dailyGoal}
        style={styles.input}
        keyboardType="numeric"
        defaultValue={dailyGoal.toString()}
        onEndEditing={(e: NativeSyntheticEvent<TextInputEndEditingEventData>) =>
          onUpdateGoal(e.nativeEvent.text)
        }
        placeholderTextColor="#A0A0A0"
      />
      <Text style={styles.settingsHint}>
        Consigliato: 10,000 passi per restare in salute.
      </Text>
    </GlassCard>

    <GlassCard style={styles.aboutCard}>
      <Text style={styles.aboutTitle}>Informazioni App</Text>
      <Text style={styles.aboutText}>
        Versione: 2.1.0 (Sticky Notification)
      </Text>
      <Text style={styles.aboutText}>
        Sensore:{" "}
        {isPedometerAvailable === "true"
          ? "Attivo ✅"
          : isPedometerAvailable === "permission_denied"
            ? "Permesso Negato ❌"
            : `Stato: ${isPedometerAvailable}`}
      </Text>
      {isPedometerAvailable !== "true" && (
        <Text style={styles.debugHint}>
          Assicurati di aver dato il permesso 'Attività fisica' nelle
          impostazioni del telefono.
        </Text>
      )}
    </GlassCard>
  </View>
);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D3436",
    marginBottom: 15,
    marginTop: 10,
  },
  settingsCard: {
    paddingVertical: 25,
  },
  label: {
    color: "#636E72",
    fontSize: 14,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#F1F2F6",
    borderRadius: 12,
    padding: 15,
    color: "#2D3436",
    fontSize: 18,
    fontWeight: "bold",
  },
  settingsHint: {
    color: "#A0A0A0",
    fontSize: 12,
    marginTop: 10,
  },
  aboutCard: {
    marginTop: 10,
  },
  aboutTitle: {
    color: "#2D3436",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  aboutText: {
    color: "#636E72",
    fontSize: 14,
    marginBottom: 5,
  },
  debugHint: {
    color: "#FF4757",
    fontSize: 12,
    marginTop: 10,
    fontStyle: "italic",
  },
});

export default SettingsScreen;
