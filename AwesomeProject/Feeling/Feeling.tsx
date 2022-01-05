import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

import { ChosenColor, COLORS } from '../index.types';
import { colorNames, intensityColors, isChosenColor } from '../constants';
import { elevatedShadow } from '../common.styles';

export type Props = {
  id: string;
  title: string;
  onClick: (value: string) => void;
  isSelected: boolean;
  intensityIndex: number;
};

export const Feeling = ({
  id,
  isSelected,
  title,
  onClick,
  intensityIndex,
}: Props) => {
  const handleClick = () => {
    onClick(id);
  };

  const highlightColor: ChosenColor | COLORS.WHITE = isSelected
    ? intensityColors[intensityIndex || 0]
    : COLORS.WHITE;

  return (
    <TouchableOpacity style={styles.container} onPress={handleClick}>
      <View
        style={{
          ...styles.innerContainer,
          borderWidth: isSelected ? 2 : 0,
          borderColor: highlightColor,
        }}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        {isSelected ? (
          <Text
            adjustsFontSizeToFit={true}
            style={{
              ...styles.chosenColorText,
              backgroundColor: highlightColor,
            }}
          >
            {isChosenColor(highlightColor)
              ? `with a touch of ${colorNames[highlightColor]}`
              : null}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: COLORS.WHITE,
  },
  container: {
    ...elevatedShadow,
    height: 50,
    backgroundColor: COLORS.WHITE,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 20,
  },
  titleContainer: {
    flex: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_FONT,
  },
  chosenColorText: {
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
