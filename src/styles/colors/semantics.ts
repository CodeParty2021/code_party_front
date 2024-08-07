import {
  BLUE_10,
  BLUE_20,
  BLUE_40,
  BLUE_50,
  BLUE_60,
  GREEN_50,
  GREEN_60,
  LEAF_10,
  LEAF_40,
  LEAF_50,
  ORANGE_10,
  ORANGE_40,
  ORANGE_50,
  PINK_10,
  PINK_40,
  PINK_50,
  PURPLE_40,
  RED_40,
  TURQUOISE_10,
  TURQUOISE_40,
  TURQUOISE_50,
} from "./colorful";
import {
  BLUE_TO_PURPLE,
  BLUE_TO_PURPLE_SHADOW,
  PINK_TO_ORANGE,
  PINK_TO_ORANGE_SHADOW,
} from "./gradation";
import {
  BLACK,
  GRAY_00,
  GRAY_10,
  GRAY_100,
  GRAY_20,
  GRAY_30,
  GRAY_40,
  GRAY_50,
  GRAY_60,
  GRAY_80,
  GRAY_90,
  WHITE,
} from "./monotone";

export const global = {
  base: GRAY_00,
  main: TURQUOISE_50,
  font: GRAY_100,
} as const;

export const button = {
  font: WHITE,
  black: {
    surface: GRAY_90,
    side: GRAY_100,
    font: WHITE,
    hover: {
      surface: GRAY_80,
      side: GRAY_90,
    },
  },
  blue: {
    surface: BLUE_TO_PURPLE,
    side: BLUE_TO_PURPLE_SHADOW,
    font: WHITE,
  },
  pink: {
    surface: PINK_TO_ORANGE,
    side: PINK_TO_ORANGE_SHADOW,
    font: WHITE,
  },
  green: {
    surface: GREEN_50,
    side: GREEN_60,
    font: WHITE,
  },
  white: {
    surface: GRAY_10,
    side: GRAY_30,
    font: GRAY_80,
  },
  disabled: {
    surface: GRAY_50,
    side: GRAY_60,
    font: WHITE,
  },
} as const;

export const modeSelectCard = {
  bg: GRAY_00,
  border: GRAY_30,
  font: GRAY_100,
  hover: {
    bg: BLUE_60,
    border: BLUE_60,
    font: WHITE,
  },
  hoverInfo: {
    bg: GRAY_80,
    font: GRAY_10,
  },
} as const;

export const iconCircle = {
  bg: GREEN_50,
  icon: WHITE,
} as const;

export const star = {
  pink: RED_40,
  yellow: "#FFC047",
  purple: PURPLE_40,
  turquoise: TURQUOISE_50,
  gray: GRAY_30,
  leaf: LEAF_50,
  orange: ORANGE_50,
  magenta: PINK_50,
} as const;

export const algo = {
  turquoise: TURQUOISE_50,
  leaf: LEAF_50,
  orange: ORANGE_50,
  magenta: PINK_50,
  blue: BLUE_40,
} as const;

export const roundedButton = {
  font: GRAY_90,
  bg: GRAY_10,
  border: GRAY_30,
  hover: {
    border: BLUE_50,
  },
} as const;

export const missionNumber = {
  font: WHITE,
  bg: GRAY_100,
} as const;

export const setName = {
  modal: {
    border: WHITE,
    font: GRAY_100,
  },
} as const;

export const iconButton = {
  bg: WHITE,
  blue: BLUE_50,
  black: GRAY_90,
} as const;

export const algoEditor = {
  algoColor: TURQUOISE_50,
  algoBody: GRAY_100,
  algoFrame: GRAY_10,
  codingBG: BLACK,
} as const;

export const descriptionPanel = {
  background: GRAY_10,
  backline: GRAY_30,
  table: { background: GRAY_20, color: GRAY_100 },
  stepHeader: {
    stepColor: BLUE_50,
    titleColor: GRAY_80, //ここfigmaがカラーパレットにない色。確認中
  },
  stageHeader: {
    color: GRAY_100,
    progressBar: GRAY_30,
    progressFill: BLUE_50,
  },
  heading: {
    background: GRAY_100,
    color: GRAY_100,
    number: WHITE,
  },
  CMSRenderer: {
    color: GRAY_90,
  },
  clearCondition: {
    background: GRAY_00,
    border: BLUE_50,
    titleColor: WHITE,
    conditionColor: GRAY_100,
    cleared: GREEN_50,
    notCleared: GRAY_30,
  },
  color: GRAY_100,
} as const;

export const backLink = {
  bg: WHITE,
  buttonIconColor: {
    blue: BLUE_50,
    black: GRAY_90,
  },
} as const;

export const avatar = {
  default: {
    avatar: BLUE_40,
    border: WHITE,
    background: GRAY_20,
    noImage: {
      background: BLUE_10,
    },
  },
  turquoise: {
    avatar: TURQUOISE_40,
    border: TURQUOISE_40,
    background: TURQUOISE_10,
  },
  leaf: {
    avatar: LEAF_40,
    border: LEAF_40,
    background: LEAF_10,
  },
  orange: {
    avatar: ORANGE_40,
    border: ORANGE_40,
    background: ORANGE_10,
  },
  pink: {
    avatar: PINK_40,
    border: PINK_40,
    background: PINK_10,
  },
  gray: {
    border: GRAY_40,
    background: GRAY_20,
  },
  anonymous: {
    avatar: GRAY_50,
    border: WHITE,
    background: GRAY_20,
  },
  robot: {
    border: WHITE,
    background: BLUE_20,
  },
} as const;
