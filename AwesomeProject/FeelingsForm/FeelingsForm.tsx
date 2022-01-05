import React from 'react';
import { Text, View, Pressable, Dimensions, StyleSheet } from 'react-native';

import { Feeling } from '../Feeling';
import { DATA } from '../constants';
import { elevatedShadow } from '../common.styles';
import { COLORS, SelectedFeeling, SelectedMood } from '../index.types';

type Props = {
  handleSelectMood: (id: string) => void;
  selectedFeeling: SelectedFeeling;
  selectedMood: SelectedMood;
  handleSubmit: () => void;
};

export const FeelingsForm = ({
  handleSelectMood,
  selectedFeeling,
  selectedMood,
  handleSubmit,
}: Props) => {
  return (
    <>
      <View
        style={{
          marginVertical: 10,
        }}
      >
        {DATA.map(datum => {
          return (
            <Feeling
              key={datum.id}
              title={datum.title}
              id={datum.id}
              onClick={handleSelectMood}
              isSelected={selectedFeeling.id === datum.id}
              intensityIndex={selectedMood}
            />
          );
        })}
      </View>

      <Pressable
        onPress={handleSubmit}
        style={({ pressed }) => [
          styles.submitButton,
          {
            opacity: pressed ? 0.5 : 1,
          },
        ]}
      >
        {() => <Text style={styles.submitButtonText}>Add</Text>}
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    height: Math.round(Dimensions.get('window').height),
    justifyContent: 'space-between',
    backgroundColor: COLORS.PRIMARY_BACKGROUND,
  },
  topbar: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  header: {
    ...elevatedShadow,
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: COLORS.WHITE,
  },
  header_sub: {
    color: COLORS.PRIMARY_FONT,
    fontSize: 16,
    fontWeight: 'bold',
  },
  appWrapper: {
    flex: 1,
  },
  barChartContainer: {
    ...elevatedShadow,
    paddingHorizontal: 10,
    backgroundColor: COLORS.WHITE,
    borderRadius: 5,
    marginVertical: 15,
    marginHorizontal: 20,
  },
  submitButton: {
    ...elevatedShadow,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: COLORS.PRIMARY,
  },
  submitButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: COLORS.WHITE,
  },
});
