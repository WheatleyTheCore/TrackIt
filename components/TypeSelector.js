import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default ({ saveValue, types }) => {
  const [value, setValue] = useState();

  return (
    <Picker
      selectedValue={value}
      onValueChange={(itemValue, itemIndex) => {
        setValue(itemValue);
        saveValue(itemValue);
      }}
      style={{ width: "30%" }}
      itemStyle={{ fontSize: 12, height: 100 }}
    >
      {types.map((item, index) => {
        return <Picker.Item key={index} label={item} value={item} />;
      })}
    </Picker>
  );
};
