import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

export default function App() {
  const [data, setData] = useState("");
  const [storedData, setStoredData] = useState("");

  const saveData = async (data) => {
    try {
      await AsyncStorage.setItem("test", data);
    } catch (e) {
      console.log(e);
    }
  };

  const loadData = async (setData) => {
    try {
      const val = await AsyncStorage.getItem("test");
      setStoredData(val);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadData();
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          width: "80%",
        }}
        onChangeText={(text) => setData(text)}
        value={data}
        onSubmitEditing={() => saveData(data)}
      />
      <Text>Data in storage: {storedData}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
