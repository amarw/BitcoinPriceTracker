import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
} from 'victory-native';
import { Svg } from 'react-native-svg';
import isEmpty from 'lodash/isEmpty';
import allKeys from 'lodash/keys';
import { Color, Font } from '../theme';

const { width } = Dimensions.get('window');

const prepareChartData = (data) => {
  if (isEmpty(data)) {
    return [];
  }
  return allKeys(data).map((date) => ({ date, price: data[date] }));
};

export default ({ data }) => {
  const memoizedData = React.useMemo(() => prepareChartData(data), [data]);
  return memoizedData.length > 0 ? (
    <View>
      <Svg style={styles.svgBG} width={width} height={350} />
      <VictoryChart
        style={{ backgroundColor: Color.navyBlue }}
        theme={VictoryTheme.material}
        scale={{ x: 'time' }}>
        <VictoryBar
          data={memoizedData}
          x="date"
          y="price"
          style={{
            data: {
              fill: Color.green,
            },
          }}
        />
        {/* x axis */}
        <VictoryAxis
          crossAxis
          style={{
            grid: { stroke: 'none' },
            ticks: { stroke: 'none' },
          }}
          fixLabelOverlap
          tickFormat={(t) => {
            const date = new Date(t);
            return `${date.getDay()}/${date.getMonth()}`;
          }}
        />
        {/*y axis*/}
        <VictoryAxis
          dependentAxis
          style={{
            grid: { stroke: 'none' },
            ticks: { stroke: 'none' },
          }}
        />
      </VictoryChart>
    </View>
  ) : (
    <View style={styles.emptyView}>
      <Text style={styles.text}>No data</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  svgBG: {
    backgroundColor: Color.navyBlue,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  emptyView: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: Font.size.header,
    fontWeight: Font.weight.bold,
    color: Color.white,
  },
});
