import { ReactSVG } from "react-svg";
import styled, { css } from "styled-components";
import { missionNumber } from "styles/colors";
import { FONT } from "styles/constants/constants";

export type MissionNumberStyleProps = {};

const defaultStyle = css`
  font-family: ${FONT.F_851Gkktt};
  font-size: 30px;
  color: ${missionNumber.font};
  overflow: hidden;

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

MissionNumberStyle.defaultProps = {};

export const MissionNumberBGStyle = styled(ReactSVG)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  fill: ${missionNumber.bg};
`;
