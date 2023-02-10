import styled from "styled-components";
import { FONT_WEIGHT } from "styles/constants/constants";
import { FlexGap } from "styles/FlexGap/FlexGap";

type ColumnTopProps = {
  waiting: boolean;
};

export const ColumnTopStye = styled.div<ColumnTopProps>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ waiting }) => (waiting ? "center" : "flex-start")};
  align-items: center;
  padding-bottom: ${({ waiting }) => (waiting ? "24px" : "16px")};
  height: 90.78px;
  ${FlexGap({ gap: "4px", direction: "column" })}

  .playerplateme-name {
    font-weight: ${FONT_WEIGHT.BOLD};
    font-size: 30px;
    line-height: 43px;
    transform: matrix(1, 0, -0.08, 1, 0, 0);

    max-width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

export const ColumnBottomStye = styled.div``;
