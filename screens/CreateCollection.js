import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { Input } from "react-native-elements";

import ItemAttribute from "../components/ItemAttribute";
import SensorSelector from "../components/SensorSelector";

import { saveData, loadData } from "../utils/storageUtils";

//TODO make this screen scrollable if there are lots and lots of attributes.

export default ({ navigation }) => {
  const [collectionName, setCollectionName] = useState("");
  const [attributes, setAttributes] = useState([""]);
  const [sensors, setSensors] = useState([]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Input
          containerStyle={{
            height: 30,
            width: "70%",
          }}
          onChangeText={(text) => {
            setCollectionName(text);
          }}
          value={collectionName}
          placeholder={"Collection Name"}
        />
        <View>
          <Text>Attributes</Text>
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
              attrs[attrs.length] = "";
              setAttributes([...attrs]);
            }}
          />
        </View>
        <View>
          <Text>Sensors to record when saving item</Text>
          <SensorSelector setSensors={setSensors} />
        </View>
        <Button
          title="Create Collection"
          onPress={() => {
            const data = JSON.stringify({
              structure: {
                userDefinedAttributes: attributes,
                sensors: sensors,
              },
              items: [],
            });

            //TODO get collection name and use that as save key
            saveData(data, collectionName);

            navigation.navigate("AddItem", { test: "what up this is a test" });
          }}
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
