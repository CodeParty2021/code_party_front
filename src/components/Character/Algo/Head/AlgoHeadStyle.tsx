import { Properties } from "csstype";
import { ReactSVG } from "react-svg";
import styled, { css } from "styled-components";
import { algo } from "styles/colors";

export type AlgoHeadStyleProps = {
  color?: "turquoise" | "leaf" | "orange" | "magenta";
  width?: Properties["width"];
  height?: Properties["height"];
};

const defaultStyle = css<AlgoHeadStyleProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

const turquoiseStyle = css`
  .algohead_color_main {
    fill: ${algo.turquoise};
  }
`;

const leafStyle = css`
  .algohead_color_main {
    fill: ${algo.leaf};
  }
`;

const orangeStyle = css`
  .algohead_color_main {
    fill: ${algo.orange};
  }
`;

const magentaStyle = css`
  .algohead_color_main {
    fill: ${algo.magenta};
  }
`;

export const AlgoHeadStyle = styled(ReactSVG)<AlgoHeadStyleProps>`
  ${defaultStyle}

  ${({ color }) => color == "turquoise" && turquoiseStyle}
  ${({ color }) => color == "leaf" && leafStyle}
  ${({ color }) => color == "orange" && orangeStyle}
  ${({ color }) => color == "magenta" && magentaStyle}
`;

AlgoHeadStyle.defaultProps = {
  color: "turquoise",
  width: "142px",
  height: "118px",
};
