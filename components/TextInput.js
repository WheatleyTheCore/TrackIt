import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";

export default ({ saveValue, placeholder, index, attributes }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(attributes[index]);
  }, [attributes]);

  return (
    <TextInput
      style={{
        height: 30,
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        width: "70%",
      }}
      onChangeText={(text) => {
        setValue(text);
        saveValue(value);
      }}
      value={value}
      placeholder={placeholder}
    />
  );
};
