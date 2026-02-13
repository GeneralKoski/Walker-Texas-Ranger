import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedProps,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ProgressRing = ({ steps, dailyGoal }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    const percentage = Math.min(steps / dailyGoal, 1);
    progress.value = withSpring(percentage, { damping: 15 });
  }, [steps, dailyGoal]);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = 2 * Math.PI * 80 * (1 - progress.value);
    const color = interpolateColor(
      progress.value,
      [0, 0.5, 1],
      ["#FF3B30", "#FFCC00", "#4CD964"],
    );
    return {
      strokeDashoffset,
      stroke: color,
    };
  });

  return (
    <View style={styles.chartContainer}>
      <Svg height="240" width="240" viewBox="0 0 200 200">
        <Circle
          cx="100"
          cy="100"
          r="80"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="20"
          fill="none"
        />
        <AnimatedCircle
          cx="100"
          cy="100"
          r="80"
          strokeWidth="20"
          fill="none"
          strokeDasharray={2 * Math.PI * 80}
          animatedProps={animatedProps}
          strokeLinecap="round"
          transform="rotate(-90 100 100)"
        />
      </Svg>
      <View style={styles.stepInfo}>
        <Text style={styles.stepCountText}>{steps}</Text>
        <Text style={styles.stepSubText}>passi oggi</Text>
        <Text style={styles.goalText}>Target: {dailyGoal}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  stepInfo: {
    position: "absolute",
    alignItems: "center",
  },
  stepCountText: {
    fontSize: 48,
    fontWeight: "800",
    color: "white",
  },
  stepSubText: {
    fontSize: 16,
    color: "rgba(255,255,255,0.7)",
    marginTop: -5,
  },
  goalText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.5)",
    marginTop: 10,
  },
});

export default ProgressRing;
