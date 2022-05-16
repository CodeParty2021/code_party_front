import {
  BLUE_50,
  BLUE_GREEN_70,
  BLUE_GREEN_80,
  GREEN_60,
  LIGHT_BLUE_60,
  ORANGE_60,
  PINK_45,
  PINK_60,
  PURPLE_60,
} from "./colorful";
import { BLUE_TO_PURPLE, PINK_TO_ORANGE } from "./gradation";
import {
  BLUE_GRAY_30,
  BLUE_GRAY_40,
  BLUE_GRAY_60,
  BLUE_GRAY_70,
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
    surface: BLUE_GREEN_70,
    side: BLUE_GREEN_80,
  },
  disabled: {
    surface: BLUE_GRAY_30,
    side: BLUE_GRAY_40,
  },
} as const;

export const algo = {
  turquoise: LIGHT_BLUE_60,
  leaf: GREEN_60,
  orange: ORANGE_60,
  magenta: PINK_45,
};
