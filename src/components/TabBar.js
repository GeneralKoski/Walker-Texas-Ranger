import { History, Home, Settings } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const tabs = [
  { key: "home", label: "Oggi", Icon: Home },
  { key: "history", label: "Storico", Icon: History },
  { key: "settings", label: "Impostazioni", Icon: Settings },
];

const TabBar = ({ currentTab, onTabChange }) => (
  <View style={styles.tabBar}>
    {tabs.map(({ key, label, Icon }) => (
      <TouchableOpacity
        key={key}
        onPress={() => onTabChange(key)}
        style={styles.tabItem}
      >
        <Icon
          color={currentTab === key ? "white" : "rgba(255,255,255,0.5)"}
          size={24}
        />
        <Text
          style={[
            styles.tabLabel,
            currentTab === key && styles.tabLabelActive,
          ]}
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
    backgroundColor: "rgba(0,0,0,0.3)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "space-around",
  },
  tabItem: {
    alignItems: "center",
  },
  tabLabel: {
    fontSize: 10,
    color: "rgba(255,255,255,0.5)",
    marginTop: 4,
  },
  tabLabelActive: {
    color: "white",
  },
});

export default TabBar;
