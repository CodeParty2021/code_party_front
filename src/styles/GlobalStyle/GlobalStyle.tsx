import { createGlobalStyle } from "styled-components";
import { global } from "styles/colors";
import { FONT, FONT_WEIGHT } from "styles/constants/constants";

type Props = {};

export const GlobalStyle = createGlobalStyle<Props>`
  body {
    // Base Font
    font-family: ${FONT.NOTO_SANS}, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: ${FONT_WEIGHT.REGULAR};
    font-feature-settings: 'palt' on;
    color: ${global.font};

    // Base Color
    background-color: ${global.base};
  }

  @font-face {
    font-family: "851Gkktt";
    font-style: normal;
    font-weight: normal;
    src: local("851Gkktt"), url("/fonts/851Gkktt.woff2") format("woff");
  }
`;
