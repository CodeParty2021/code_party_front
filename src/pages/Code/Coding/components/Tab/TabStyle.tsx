import styled, { css } from "styled-components";
import { BLUE_50, WHITE } from "styles/colors";
import { FONT } from "styles/constants/constants";

export type TabStyleProps = {};

const defaultStyle = css`
  display: block;
  width: 44px;
  height: 132px;
  background: ${WHITE};
  border-radius: 16px 0px 0px 16px;

  position: relative;

  font-family: ${FONT.F_851Gkktt};
  font-size: 29px;
  text-align: center;

  color: ${BLUE_50};

  & > span {
    display: block;
    position: absolute;

    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%) rotate(-90deg);
  }
`;

export const TabStyle = styled.button<TabStyleProps>`
  ${defaultStyle}
`;

TabStyle.defaultProps = {};
