/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, SafeAreaView, View, StatusBar } from 'react-native';
import PriceTrackerScreen from './components/PriceTrackerScreen';
import { Color } from './theme';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <PriceTrackerScreen />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.darkNavyBlue,
  },
});

export default App;
