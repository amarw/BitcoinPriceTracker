import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import allKeys from 'lodash/keys';

import HeaderView from './HeaderView';
import Chart from './Chart';
import PriceDifferenceLabel from './PriceDifferenceLabel';
import config from '../config';
import { Color, Font } from '../theme';

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

const useGetMyQuantity = () => {
  const [myQuantity, setMyQuantity] = React.useState();
  React.useEffect(() => {
    AsyncStorage.getItem('myQuantity')
      .then((value) => {
        if (value) {
          setMyQuantity(value);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return [myQuantity, setMyQuantity];
};

const useGetMyPrice = () => {
  const [myPrice, setMyPrice] = React.useState();
  React.useEffect(() => {
    AsyncStorage.getItem('myPrice')
      .then((value) => {
        if (value) {
          setMyPrice(value);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return [myPrice, setMyPrice];
};

export default () => {
  const [currentPrice, setCurrentPrice] = useGetCurrentPrice();
  const [priceHistory, setPriceHistory] = useGetPriceHistory();
  const [myPrice, setMyPrice] = useGetMyPrice();
  const [myQuantity, setMyQuantity] = useGetMyQuantity();
  const [inputPrice, setInputPrice] = React.useState('');
  const [inputQuantity, setInputQuantity] = React.useState('');
  const allDates = allKeys(priceHistory);
  const yesterdayPrice = priceHistory[allDates[allDates.length - 1]];
  const btcPrice = currentPrice.rate_float || 0.0;
  const onChangePurchasePrice = (text) => setInputPrice(text);
  const onChangeQuantity = (text) => setInputQuantity(text);
  const onSave = async () => {
    const promises = [];
    promises.push(AsyncStorage.setItem('myPrice', inputPrice));
    promises.push(AsyncStorage.setItem('myQuantity', inputQuantity));
    await Promise.all(promises);
    setMyPrice(inputPrice);
    setMyQuantity(inputQuantity);
    setInputPrice('');
    setInputQuantity('');
  };
  const saveDisabled = inputQuantity.length === 0 || inputPrice.length === 0;
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <HeaderView
        currentPrice={btcPrice}
        purchasePrice={parseFloat(myPrice)}
        quantity={myQuantity}
      />
      <View style={styles.horizontalView}>
        <Text style={[styles.currencyLabel, { flex: 2 }]}>BTC</Text>
        <Text style={[styles.price, { flex: 2 }]}>
          {`$ ${btcPrice.toFixed(2)}`}
        </Text>
        <PriceDifferenceLabel oldPrice={yesterdayPrice} newPrice={btcPrice} />
      </View>
      <View style={styles.chart}>
        <Chart data={priceHistory} />
      </View>
      <View style={{ margin: 16 }}>
        <Text style={styles.currencyLabel}>
          Bitcoin purchase price (in USD)
        </Text>
        <TextInput
          style={styles.textInput}
          value={inputPrice}
          onChangeText={onChangePurchasePrice}
          blurOnSubmit
          placeholderTextColor={Color.navyBlue}
          placeholder="Enter your purchase price"
          keyboardType="numeric"
        />
        <Text style={[styles.currencyLabel, { marginTop: 8 }]}>Quantity</Text>
        <TextInput
          style={styles.textInput}
          value={inputQuantity}
          onChangeText={onChangeQuantity}
          blurOnSubmit
          placeholderTextColor={Color.navyBlue}
          placeholder="Enter purchased quantity"
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: saveDisabled ? 'grey' : Color.navyBlue },
          ]}
          onPress={onSave}
          disabled={saveDisabled}>
          <Text style={[styles.currencyLabel, { padding: 15 }]}>Save</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
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
  textInput: {
    color: Color.white,
    fontSize: Font.size.regular,
    fontWeight: Font.weight.thin,
    marginVertical: 10,
    height: 30,
    borderBottomColor: Color.navyBlue,
    borderBottomWidth: 1,
  },
  button: {
    marginTop: 8,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
