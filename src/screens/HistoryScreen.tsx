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
import { getStepsRange } from "../../db";
import GlassCard from "../components/GlassCard";

interface HistoryItem {
  id: number;
  date: string;
  count: number;
}

interface HistoryScreenProps {
  dailyGoal: number;
}

interface DateRange {
  start: Date;
  end: Date;
}

const HistoryScreen = ({ dailyGoal }: HistoryScreenProps) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [historyRange, setHistoryRange] = useState<DateRange>({
    start: subDays(new Date(), 7),
    end: new Date(),
  });
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);

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
              color={item.count >= dailyGoal ? "#4CD964" : "#DCDDE1"}
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
        onConfirm={(date: Date) => {
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
    color: "#2D3436",
    marginBottom: 15,
    marginTop: 10,
  },
  filterBtn: {
    backgroundColor: "#FF6A00",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
  },
  filterBtnText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  historyDate: {
    color: "#2D3436",
    fontSize: 16,
    fontWeight: "600",
  },
  historySteps: {
    color: "#636E72",
    fontSize: 14,
  },
  emptyText: {
    color: "#A0A0A0",
    textAlign: "center",
    marginTop: 50,
  },
});

export default HistoryScreen;
