import React from "react";
import {
  RoundedButtonStyle,
  RoundedButtonStyleProps,
} from "./RoundedButtonStyle";

type Props = RoundedButtonStyleProps & {
  icon?: "left" | "right" | null;
  value?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const RoundedButton: React.FC<Props> = ({
  icon,
  value,
  disabled,
  onClick,
  ...styleProps
}) => {
  return (
    <RoundedButtonStyle
      onClick={onClick}
      disabled={disabled}
      {...styleProps}
      status={disabled ? "disabled" : "default"}
    >
      {icon == "left" && <div>icon</div>}
      <span>{value}</span>
      {icon == "right" && <div>icon</div>}
    </RoundedButtonStyle>
  );
};
