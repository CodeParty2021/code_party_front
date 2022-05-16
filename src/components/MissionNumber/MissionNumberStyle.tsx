import styled, { css } from "styled-components";
import { FONT } from "styles/constants/constants";

export type MissionNumberStyleProps = {
};

const defaultStyle = css`
  font-family: ${FONT.F_851Gkktt};
  font-size: 30px;
  width: 50px;
  height: 59px;
  position: relative;
  & > span {
    position: absolute;
    left: 50%;
    top: 12px;
    transform: translateX(-50%);
  }
`;

export const MissionNumberStyle = styled.div<MissionNumberStyleProps>`
  ${defaultStyle}
`;

MissionNumberStyle.defaultProps = {
};