import { createGlobalStyle } from "styled-components";
import { Regular } from "styles/Fonts/Base/Regular";

type Props = {};

export const GlobalStyle = createGlobalStyle<Props>`
  body {
    // Base Font
    ${Regular}

    // Base Color
    background-color: ${(p) => p.theme.color.base};
  }
`;
