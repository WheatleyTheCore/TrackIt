import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

import AttributeTextInput from "./AttributeTextInput";

export default ({ index, attributes, setAttributes }) => {
  const [title, setTitle] = useState("");

  const removeAttribute = (index) => {
    let attrs = attributes;
    console.log(`attrs before operation: ${attrs}`);
    attrs.splice(index, 1);
    console.log(`attrs after operation: ${attrs}`);
    setAttributes([...attrs]);
  };

  useEffect(() => {
    let attrs = attributes;
    attrs[index] = title;
    setAttributes([...attrs]);
  }, [title]);

  return (
    <View style={styles.container}>
      <AttributeTextInput
        saveValue={setTitle}
        placeholder="name"
        index={index}
        attributes={attributes}
      />
      <EvilIcons
        name="trash"
        size={24}
        onPress={() => removeAttribute(index)}
      />
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
