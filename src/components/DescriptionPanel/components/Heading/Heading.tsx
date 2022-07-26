import React from "react";
import styled from "styled-components";
import {descriptionPanel } from "styles/colors";
import { FONT, FONT_WEIGHT } from "styles/constants/constants";
export type CMSRendererStyleProps = {};

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

export const H2 = styled.h2`
  display: inline-block;
  font-family: ${FONT.NOTO_SANS};
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
  /* identical to box height */

  font-feature-settings: "palt" on;

  /* GRAY_100 */

  color: ${descriptionPanel.heading.color};

  transform: matrix(1, 0, -0.08, 1, 0, 0);

  padding: 0px 0.85px 0.09px 0px;
`;
const H1Box = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  margin: 16px 0 16px 10px;
`;
const H1NumberStyle = styled.div`
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const H1Number = styled.div`
  position: relative;

  font-family: ${FONT.NOTO_SANS};
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 32px;

  font-feature-settings: "palt" on;
  color: ${descriptionPanel.heading.number};
  margin-right: 14px;
`;
const H1Text = styled.h1`
  font-weight: ${FONT_WEIGHT.BOLD};
  font-size: 22px;
  line-height: 32px;
  color: ${descriptionPanel.heading.color};
  transform: matrix(1, 0, -0.08, 1, 0, 0);
`;

const H1Icon = styled.div`
  padding: 0px 0px 2px 2px;
  width: 38px;
  height: 38px;
  background: ${descriptionPanel.heading.background};
  border-radius: 6px;
  transform: rotate(-45deg);
  flex: none;
`;
