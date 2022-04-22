import React from "react";
import { VFrame } from "components/Utils/VFrame/VFrame";
import { HFrame } from "components/Utils/HFrame/HFrame";
import { Bold } from "components/Utils/Text/Bold";
import { css, useTheme } from "styled-components";
import { Padding } from "styles/Padding/Padding";
import { Shape } from "styles/Shape/Shape";
import { Hover } from "styles/actions/Hover/Hover";

type Props = {
  color?: "black" | "blue" | "pink";
  size?: "S" | "M" | "L";
  status?: "default" | "disabled";
  icon?: "right" | "left" | "null";
  value?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const Button: React.FC<Props> = ({
  color = "black",
  size = "M",
  status = "default",
  icon = "null",
  value = "ボタン",
  onClick,
}) => {
  const theme = useTheme();
  const bottomPadding = size == "S" ? "4px" : "8px";
  const bottomColor =
    status == "disabled"
      ? theme.color.lightGrayShadow
      : color == "black"
      ? theme.color.lightBlackShadow
      : color == "blue"
      ? theme.color.blueShadow
      : color == "pink"
      ? theme.color.pinkShadow
      : theme.color.error;
  const radius = size == "S" ? "8px" : "24px";
  const mainColor =
    status == "disabled"
      ? theme.color.lightGray
      : color == "black"
      ? theme.color.lightBlack
      : color == "blue"
      ? theme.gradation.bluePurple
      : color == "pink"
      ? theme.gradation.pinkOrange
      : theme.color.error;
  const hoverBottomColor =
    color == "black" && status != "disabled"
      ? theme.color.grayShadow
      : undefined;
  const hoverColor =
    color == "black" && status != "disabled" ? theme.color.gray : undefined;
  const paddingLR =
    size == "S" ? "16px" : size == "M" ? "48px" : size == "L" ? "64px" : "48px";
  const paddingTB =
    size == "S" ? "6px" : size == "M" ? "16px" : size == "L" ? "24px" : "16px";
  const spacing = size == "S" ? "8px" : "10px";
  const fontSize = size == "S" ? "16px" : "24px";

  return (
    <VFrameButton
      alignItems="center"
      justifyContent="center"
      onClick={onClick}
      disabled={status == "disabled"}
      mixin={[
        Padding({ bottom: bottomPadding }),
        Shape({ bg: bottomColor, radius: radius }),
        Hover({ mixin: [Shape({ bg: hoverBottomColor })] }),
        css`
          position: relative;
        `,
      ]}
    >
      <HFrame
        alignItems="center"
        justifyContent="center"
        spacing={spacing}
        mixin={[
          Padding({ topBottom: paddingTB, leftRight: paddingLR }),
          Shape({ bg: mainColor, radius: radius }),
          Hover({ trigger: VFrameButton, mixin: [Shape({ bg: hoverColor })] }),
        ]}
      >
        {icon == "left" ? <div>icon</div> : undefined}
        <Bold
          color="#FFF"
          fontSize={fontSize}
          lineHeight="150%"
          mixin={[status == "disabled" ? opacity : undefined]}
        >
          {value}
        </Bold>
        {icon == "right" ? <div>icon</div> : undefined}
      </HFrame>
    </VFrameButton>
  );
};

// VFrameをボタン化
const VFrameButton = VFrame.withComponent("button");

const opacity = css`
  opacity: 0.2;
`;
