import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";

import ItemAttribute from "../components/ItemAttribute";

import { saveData, loadData } from "../utils/storageUtils";

//TODO make this screen scrollable if there are lots and lots of attributes.

export default ({ navigation }) => {
  const [attributes, setAttributes] = useState([{ title: "", type: "Text" }]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {attributes.map((attr, index) => {
          console.log(`rendering index ${index}`);
          return (
            <ItemAttribute
              index={index}
              key={index}
              attributes={attributes}
              setAttributes={setAttributes}
            />
          );
        })}
        <Button
          title="new attribute"
          onPress={() => {
            let attrs = attributes;
            attrs[attrs.length] = { title: "", type: "Text" };
            setAttributes([...attrs]);
          }}
        />
        <Button
          title="read structure"
          onPress={() => console.log(attributes)}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
