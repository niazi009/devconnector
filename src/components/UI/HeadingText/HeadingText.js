import React from "react";
import { StyleSheet, Text } from "react-native";
const headingText = props => (
  <Text {...props} style={[styles.textheading, props.style]}>
    {props.children}
  </Text>
);

const styles = StyleSheet.create({
  textheading: {
    fontSize: 28,
    fontWeight: "bold"
  }
});
export default headingText;
