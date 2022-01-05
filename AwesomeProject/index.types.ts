export enum COLORS {
  RED = '#FF8787',
  ORANGE = '#FFB379',
  YELLOW = '#FFDA00',
  GREEN = '#68D393',
  BLUE = '#3BB7B0',
  WHITE = '#FFFFFF',
  GREY = '#E0E0E0',
  PASTEL_BLUE = '#6EC1E4',
  DARK_PASTEL_BLUE = '#19345D',
  BLACK = '#000000',
  PRIMARY = '#4042A7',
  PRIMARY_BACKGROUND = '#F4F4F8',
  PRIMARY_FONT = '#19345D',
}

export type MoodColors = [
  COLORS.RED,
  COLORS.ORANGE,
  COLORS.YELLOW,
  COLORS.BLUE,
  COLORS.GREEN,
];

export type ChosenColor = MoodColors[number];

export type Mood = {
  [key in ChosenColor]?: number;
} & {
  cumulativeSum: number;
};

export type Datum = {
  id: string;
  title: string;
  mood: Mood;
};

export type SelectedFeeling = {
  id: string | null;
};

export type SelectedMood = number;
