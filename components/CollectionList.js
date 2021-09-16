import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { ListItem } from "react-native-elements";

export default ({ collections }) => {
  return collections.map((collection, index) => {
    return (
      <ListItem key={index} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{collection}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    );
  });
};
