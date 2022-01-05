// @ts-nocheck
import * as array from 'd3-array';
import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import React, { PureComponent } from 'react';
import { LayoutChangeEvent, View, ViewStyle } from 'react-native';
import { Svg, G, Text, Path, Rect } from 'react-native-svg';

type Props<T, K, N> = {
  data: T[];
  keys: K;
  colors: K;
  offset: typeof shape.stackOffsetNone;
  order: typeof shape.stackOrderNone;
  style: ViewStyle;
  spacingInner: number;
  spacingOuter: number;
  contentInset: Partial<{
    top: number;
    left: number;
    right: number;
    bottom: number;
  }>;
  valueAccessor: ({ item, key }: { item: T; key: N }) => number;
  height: number;
  width: number;
  numberOfTicks: number;
};
type State = {
  width: number;
  height: number;
};

export class BarGraphStacked<T, K, N> extends PureComponent<
  Props<T, K, N>,
  State
> {
  state = {
    width: 0,
    height: 0,
  };

  _onLayout(event: LayoutChangeEvent) {
    const {
      nativeEvent: {
        layout: { height, width },
      },
    } = event;
    this.setState({ height, width });
  }

  calcXScale(domain) {
    const {
      contentInset: { left = 0, right = 0 },
    } = this.props;
    const { width } = this.state;
    return scale
      .scaleLinear()
      .domain(domain)
      .range([left, width - right]);
  }

  calcYScale() {
    const { data } = this.props;

    const {
      contentInset: { top = 0, bottom = 0 },
      spacingInner,
      spacingOuter,
    } = this.props;

    const { height } = this.state;
    return scale
      .scaleBand()
      .domain(data.map((_, index) => index))
      .range([top, height - bottom])
      .paddingInner([spacingInner])
      .paddingOuter([spacingOuter]);
  }

  calcAreas(x, y, series) {
    const { colors, keys } = this.props;

    return array.merge(
      series.map((serie, keyIndex) => {
        return serie.map((entry, entryIndex) => {
          const path = shape
            .area()
            .x0(d => {
              return x(d[0]);
            })
            .x1(d => x(d[1]))
            .y((d, _index) =>
              _index === 0 ? y(entryIndex) : y(entryIndex) + y.bandwidth(),
            )
            .defined(d => !isNaN(d[0]) && !isNaN(d[1]))([entry, entry]);
          return {
            path,
            color: colors[keyIndex],
            key: keys[keyIndex],
            entry,
            entryIndex,
          };
        });
      }),
    );
  }

  calcCategoryTitles(x, y, series) {
    const { colors, keys } = this.props;
    const coordinates = series.map((serie, keyIndex) => {
      return serie.map((entry, entryIndex) => {
        return {
          x: x(entry[1]),
          y: y(entryIndex) - 5,
          key: keys[keyIndex],
        };
      });
    });
    return coordinates[0];
  }

  calcLabelDistances(x, y, series) {
    const { colors, keys } = this.props;
    const coordinates = series.map((serie, keyIndex) => {
      return serie.map((entry, entryIndex) => {
        return {
          x: x(entry[1]),
          y: y(entryIndex) - 5,
          key: keys[keyIndex],
        };
      });
    });
    return coordinates[coordinates.length - 1];
  }

  calcExtent(values) {
    const { gridMax, gridMin } = this.props;
    return array.extent([...values, gridMin, gridMax]);
  }

  calcIndexes(values) {
    return values.map((_, index) => index);
  }

  getSeries() {
    const { data, keys, offset, order, valueAccessor } = this.props;

    return shape
      .stack()
      .keys(keys)
      .value((item, key) => {
        return valueAccessor({ item, key });
      })
      .order(order)
      .offset(offset)(data);
  }

  render() {
    const { data, style, numberOfTicks } = this.props;

    const { height, width } = this.state;

    if (data.length === 0) {
      return <View style={style} />;
    }

    const series = this.getSeries();

    const values = array.merge(array.merge(series));
    const indexes = this.calcIndexes(values);

    const extent = this.calcExtent(values);
    const ticks = array.ticks(extent[0], extent[1], numberOfTicks);

    const xDomain = extent;
    const yDomain = indexes;

    const x = this.calcXScale(xDomain);
    const y = this.calcYScale();

    const bandwidth = y.bandwidth();

    const areas = this.calcAreas(x, y, series);

    const titles = this.calcCategoryTitles(x, y, series);
    const labelDistances = this.calcLabelDistances(x, y, series);

    return (
      <View style={style}>
        <View style={{ flex: 1 }} onLayout={event => this._onLayout(event)}>
          {height > 0 && width > 0 && (
            <Svg style={{ height, width }}>
              {areas.map((bar, index) => {
                const keyIndex = index % data.length;
                const key = `${keyIndex}-${bar.key}`;
                const keyData = data?.[keyIndex]?.[bar.key];

                return (
                  <G key={key}>
                    <Path
                      key={key}
                      {...(keyData?.svg || {})}
                      fill={bar.color}
                      d={bar.path}
                    />
                  </G>
                );
              })}

              {labelDistances.map((bar, index) => {
                const keyIndex = index % data.length;
                const key = `${keyIndex}-${bar.key}`;
                const keyData = data?.[keyIndex];
                const xRect = keyData?.mood?.cumulativeSum
                  ? bar.x - 12
                  : bar.x + 2;
                const xText = keyData?.mood?.cumulativeSum
                  ? bar.x + 12
                  : bar.x + 26;
                return (
                  <G key={key}>
                    <Rect
                      x={xRect}
                      y={bar.y + 4}
                      width={48}
                      height={34}
                      rx={15}
                      fill="white"
                      strokeWidth="2"
                      stroke="black"
                    ></Rect>
                    <Text
                      fontSize={18}
                      fill="black"
                      x={xText}
                      y={bar.y + 27}
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {keyData?.mood?.cumulativeSum}
                    </Text>
                  </G>
                );
              })}
              {titles.map((bar, index) => {
                const keyIndex = index % data.length;
                const key = `${keyIndex}-${bar.key}`;
                const keyData = data?.[keyIndex];
                return (
                  <G key={key}>
                    <Text
                      fontSize={18}
                      fill="black"
                      textAnchor="start"
                      fontWeight="bold"
                      y={bar.y - 5}
                    >
                      {keyData?.title}
                    </Text>
                  </G>
                );
              })}
            </Svg>
          )}
        </View>
      </View>
    );
  }
}
