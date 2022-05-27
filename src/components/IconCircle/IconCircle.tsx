import React from "react";
import { iconCircle } from "styles/colors";
import { Icon32 } from "types/utils";
import { IconCircleStyle, IconCircleStyleProps } from "./IconCircleStyle";

type Props = IconCircleStyleProps & {
  Icon: React.ComponentType<Icon32>;
};

export const IconCircle: React.FC<Props> = ({ Icon, ...styleProps }) => {
  return (
    <IconCircleStyle {...styleProps}>
      <Icon size={32} fill={iconCircle.icon} />
    </IconCircleStyle>
  );
};
