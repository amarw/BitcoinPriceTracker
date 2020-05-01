import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Color, Font } from '../theme';

export default ({ currentPrice, quantity, purchasePrice }) => {
  const valueAtBuy = quantity * purchasePrice;
  const currentValue = quantity * currentPrice;
  const difference = currentValue - valueAtBuy;
  const color = difference > 0 ? Color.green : Color.darkRed;
  return (
    <View style={styles.header}>
      <Text style={[styles.headerTitle, { flex: 2 }]}>Wallet</Text>
      {!Number.isNaN(valueAtBuy) && (
        <Text style={[styles.headerText, { flex: 1 }]}>
          $ {valueAtBuy.toFixed(2)}
        </Text>
      )}
      {!Number.isNaN(difference) && (
        <Text style={[styles.headerText, { flex: 1, color }]}>
          {difference.toFixed(2)}
        </Text>
      )}
    </View>
  );
};

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
    fontSize: Font.size.regular,
    fontWeight: Font.weight.bold,
    textAlign: 'center',
  },
});
