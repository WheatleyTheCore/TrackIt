import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";

import CollectionList from "../components/CollectionList";

import { saveData, loadData, getAllKeys } from "../utils/storageUtils";

export default ({ navigation }) => {
  const [collections, setCollections] = useState([]);
  const [didLoad, setDidLoad] = useState(false);

  useEffect(() => {
    if (!didLoad) {
      getAllKeys(setCollections);
      setDidLoad(true);
    }
  }, [didLoad]);

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <CollectionList collections={collections} />
        <Button
          title="open modal"
          onPress={() => navigation.navigate("CreateCollection")}
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
