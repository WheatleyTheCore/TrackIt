import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import ItemAttribute from "../components/ItemAttribute";

import { saveData, loadData } from "../utils/storageUtils";

export default ({ navigation }) => {
  const [data, setData] = useState("");
  const [storedData, setStoredData] = useState("");

  useEffect(() => {
    loadData(setStoredData, "test");
  });
  return (
    <View style={styles.container}>
      <Text>Data in storage: {storedData}</Text>
      <Button
        title="open modal"
        onPress={() => navigation.navigate("CreateCollection")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
