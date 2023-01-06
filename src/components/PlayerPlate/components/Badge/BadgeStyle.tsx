import styled, { css } from "styled-components";
import { FONT_WEIGHT } from "styles/constants/constants";
import { PlayerPlateColors } from "components/PlayerPlate/colors";
import { FlexGap } from "styles/FlexGap/FlexGap";

export type BadgeStyleProps = {};

const defaultStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${FlexGap({ gap: "16px", direction: "row" })}

  .badge_name {
    transform: matrix(1, 0, -0.08, 1, 0, 0);
    color: ${PlayerPlateColors.badge};
    font-weight: ${FONT_WEIGHT.BOLD};
    font-size: 14px;
    line-height: 20px;
    text-align: center;
  }
`;

export const BadgeStyle = styled.div<BadgeStyleProps>`
  ${defaultStyle}
`;

BadgeStyle.defaultProps = {};
