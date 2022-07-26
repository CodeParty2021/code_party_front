
import {
  BLUE_45,
  BLUE_50,
  BLUE_GREEN_70,
  BLUE_GREEN_80,
  LIGHT_BLUE_60,
  ORANGE_60,
  GREEN_60,
  PINK_45,
  PINK_60,
  PURPLE_60,
  PINK_20,
  YELLOW_20,
  PURPLE_20,
  LIGHT_BLUE_20,
  GREEN_70,
  BLUE_47,
  GREEN_50,
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
  GRAY_00,
  GRAY_10,
  GRAY_100,
  GRAY_20,
  GRAY_30,
  GRAY_80,
  GRAY_90,
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

export const modeSelectCard = {
  bg: GRAY_10,
  border: GRAY_20,
  font: BLUE_GRAY_70,
  hover: {
    bg: BLUE_47,
    border: BLUE_47,
    font: WHITE,
  },
  hoverInfo: {
    bg: BLUE_GRAY_60,
    font: GRAY_10,
  },
};

export const iconCircle = {
  bg: GREEN_70,
  icon: WHITE,
};

export const star = {
  pink: PINK_20,
  yellow: YELLOW_20,
  purple: PURPLE_20,
  blue: LIGHT_BLUE_20,
  gray: GRAY_20,
};

export const algo = {
  turquoise: LIGHT_BLUE_60,
  leaf: GREEN_60,
  orange: ORANGE_60,
  magenta: PINK_45,
};

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
export const setName = {
  modal: {
    border: WHITE,
    font: BLUE_GRAY_60,
  },
} as const;

export const iconButton = {
  bg: WHITE,
  icon: BLUE_45,
};

export const algoEditor = {
  algoColor: LIGHT_BLUE_60,
  algoBody: BLUE_GRAY_75,
  algoFrame: GRAY_10,
  codingBG: GRAY_80,
};

export const descriptionPanel = {
  background:GRAY_10,
  backline:GRAY_30,
  table:{background:GRAY_20,
    color:GRAY_100,},
  stepHeader:{
    stepColor:BLUE_45,
    titleColor:GRAY_90 //ここfigmaがカラーパレットにない色。確認中
  },
  stageHeader:{
    color:GRAY_100,
    progressBar:GRAY_30,
    progressFill:BLUE_50
  },
  heading:{
    background:GRAY_100,
    color:GRAY_100,
    number:WHITE
  },
  CMSRenderer:{
    color:GRAY_90
  },
  clearCondition:{
    background:GRAY_00,
    border:BLUE_50,
    titleColor:WHITE,
    conditionColor:GRAY_100,
    cleared:GREEN_50,
    notCleared:GRAY_30
  },
  color:GRAY_100,

};