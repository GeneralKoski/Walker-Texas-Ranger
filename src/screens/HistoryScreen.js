import { format, subDays } from "date-fns";
import { CheckCircle2 } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import GlassCard from "../components/GlassCard";
import { getStepsRange } from "../../db";

const HistoryScreen = ({ dailyGoal }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [historyRange, setHistoryRange] = useState({
    start: subDays(new Date(), 7),
    end: new Date(),
  });
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    loadHistory();
  }, [historyRange]);

  const loadHistory = async () => {
    const data = await getStepsRange(
      format(historyRange.start, "yyyy-MM-dd"),
      format(historyRange.end, "yyyy-MM-dd"),
    );
    setHistoryData(data);
  };

  return (
    <View style={styles.content}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Storico Passi</Text>
        <TouchableOpacity
          onPress={() => setDatePickerVisibility(true)}
          style={styles.filterBtn}
        >
          <Text style={styles.filterBtnText}>Filtra Data</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {historyData.map((item, index) => (
          <GlassCard key={index} style={styles.historyItem}>
            <View>
              <Text style={styles.historyDate}>
                {format(new Date(item.date), "dd MMMM yyyy")}
              </Text>
              <Text style={styles.historySteps}>{item.count} passi</Text>
            </View>
            <CheckCircle2
              color={
                item.count >= dailyGoal ? "#4CD964" : "rgba(255,255,255,0.3)"
              }
              size={24}
            />
          </GlassCard>
        ))}
        {historyData.length === 0 && (
          <Text style={styles.emptyText}>
            Nessun dato trovato per questo periodo.
          </Text>
        )}
      </ScrollView>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={(date) => {
          setHistoryRange({ start: subDays(date, 7), end: date });
          setDatePickerVisibility(false);
        }}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 15,
    marginTop: 10,
  },
  filterBtn: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
  },
  filterBtnText: {
    color: "white",
    fontSize: 12,
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  historyDate: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  historySteps: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
  },
  emptyText: {
    color: "rgba(255,255,255,0.5)",
    textAlign: "center",
    marginTop: 50,
  },
});

export default HistoryScreen;
