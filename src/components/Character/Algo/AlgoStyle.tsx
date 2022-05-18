import { ReactSVG } from "react-svg";
import styled, { css } from "styled-components";
import { algo } from "styles/colors";

export type AlgoStyleProps = {
  color?: "turquoise" | "leaf" | "orange" | "magenta";
};

const defaultStyle = css<AlgoStyleProps>``;

const turquoiseStyle = css`
  .algo_color_main {
    fill: ${algo.turquoise};
  }
`;

const leafStyle = css`
  .algo_color_main {
    fill: ${algo.leaf};
  }
`;

const orangeStyle = css`
  .algo_color_main {
    fill: ${algo.orange};
  }
`;

const magentaStyle = css`
  .algo_color_main {
    fill: ${algo.magenta};
  }
`;

export const AlgoStyle = styled(ReactSVG)<AlgoStyleProps>`
  ${defaultStyle}

  ${({ color }) => color == "turquoise" && turquoiseStyle}
  ${({ color }) => color == "leaf" && leafStyle}
  ${({ color }) => color == "orange" && orangeStyle}
  ${({ color }) => color == "magenta" && magentaStyle}
`;

AlgoStyle.defaultProps = {
  color: "turquoise",
};
