import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import TextInput from "./TextInput";
import TypeSelector from "./TypeSelector";

export default ({ index, attributes, setAttributes }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Text");

  useEffect(() => {
    let attrs = attributes;
    attrs[index] = { title: title, type: type };
    setAttributes([...attrs]);
  }, [title, type]);

  const types = [
    "Text",
    "Number",
    "Location",
    "Accelerometer",
    "Gyroscope",
    "Magnetometer",
  ];

  return (
    <View style={styles.container}>
      <TextInput saveValue={setTitle} placeholder="name" />
      <TypeSelector saveValue={setType} types={types} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly",
    minHeight: 100,
  },
});
