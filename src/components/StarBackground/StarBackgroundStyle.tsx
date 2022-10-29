import { Star } from "components/Star/Star";
import styled, { css } from "styled-components";
import { GRAY_10, GRAY_30 } from "styles/colors";

export type StarBackgroundStyleProps = {};

const defaultStyle = css`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(
      0deg,
      transparent calc(100% - 1px),
      ${GRAY_30} calc(100% - 1px)
    ),
    linear-gradient(
      90deg,
      transparent calc(100% - 1px),
      ${GRAY_30} calc(100% - 1px)
    );
  background-size: 64px 64px;
  background-repeat: repeat;
  background-position: 0 0;
  background-color: ${GRAY_10};
  z-index: -10;
  top: 0;
  left: 0;
`;

export const StarBackgroundStyle = styled.div`
  ${defaultStyle}
`;

const starStyle = css`
  position: absolute;
  z-index: -9;
`;
export const Star1 = styled(Star)`
  ${starStyle}
  left: 7.55%;
  right: 90.48%;
  top: 21.94%;
  bottom: 74.55%;
`;

export const Star2 = styled(Star)`
  ${starStyle}
  left: 32.34%;
  right: 65.69%;
  top: 56.76%;
  bottom: 39.74%;
`;
export const Star3 = styled(Star)`
  ${starStyle}
  left: 30.16%;
  right: 67.88%;
  top: 8.33%;
  bottom: 88.17%;
`;
export const Star4 = styled(Star)`
  ${starStyle}
  left: 71.08%;
  right: 26.95%;
  top: 84.38%;
  bottom: 12.13%;
`;

export const Star5 = styled(Star)`
  ${starStyle}
  left: 89.45%;
  right: 8.58%;
  top: 38.76%;
  bottom: 57.74%;
`;

export const Star6 = styled(Star)`
  ${starStyle}
  left: 58.39%;
  right: 39.64%;
  top: 31.67%;
  bottom: 64.83%;
`;

export const Star7 = styled(Star)`
  ${starStyle}
  left: 22.69%;
  right: 75.34%;
  top: 85.68%;
  bottom: 10.82%;
`;

export const Star8 = styled(Star)`
  ${starStyle}
  left: 6.56%;
  right: 91.47%;
  top: 60.28%;
  bottom: 36.22%;
`;
