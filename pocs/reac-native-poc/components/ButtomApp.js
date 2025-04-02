import React from 'react';
import { TouchableHighlight, View, Text, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function ButtomApp({ buttonText, color, onPress, icon }) {
  return (
    <View>
      <TouchableHighlight
        underlayColor={"#09f"}
        onPress={onPress}
        style={[styles.touchableHighlight, { backgroundColor: color }]}
      >
        <View style={styles.buttonContent}>
          {icon && <AntDesign name={icon} size={24} color="white" style={styles.icon} />} 
          <Text style={styles.buttonText}>{buttonText}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  touchableHighlight: {
    height: 60,
    width: 400,    
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 10
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10, 
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
