import { format } from "date-fns";
import { LinearGradient } from "expo-linear-gradient";
import { Pedometer } from "expo-sensors";
import type { Subscription } from "expo-sensors/build/Pedometer";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import TabBar, { type TabKey } from "./src/components/TabBar";
import DashboardScreen, {
  type WeeklyDataItem,
} from "./src/screens/DashboardScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import {
  getStepsByDate,
  getTarget,
  getWeeklySteps,
  initDatabase,
  saveDailySteps,
  setTarget,
} from "./db";

export default function App() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(10000);
  const [weeklyData, setWeeklyData] = useState<WeeklyDataItem[]>([]);
  const [currentTab, setCurrentTab] = useState<TabKey>("home");

  const pastStepCountRef = useRef(pastStepCount);
  pastStepCountRef.current = pastStepCount;

  const totalSteps = pastStepCount + currentStepCount;

  useEffect(() => {
    let subscription: Subscription | null = null;

    const init = async () => {
      await setup();
      const sub = await subscribe();
      if (sub) {
        subscription = sub;
      }
    };
    init();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (totalSteps >= dailyGoal && pastStepCount < dailyGoal) {
      Alert.alert("Obiettivo Raggiunto!", "Grande lavoro oggi!");
    }
  }, [totalSteps, dailyGoal]);

  const setup = async (): Promise<void> => {
    await initDatabase();
    const goal = await getTarget();
    setDailyGoal(goal);

    const today = format(new Date(), "yyyy-MM-dd");
    const savedSteps = await getStepsByDate(today);
    setPastStepCount(savedSteps);

    const weekly = await getWeeklySteps();
    const formattedWeekly: WeeklyDataItem[] = weekly.reverse().map((item) => ({
      value: item.count,
      label: format(new Date(item.date), "EEE"),
      frontColor: "#FF7E5F",
      gradientColor: "#FEB47B",
    }));
    setWeeklyData(formattedWeekly);
  };

  const subscribe = async (): Promise<Subscription | undefined> => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      const end = new Date();

      const result = await Pedometer.getStepCountAsync(start, end);
      if (result) {
        setPastStepCount(result.steps);
      }

      return Pedometer.watchStepCount((stepResult) => {
        setCurrentStepCount(stepResult.steps);
        const today = format(new Date(), "yyyy-MM-dd");
        saveDailySteps(today, pastStepCountRef.current + stepResult.steps);
      });
    }
  };

  const handleUpdateGoal = async (val: string): Promise<void> => {
    const newGoal = parseInt(val, 10);
    if (!isNaN(newGoal) && newGoal > 0) {
      setDailyGoal(newGoal);
      await setTarget(newGoal);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#6A11CB", "#2575FC"]}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topBar}>
          <Text style={styles.appTitle}>Walker Texas Ranger</Text>
        </View>

        {currentTab === "home" && (
          <DashboardScreen
            steps={totalSteps}
            dailyGoal={dailyGoal}
            weeklyData={weeklyData}
          />
        )}
        {currentTab === "history" && <HistoryScreen dailyGoal={dailyGoal} />}
        {currentTab === "settings" && (
          <SettingsScreen
            dailyGoal={dailyGoal}
            onUpdateGoal={handleUpdateGoal}
            isPedometerAvailable={isPedometerAvailable}
          />
        )}

        <TabBar currentTab={currentTab} onTabChange={setCurrentTab} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  topBar: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "center",
  },
  appTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 1,
  },
});
