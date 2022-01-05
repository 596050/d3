import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import { BarChart } from './BarGraph';
import { intensityColors, DATA } from './constants';
import { updateData } from './util';
import { Header } from './Header';
import { FeelingsForm } from './FeelingsForm';
import { COLORS, Datum, SelectedFeeling, SelectedMood } from './index.types';

export default function App() {
  const [selectedFeeling, setSelectedFeeling] = useState<SelectedFeeling>({
    id: null,
  });
  const [selectedMood, setSelectedMood] = useState<SelectedMood>(NaN);
  const [data, setData] = useState<Datum[]>(DATA);

  const handleSelectMood = (id: string) => {
    setSelectedFeeling({
      id,
    });
    if (selectedFeeling.id === id) {
      setSelectedMood(
        intensity => ((intensity || 0) + 1) % intensityColors.length,
      );
    } else if (selectedFeeling.id === null) {
      setSelectedMood(0);
    }
  };

  const handleSubmit = () => {
    const updatedData = updateData({ data, selectedFeeling, selectedMood });
    setData(updatedData);
    setSelectedFeeling({ id: null });
    setSelectedMood(NaN);
  };

  return (
    <SafeAreaView style={styles.appWrapper}>
      <View style={styles.screenContainer}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor={COLORS.DARK_PASTEL_BLUE}
          translucent={true}
          networkActivityIndicatorVisible={true}
        />
        <View style={styles.statusBar} />

        <Header />

        <ScrollView>
          <FeelingsForm
            handleSelectMood={handleSelectMood}
            selectedFeeling={selectedFeeling}
            selectedMood={selectedMood}
            handleSubmit={handleSubmit}
          />
          <BarChart data={data} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    height: Math.round(Dimensions.get('window').height),
    justifyContent: 'space-between',
    backgroundColor: COLORS.PRIMARY_BACKGROUND,
  },
  appWrapper: {
    flex: 1,
  },
  statusBar: {
    height: StatusBar.currentHeight,
  },
});
