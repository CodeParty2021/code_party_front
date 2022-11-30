import React from "react";
import { iconButton } from "styles/colors";
import { Icon24 } from "types/utils";
import { IconButtonStyle, IconButtonStyleProps } from "./IconButtonStyle";

type Props = IconButtonStyleProps & {
  Icon: React.ComponentType<Icon24>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  color?: "blue" | "black";
};

export const IconButton: React.FC<Props> = ({
  Icon,
  onClick,
  color,
  ...styleProps
}) => {
  return (
    <IconButtonStyle onClick={onClick} {...styleProps}>
      {color == "blue" ? (
        <Icon size={24} fill={iconButton.blue} />
      ) : color == "black" ? (
        <Icon size={24} fill={iconButton.black} />
      ) : (
        <Icon size={24} fill={iconButton.blue} /> // 未指定はblue
      )}
    </IconButtonStyle>
  );
};
