import { Properties } from "csstype";
import { ReactSVG } from "react-svg";
import styled, { css } from "styled-components";
import { star } from "styles/colors";

export type StarStyleProps = {
  color?:
    | "pink"
    | "yellow"
    | "purple"
    | "turquoise"
    | "gray"
    | "leaf"
    | "orange"
    | "magenta";
  width?: Properties["width"];
  height?: Properties["height"];
};

const defaultStyle = css<StarStyleProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

const pinkStyle = css`
  fill: ${star.pink};
`;

const yellowStyle = css`
  fill: ${star.yellow};
`;

const purpleStyle = css`
  fill: ${star.purple};
`;

const turquoiseStyle = css`
  fill: ${star.turquoise};
`;

const grayStyle = css`
  fill: ${star.gray};
`;

const leafStyle = css`
  fill: ${star.leaf};
`;

const orangeStyle = css`
  fill: ${star.orange};
`;

const magentaStyle = css`
  fill: ${star.magenta};
`;

export const StarStyle = styled(ReactSVG)`
  ${defaultStyle}

  ${({ color }) => color == "pink" && pinkStyle}
  ${({ color }) => color == "yellow" && yellowStyle}
  ${({ color }) => color == "purple" && purpleStyle}
  ${({ color }) => color == "turquoise" && turquoiseStyle}
  ${({ color }) => color == "gray" && grayStyle}
  ${({ color }) => color == "leaf" && leafStyle}
  ${({ color }) => color == "orange" && orangeStyle}
  ${({ color }) => color == "magenta" && magentaStyle}
`;

StarStyle.defaultProps = {
  color: "pink",
  width: "38px",
  height: "38px",
};
