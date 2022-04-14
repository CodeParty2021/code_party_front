import React, { ComponentProps } from "react";
import { ReactSVG } from "react-svg";
import styled from "styled-components";

export const IconsDir = () => "icons";

type IconStyleProps = {
  display?: "inline-block" | "block";
  size?: ComponentProps<typeof ReactSVG>["width"];
};

const IconStyle = styled(ReactSVG)<IconStyleProps>`
  display: ${(props) => props.display};
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  & > span,
  & > div,
  & > svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

IconStyle.defaultProps = {
  display: "inline-block",
  size: "16px",
};

type Props = {
  filename: ComponentProps<typeof ReactSVG>["src"];
  wrapper?: ComponentProps<typeof ReactSVG>["wrapper"];
  fill?: string;
} & IconStyleProps;

export const IconPrototype: React.FC<Props> = ({
  filename,
  fill = "#000",
  wrapper = "span",
  ...props
}) => {
  return (
    <IconStyle
      src={filename}
      wrapper={wrapper}
      beforeInjection={(svg: any) => {
        svg.setAttribute(
          "style",
          `display: block; width: ${props.size}; height: ${props.size}; fill: ${fill};`
        );
      }}
      {...props}
    />
  );
};
