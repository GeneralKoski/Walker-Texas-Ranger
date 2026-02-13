import { History, Home, type LucideIcon, Settings } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type TabKey = "home" | "history" | "settings";

interface Tab {
  key: TabKey;
  label: string;
  Icon: LucideIcon;
}

const tabs: Tab[] = [
  { key: "home", label: "Oggi", Icon: Home },
  { key: "history", label: "Storico", Icon: History },
  { key: "settings", label: "Impostazioni", Icon: Settings },
];

interface TabBarProps {
  currentTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

const TabBar = ({ currentTab, onTabChange }: TabBarProps) => (
  <View style={styles.tabBar}>
    {tabs.map(({ key, label, Icon }) => (
      <TouchableOpacity
        key={key}
        onPress={() => onTabChange(key)}
        style={styles.tabItem}
      >
        <Icon color={currentTab === key ? "#FF6A00" : "#A0A0A0"} size={24} />
        <Text
          style={[styles.tabLabel, currentTab === key && styles.tabLabelActive]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    flexDirection: "row",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
    alignItems: "center",
    justifyContent: "space-around",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
  },
  tabLabel: {
    fontSize: 10,
    color: "#A0A0A0",
    marginTop: 4,
  },
  tabLabelActive: {
    color: "#FF6A00",
    fontWeight: "600",
  },
});

export default TabBar;
