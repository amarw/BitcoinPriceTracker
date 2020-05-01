import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import config from '../config';
import { Color, Font } from '../theme';
import HeaderView from './HeaderView';
import Chart from './Chart';

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
];

const useGetCurrentPrice = () => {
  const [currentPrice, setCurrentPrice] = React.useState({ rate: '--' });
  React.useEffect(() => {
    axios
      .get(`${config.BASE_URL}/currentprice/USD.json`)
      .then((response) => {
        if (response.data) {
          const {
            bpi: { USD },
          } = response.data;
          setCurrentPrice(USD);
        }
      })
      .catch((error) => console.log(error));
  }, []);
  return [currentPrice, setCurrentPrice];
};

const useGetPriceHistory = () => {
  const [priceHistory, setPriceHistory] = React.useState({});
  React.useEffect(() => {
    axios
      .get(`${config.BASE_URL}/historical/close.json`)
      .then((response) => {
        if (response.data) {
          setPriceHistory(response.data.bpi);
        }
      })
      .catch((error) => console.log(error));
  }, []);
  return [priceHistory, setPriceHistory];
};

export default () => {
  const [currentPrice, setCurrentPrice] = useGetCurrentPrice();
  const [priceHistory, setPriceHistory] = useGetPriceHistory();

  return (
    <View style={styles.container}>
      <HeaderView />
      <View style={styles.horizontalView}>
        <Text style={[styles.currencyLabel, { flex: 2 }]}>BTC</Text>
        <Text
          style={[styles.price, { flex: 2 }]}>{`$ ${currentPrice.rate}`}</Text>
        <View
          style={{
            backgroundColor: Color.green,
            flex: 1,
            width: 60,
            height: 40,
            marginLeft: 10,
          }}
        />
      </View>
      <View style={styles.chart}>
        <Chart data={priceHistory} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chart: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.navyBlue,
  },
  horizontalView: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  currencyLabel: {
    color: Color.white,
    fontSize: Font.size.large,
    fontWeight: Font.weight.bold,
  },
  price: {
    color: Color.white,
    fontSize: Font.size.large,
    fontWeight: Font.weight.bold,
    textAlign: 'right',
  },
});
