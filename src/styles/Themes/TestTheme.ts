import { DefaultTheme } from "./DefaultTheme";

/**
 * テストケースで使用するためのテーマ
 * ※注意：一度設定した値は基本的に変更しないこと
 *        変更するとテストケースのスナップショットが全て更新される可能性があります。
 */
export const TestTheme: typeof DefaultTheme = {
  color: {
    base: "#F5F5F5",
    main: "#6074FF",

    lightBlack: "#2F364D",
    lightBlackShadow: "#1A1B1F",
    gray: "#495067",
    grayShadow: "#2F364D",
    lightGray: "#9299AF",
    lightGrayShadow: "#82889D",
    blueShadow: "#6A5ABC",
    pinkShadow: "#DC5E86",

    error: "purple",
  },
  gradation: {
    bluePurple: "linear-gradient(270deg, #4462FF 0%, #9D7AFF 100%)",
    pinkOrange: "linear-gradient(270deg, #FF895E 0%, #FF5BC9 100%)",
  },
};
