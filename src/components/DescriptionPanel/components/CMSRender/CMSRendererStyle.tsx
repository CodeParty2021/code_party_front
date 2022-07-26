import styled from "styled-components";
import { descriptionPanel } from "styles/colors";
import { FONT } from "styles/constants/constants";
export type CMSRendererStyleProps = {};
import { FlexGap } from "styles/FlexGap/FlexGap";

export const CMSRendererStyle = styled.div<CMSRendererStyleProps>`
  display: flex;
  flex-direction: column;
  ${FlexGap({ gap: "16px", direction: "column" })}
`;

export const P = styled.p`
  font-family: ${FONT.NOTO_SANS};
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 160%;
  /* or 29px */

  /* GRAY_90 */

  color: ${descriptionPanel.CMSRenderer.color};
`;
export const BlockQuote = styled.blockquote``;
