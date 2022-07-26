import styled, { css } from "styled-components";
import { FlexGap } from "styles/FlexGap/FlexGap";
export type DescriptionPanelStyleProps = {};

const defaultStyle = css`
  display: flex;
  flex-direction: column;
  ${FlexGap({ gap: "32px", direction: "column" })}
  align-items: flex-start;
  padding-bottom: 56px;
  position: relative;

  width: 100%;
  height: 100vh;

  border-radius: 0px 48px 48px 0px;

  // マス目
  background-image: linear-gradient(
      0deg,
      transparent calc(100% - 1px),
      #d7dae4 calc(100% - 1px)
    ),
    linear-gradient(
      90deg,
      transparent calc(100% - 1px),
      #d7dae4 calc(100% - 1px)
    );
  background-size: 64px 64px;
  background-repeat: repeat;
  background-position: 0 0;
  background-color: #f5f6f8;
  padding: 24px 32px;
`;

export const DescriptionPanelStyle = styled.div<DescriptionPanelStyleProps>`
  ${defaultStyle}
`;

DescriptionPanelStyle.defaultProps = {};

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  ${FlexGap({ gap: "24px", direction: "column" })}
  z-index: 1;
`;
export const Body = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  z-index: 1;
`;

export const BlurBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 41px 38px;
  top: 0;
  left: 0;

  z-index: 0;
`;
export const Blur = styled.div`
  width: 100%;
  height: 100%;
  background: #f5f6f8;
  filter: blur(74px);
  border-radius: 63px;
`;
