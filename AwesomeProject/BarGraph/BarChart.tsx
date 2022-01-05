import * as shape from 'd3-shape';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { intensityColors } from '../constants';
import { elevatedShadow } from '../common.styles';
import { COLORS, Datum, Mood, MoodColors } from '../index.types';
import { BarGraphStacked } from './BarGraphStacked';

type Props = {
  data: Datum[];
};

export const BarChart = ({ data }: Props) => {
  return (
    <View style={styles.barChartContainer}>
      <BarGraphStacked<Datum, MoodColors, keyof Mood>
        style={{ height: 300 }}
        keys={intensityColors}
        colors={intensityColors}
        data={data}
        contentInset={{ top: 30, bottom: 10, right: 40 }}
        valueAccessor={({ item, key }: { item: Datum; key: keyof Mood }) =>
          item.mood?.[key] || 0
        }
        spacingInner={0.55}
        spacingOuter={0.05}
        offset={shape.stackOffsetNone}
        order={shape.stackOrderNone}
        numberOfTicks={10}
        width={100}
        height={100}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  barChartContainer: {
    ...elevatedShadow,
    paddingHorizontal: 10,
    backgroundColor: COLORS.WHITE,
    borderRadius: 5,
    marginVertical: 15,
    marginHorizontal: 20,
  },
});
