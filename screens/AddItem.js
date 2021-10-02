import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
  View,
} from "react-native";
import { Input } from "react-native-elements";

import { loadData } from "../utils/storageUtils";

export default ({ route, navigation }) => {
  const [collection, setCollection] = useState({});
  const [userAttrs, setUserAttrs] = useState([]);
  const [didLoad, setDidLoad] = useState(false);

  useEffect(() => {
    if (!didLoad) {
      loadData(setCollection, route.params.collectionTitle);
      setDidLoad(true);
    }
  }, [didLoad]);
  return (
    <SafeAreaView style={styles.container}>
      {Object.keys(collection).length > 0 && (
        <FlatList
          data={Object.keys(collection.structure.userDefinedAttributes)}
          renderItem={({ item }) => {
            return <Text>{item}</Text>;
          }}
        />
      )}
      <Button title="record data" />
    </SafeAreaView>
    //TODO update this to work with new object prefab rather than the array
    // it's probably easiest to just use Object.keys(prefab obj) and keep the rest the same
    //
    //
    //
    // <SafeAreaView stlye={styles.container}>
    //   {didLoad && Object.keys(collection).length > 0 ? (
    //     <FlatList
    //       data={collection.structure.userDefinedAttributes}
    //       keyExtractor={(attr) =>
    //         collection.structure.userDefinedAttributes.indexOf(attr).toString()
    //       } //just set key equal to index
    //       renderItem={({ item }) => {
    //         return <Text>{item}</Text>;
    //       }}
    //       ItemSeparatorComponent={() => {
    //         return (
    //           <View
    //             style={{
    //               height: StyleSheet.hairlineWidth,
    //               backgroundColor: "black",
    //             }}
    //           />
    //         );
    //       }}
    //     />
    //   ) : (
    //     <Text>Auto-Record Data</Text>
    //   )}
    // </SafeAreaView>
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
