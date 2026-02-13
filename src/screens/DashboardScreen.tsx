import { Flame, Trophy } from "lucide-react-native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import GlassCard from "../components/GlassCard";
import ProgressRing from "../components/ProgressRing";

export interface WeeklyDataItem {
  value: number;
  label: string;
  frontColor: string;
  gradientColor: string;
}

interface DashboardScreenProps {
  steps: number;
  dailyGoal: number;
  weeklyData: WeeklyDataItem[];
}

const DashboardScreen = ({
  steps,
  dailyGoal,
  weeklyData,
}: DashboardScreenProps) => (
  <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
    <GlassCard style={styles.mainProgressCard}>
      <ProgressRing steps={steps} dailyGoal={dailyGoal} />

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Flame color="#FF7E5F" size={24} />
          <Text style={styles.statValue}>{(steps * 0.04).toFixed(1)}</Text>
          <Text style={styles.statLabel}>kcal</Text>
        </View>
        <View style={styles.statItem}>
          <Trophy color="#FFCC00" size={24} />
          <Text style={styles.statValue}>{(steps * 0.0008).toFixed(2)}</Text>
          <Text style={styles.statLabel}>km</Text>
        </View>
      </View>
    </GlassCard>

    <Text style={styles.sectionTitle}>Andamento Settimanale</Text>
    <GlassCard style={styles.weeklyCard}>
      <BarChart
        data={weeklyData}
        barWidth={22}
        noOfSections={3}
        barBorderRadius={4}
        frontColor="#FF6A00"
        yAxisThickness={0}
        xAxisThickness={0}
        hideRules
        isAnimated
        animationDuration={1000}
        xAxisLabelTextStyle={{ color: "#636E72", fontSize: 10 }}
        yAxisTextStyle={{ color: "#636E72", fontSize: 10 }}
      />
    </GlassCard>

    <View style={{ height: 100 }} />
  </ScrollView>
);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  mainProgressCard: {
    alignItems: "center",
    paddingVertical: 30,
  },
  statsRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    marginTop: 30,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2D3436",
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: "#636E72",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D3436",
    marginBottom: 15,
    marginTop: 10,
  },
  weeklyCard: {
    paddingLeft: 0,
  },
});

export default DashboardScreen;
