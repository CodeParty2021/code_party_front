import { createGlobalStyle } from "styled-components";

type Props = {};

export const GlobalStyle = createGlobalStyle<Props>`
  body {
    font-family: "Noto Sans JP", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    background-color: ${(p) => p.theme.color.base};
  }
`;
