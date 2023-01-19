import styled, { css } from "styled-components";
import { BLUE_50, WHITE } from "styles/colors";
import { FONT } from "styles/constants/constants";

export type TabStyleProps = {};

const defaultStyle = css`
  display: block;
  width: 44px;
  height: 100%;
  min-height: 100px;
  background: ${WHITE};
  border-radius: 16px 0px 0px 16px;

  position: relative;

  font-family: ${FONT.F_851Gkktt};
  font-size: 29px;
  text-align: center;
  padding: 22px 0;
  color: ${BLUE_50};

  & > span {
    writing-mode: vertical-rl;
  }
`;

export const TabStyle = styled.button<TabStyleProps>`
  ${defaultStyle}
`;

TabStyle.defaultProps = {};
