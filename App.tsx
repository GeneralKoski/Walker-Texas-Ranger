import { format } from "date-fns";
import { Pedometer } from "expo-sensors";
import type { Subscription } from "expo-sensors/build/Pedometer";
import { useEffect, useRef, useState } from "react";
import { Alert, AppState, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import {
  getStepsByDate,
  getTarget,
  getWeeklySteps,
  initDatabase,
  saveDailySteps,
  setTarget,
} from "./db";

import TabBar, { type TabKey } from "./src/components/TabBar";
import DashboardScreen, {
  type WeeklyDataItem,
} from "./src/screens/DashboardScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

export default function App() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(10000);
  const [weeklyData, setWeeklyData] = useState<WeeklyDataItem[]>([]);
  const [currentTab, setCurrentTab] = useState<TabKey>("home");

  const pastStepCountRef = useRef(pastStepCount);
  const lastSavedStepsRef = useRef(0);
  const appState = useRef(AppState.currentState);

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

    // Salva quando l'app viene chiusa o messa in background
    const appStateSub = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current === "active" &&
        nextAppState.match(/inactive|background/)
      ) {
        saveDailySteps(
          format(new Date(), "yyyy-MM-dd"),
          pastStepCountRef.current + currentStepCount,
        );
      }
      appState.current = nextAppState;
    });

    return () => {
      if (subscription) {
        subscription.remove();
      }
      appStateSub.remove();
    };
  }, [currentStepCount]);

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
    lastSavedStepsRef.current = savedSteps;

    const weekly = await getWeeklySteps();
    const formattedWeekly: WeeklyDataItem[] = weekly.reverse().map((item) => ({
      value: item.count,
      label: format(new Date(item.date), "EEE"),
      frontColor: "#FF6A00",
      gradientColor: "#FF8C00",
    }));
    setWeeklyData(formattedWeekly);
  };

  const subscribe = async (): Promise<Subscription | undefined> => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      // Richiedi esplicitamente i permessi (fondamentale su Android/iOS)
      const { status } = await Pedometer.requestPermissionsAsync();
      if (status !== "granted") {
        setIsPedometerAvailable("denied");
        return;
      }

      const start = new Date();
      start.setHours(0, 0, 0, 0);
      const end = new Date();

      const result = await Pedometer.getStepCountAsync(start, end);
      if (result) {
        setPastStepCount(result.steps);
        lastSavedStepsRef.current = result.steps;
      }

      return Pedometer.watchStepCount((stepResult) => {
        setCurrentStepCount(stepResult.steps);
        const total = pastStepCountRef.current + stepResult.steps;

        // Salva nel DB solo ogni 100 passi per risparmiare batteria
        if (total - lastSavedStepsRef.current >= 100) {
          const today = format(new Date(), "yyyy-MM-dd");
          saveDailySteps(today, total);
          lastSavedStepsRef.current = total;
        }
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
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.background} />

        <SafeAreaView style={styles.safeArea}>
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
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    paddingTop: 20,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#F8F9FA",
  },
  safeArea: {
    flex: 1,
  },
  appTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF6A00",
    letterSpacing: 1,
  },
});
