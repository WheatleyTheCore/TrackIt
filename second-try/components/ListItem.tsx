
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Swipeable, RectButton } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/EvilIcons";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface ListItemProps {
  index: number;
  item: string;
  clickHandler: (address: string, dataObject?: object) => void;
  deleteFunction: (item: string) => void;
}

export default (props:ListItemProps) => {
  const rightSwipe = (progress, dragX) => {
    return (
      <TouchableOpacity
        style={styles.delete}
        onPress={() => {
          console.log("Delete function ran!");
        }}
      >
        <Icon name="trash" color="white" size={30} />
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={rightSwipe} key={props.index.toString()}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          props.clickHandler("AddItem", { title: props.item });
        }}
      >
        <Text>{props.item}</Text>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: SCREEN_WIDTH,
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  delete: {
    backgroundColor: "red",
    maxWidth: 60,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});