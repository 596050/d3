import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { elevatedShadow } from '../common.styles';

import { intensityColors } from '../constants';

import { COLORS } from '../index.types';

export const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.subheader}>How are you feeling today?</Text>
      <View style={styles.instructions}>
        <Text style={styles.instructionsText}>
          Choose a feeling and then a mood represented by one of the colors
        </Text>
        <View style={styles.instructionsLegendContainer}>
          {intensityColors.map(color => (
            <View
              key={color}
              style={{ ...styles.instructionsLegend, backgroundColor: color }}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    ...elevatedShadow,
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: COLORS.WHITE,
  },
  subheader: {
    color: COLORS.PRIMARY_FONT,
    fontSize: 16,
    fontWeight: 'bold',
  },
  instructions: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  instructionsText: {
    fontSize: 12,
    marginRight: 5,
    marginTop: 5,
    color: COLORS.PRIMARY_FONT,
  },
  instructionsLegendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  instructionsLegend: {
    width: 15,
    height: 15,
    marginHorizontal: 2,
    borderRadius: 2,
  },
});
