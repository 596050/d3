import { COLORS, ChosenColor, MoodColors, Datum } from './index.types';

export const colorNames: { [key in ChosenColor]: string } = {
  [COLORS.RED]: 'Red',
  [COLORS.ORANGE]: 'Orange',
  [COLORS.YELLOW]: 'Yellow',
  [COLORS.BLUE]: 'Blue',
  [COLORS.GREEN]: 'Green',
};

export function isChosenColor(arg: any): arg is ChosenColor {
  return intensityColors.some(color => color === arg);
}

export const intensityColors: MoodColors = [
  COLORS.RED,
  COLORS.ORANGE,
  COLORS.YELLOW,
  COLORS.BLUE,
  COLORS.GREEN,
];

export const DATA: Datum[] = [
  {
    id: '1',
    title: 'Meh',
    mood: {
      cumulativeSum: 0,
    },
  },
  {
    id: '2',
    title: 'Content',
    mood: {
      cumulativeSum: 0,
    },
  },
  {
    id: '3',
    title: 'Happy',
    mood: {
      cumulativeSum: 0,
    },
  },
  {
    id: '4',
    title: 'Frustrated',
    mood: {
      cumulativeSum: 0,
    },
  },
];
