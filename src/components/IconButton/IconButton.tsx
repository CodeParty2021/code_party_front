import React from "react";
import { iconButton } from "styles/colors";
import { Icon24 } from "types/utils";
import { IconButtonStyle, IconButtonStyleProps } from "./IconButtonStyle";

type Props = IconButtonStyleProps & {
  Icon: React.ComponentType<Icon24>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const IconButton: React.FC<Props> = ({
  Icon,
  onClick,
  ...styleProps
}) => {
  return (
    <IconButtonStyle onClick={onClick} {...styleProps}>
      <Icon size={24} fill={iconButton.icon} />
    </IconButtonStyle>
  );
};
