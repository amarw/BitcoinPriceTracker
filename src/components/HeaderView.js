import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Color, Font } from '../theme';

export default () => (
  <View style={styles.header}>
    <Text style={[styles.headerTitle, { flex: 2 }]}>Wallet</Text>
    <Text style={[styles.headerText, { flex: 1 }]}>$ 49.96</Text>
    <Text style={[styles.headerText, { flex: 1 }]}>+1.96</Text>
    <TouchableOpacity style={{ flex: 0.5 }} onPress={() => {}}>
      <Text style={[styles.headerText, { fontSize: Font.size.header }]}>+</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  header: {
    height: 80,
    backgroundColor: Color.black,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Color.borderBlue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: Color.white,
    marginHorizontal: 16,
    fontSize: Font.size.header,
    fontWeight: Font.weight.bold,
  },
  headerText: {
    color: Color.white,
    fontSize: Font.size.header,
    fontWeight: Font.weight.thin,
    textAlign: 'center',
  },
});
