import { ReactSVG } from "react-svg";
import styled, { css } from "styled-components";
import { star } from "styles/colors";

export type StarStyleProps = {
  color?: "pink" | "yellow" | "purple" | "blue" | "gray";
};

const defaultStyle = css`
  width: 38px;
  height: 38px;
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

const blueStyle = css`
  fill: ${star.blue};
`;

const grayStyle = css`
  fill: ${star.gray};
`;

export const StarStyle = styled(ReactSVG)`
  ${defaultStyle}

  ${({ color }) => color == "pink" && pinkStyle}
  ${({ color }) => color == "yellow" && yellowStyle}
  ${({ color }) => color == "purple" && purpleStyle}
  ${({ color }) => color == "blue" && blueStyle}
  ${({ color }) => color == "gray" && grayStyle}
`;

StarStyle.defaultProps = {
  color: "pink",
};
