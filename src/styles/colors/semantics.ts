import {
  BLUE_45,
  BLUE_50,
  GREEN_70,
  GREEN_80,
  PINK_60,
  PURPLE_60,
} from "./colorful";
import { BLUE_TO_PURPLE, PINK_TO_ORANGE } from "./gradation";
import {
  BLUE_GRAY_10,
  BLUE_GRAY_15,
  BLUE_GRAY_30,
  BLUE_GRAY_40,
  BLUE_GRAY_60,
  BLUE_GRAY_70,
  BLUE_GRAY_75,
  BLUE_GRAY_80,
  GRAY_10,
  WHITE,
} from "./monotone";

export const global = {
  base: GRAY_10,
  main: BLUE_50,
} as const;

export const button = {
  font: WHITE,
  black: {
    surface: BLUE_GRAY_70,
    side: BLUE_GRAY_80,
    hover: {
      surface: BLUE_GRAY_60,
      side: BLUE_GRAY_70,
    },
  },
  blue: {
    surface: BLUE_TO_PURPLE,
    side: PURPLE_60,
  },
  pink: {
    surface: PINK_TO_ORANGE,
    side: PINK_60,
  },
  green: {
    surface: GREEN_70,
    side: GREEN_80,
  },
  disabled: {
    surface: BLUE_GRAY_30,
    side: BLUE_GRAY_40,
  },
} as const;

export const roundedButton = {
  font: BLUE_GRAY_70,
  bg: BLUE_GRAY_10,
  border: BLUE_GRAY_15,
  hover: {
    border: BLUE_45,
  },
};

export const missionNumber = {
  font: GRAY_10,
  bg: BLUE_GRAY_75,
};
