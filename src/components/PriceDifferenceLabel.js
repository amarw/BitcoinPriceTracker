import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Color, Font } from '../theme';

export default ({ oldPrice, newPrice }) => {
  const diff = newPrice - oldPrice;
  const backgroundColor = diff > 0 ? Color.green : Color.darkRed;
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.text}>{diff.toFixed(2)}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 40,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Color.white,
    fontSize: Font.size.large,
    fontWeight: Font.weight.bold,
    textAlign: 'center',
  },
});
