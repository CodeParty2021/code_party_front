import styled from "styled-components";
import { BLUE_GRAY_70 } from "styles/colors";
import { FONT, FONT_WEIGHT } from "styles/constants/constants";
export type CMSRendererStyleProps = {};
import React from "react";

export const CMSRendererStyle = styled.button<CMSRendererStyleProps>`
  font-family: ${FONT.NOTO_SANS};
  font-style: normal;
`;

export const H1: React.FC<{ id: number }> = ({ id, children }) => {
  return (
    <H1Box>
      <H1Number>
        <H1NumberStyle>{id}</H1NumberStyle>
        <H1Icon />
      </H1Number>
      <H1Text>{children}</H1Text>
    </H1Box>
  );
};

const H1Box = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
const H1NumberStyle = styled.div`
  position: absolute;
`;
const H1Number = styled.div`
  position: relative;

  font-family: "Noto Sans JP";
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 32px;

  font-feature-settings: "palt" on;
  color: #ffffff;
`;
const H1Text = styled.h1`
    fonr-weight: ${FONT_WEIGHT.BOLD}
    font-size:22px;
    lineheight:32px;
    color:${BLUE_GRAY_70};
    transform:matrix(1, 0, -0.08, 1, 0, 0);
`;
const H1Icon = styled.div`
  padding: 0px 0px 2px 2px;
  width: 38px;
  height: 38px;
  background: #242a3d;
  border-radius: 6px;
  transform: rotate(-45deg);
  flex: none;
`;
export const P = styled.p``;
export const BlockQuote = styled.blockquote``;
