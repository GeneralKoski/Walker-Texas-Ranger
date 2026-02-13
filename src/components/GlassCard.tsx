import { LinearGradient } from "expo-linear-gradient";
import { type ReactNode } from "react";
import { StyleSheet, type StyleProp, View, type ViewStyle } from "react-native";

interface GlassCardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const GlassCard = ({ children, style }: GlassCardProps) => (
  <View style={[styles.glassCard, style]}>
    <LinearGradient
      colors={["rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0.05)"]}
      style={StyleSheet.absoluteFillObject}
    />
    {children}
  </View>
);

const styles = StyleSheet.create({
  glassCard: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
});

export default GlassCard;
