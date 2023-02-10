import styled from "styled-components";
import { FONT_WEIGHT } from "styles/constants/constants";
import { FlexGap } from "styles/FlexGap/FlexGap";
import { PlayerPlateColors } from "../colors";

export const ColumnTopStye = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 24px;
  ${FlexGap({ gap: "4px", direction: "column" })}

  .playerplateme-name {
    font-weight: ${FONT_WEIGHT.BOLD};
    font-size: 30px;
    line-height: 43px;
    transform: matrix(1, 0, -0.08, 1, 0, 0);
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const ColumnMiddleStye = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  padding-bottom: 16px;
  ${FlexGap({ gap: "16px", direction: "column" })}

  width: 100%;
  height: 164px;
  flex-grow: 0;

  .playerplateme-codename {
    font-weight: ${FONT_WEIGHT.BOLD};
    font-size: 18px;
    line-height: 150%;
    color: ${PlayerPlateColors.badge};
    text-align: center;
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const ColumnBottomStye = styled.div``;
