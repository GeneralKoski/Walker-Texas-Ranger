import { type ReactNode } from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

interface GlassCardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const GlassCard = ({ children, style }: GlassCardProps) => (
  <View style={[styles.glassCard, style]}>{children}</View>
);

const styles = StyleSheet.create({
  glassCard: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    overflow: "hidden",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.05)",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
});

export default GlassCard;
