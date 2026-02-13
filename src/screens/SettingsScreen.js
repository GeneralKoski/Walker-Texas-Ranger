import { StyleSheet, Text, TextInput, View } from "react-native";
import GlassCard from "../components/GlassCard";

const SettingsScreen = ({ dailyGoal, onUpdateGoal, isPedometerAvailable }) => (
  <View style={styles.content}>
    <Text style={styles.sectionTitle}>Impostazioni</Text>
    <GlassCard style={styles.settingsCard}>
      <Text style={styles.label}>Obiettivo Giornaliero</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        defaultValue={dailyGoal.toString()}
        onEndEditing={(e) => onUpdateGoal(e.nativeEvent.text)}
        placeholderTextColor="rgba(255,255,255,0.5)"
      />
      <Text style={styles.settingsHint}>
        Consigliato: 10,000 passi per restare in salute.
      </Text>
    </GlassCard>

    <GlassCard style={styles.aboutCard}>
      <Text style={styles.aboutTitle}>Informazioni App</Text>
      <Text style={styles.aboutText}>Versione: 2.0.0 (Advanced)</Text>
      <Text style={styles.aboutText}>
        Sensore:{" "}
        {isPedometerAvailable === "true" ? "Attivo" : "Non Disponibile"}
      </Text>
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
    color: "white",
    marginBottom: 15,
    marginTop: 10,
  },
  settingsCard: {
    paddingVertical: 25,
  },
  label: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: 15,
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  settingsHint: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 12,
    marginTop: 10,
  },
  aboutCard: {
    marginTop: 10,
  },
  aboutTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  aboutText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
    marginBottom: 5,
  },
});

export default SettingsScreen;
