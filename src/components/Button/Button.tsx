import React, { ComponentType } from "react";
import { Icon16 } from "types/utils";
import { ButtonStyle, ButtonStyleProps, IconProps } from "./ButtonStyle";

type Props = ButtonStyleProps & {
  icon?: "right" | "left" | null;
  Icon?: ComponentType<Icon16>;
  value?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const Button: React.FC<Props> = ({
  icon,
  Icon,
  value,
  onClick,
  ...styleProps
}) => {
  return (
    <ButtonStyle
      onClick={onClick}
      disabled={styleProps.status == "disabled"}
      {...styleProps}
    >
      <div className="frame">
        {icon == "left" && Icon && <Icon {...IconProps(styleProps)} />}
        <span>{value}</span>
        {icon == "right" && Icon && <Icon {...IconProps(styleProps)} />}
      </div>
    </ButtonStyle>
  );
};
