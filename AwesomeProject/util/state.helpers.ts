import { intensityColors } from '../constants';
import { Datum, SelectedFeeling, SelectedMood } from '../index.types';

export const updateData = ({
  data,
  selectedFeeling,
  selectedMood,
}: {
  data: Datum[];
  selectedMood: SelectedMood;
  selectedFeeling: SelectedFeeling;
}): Datum[] => {
  const increment = 1;
  const itemToUpdate = data.find(d => d.id === selectedFeeling.id);
  const filteredItems = data.filter(d => d.id !== selectedFeeling.id);
  const mood = intensityColors[selectedMood];
  const moodCount = (itemToUpdate?.mood[mood] || 0) + increment;
  const newData = [
    ...filteredItems,
    ...(itemToUpdate
      ? [
          {
            ...itemToUpdate,
            mood: {
              ...itemToUpdate?.mood,
              cumulativeSum: itemToUpdate?.mood.cumulativeSum + increment,
              [mood]: moodCount,
            },
          },
        ]
      : []),
  ].sort((a, b) => b.mood.cumulativeSum - a.mood.cumulativeSum);
  return newData;
};
