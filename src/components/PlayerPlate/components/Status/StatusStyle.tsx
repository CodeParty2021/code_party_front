import { Checked } from "components/icons";
import { PlayerPlateColors } from "components/PlayerPlate/colors";
import { ComponentProps } from "react";
import styled, { css } from "styled-components";
import { global } from "styles/colors";
import { FONT_WEIGHT } from "styles/constants/constants";
import { FlexGap } from "styles/FlexGap/FlexGap";

export type StatusStyleProps = {
  color?: "turquoise" | "leaf" | "orange" | "magenta";
};

type PrivateProps = {
  viewCheckMark: boolean;
};

const defaultStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${FlexGap({ gap: "16px", direction: "row" })}

  .playerplate-status-message {
    font-weight: ${FONT_WEIGHT.BOLD};
    font-size: 24px;
    line-height: 35px;
    color: ${global.font};
    transform: matrix(1, 0, -0.08, 1, 0, 0);
  } ;
`;

const viewCheckMarkStyle = css`
  padding-right: 8px;
`;

export const StatusStyle = styled.div<StatusStyleProps & PrivateProps>`
  ${defaultStyle}

  ${({ viewCheckMark }) => viewCheckMark && viewCheckMarkStyle}
`;

StatusStyle.defaultProps = {
  color: "turquoise",
};

export const CheckedIconProps = ({
  color,
}: StatusStyleProps): ComponentProps<typeof Checked> => {
  const fill =
    color === "turquoise"
      ? PlayerPlateColors.turquoise.main
      : color === "leaf"
      ? PlayerPlateColors.leaf.main
      : color === "orange"
      ? PlayerPlateColors.orange.main
      : color === "magenta"
      ? PlayerPlateColors.magenta.main
      : PlayerPlateColors.turquoise.main;

  return {
    size: 32,
    fill: fill,
  };
};
