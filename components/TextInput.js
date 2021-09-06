import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";

export default ({ saveValue, placeholder }) => {
  const [value, setValue] = useState("");

  return (
    <TextInput
      style={{
        height: 30,
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        width: "50%",
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
