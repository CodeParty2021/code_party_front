import { ArrowLeft, ArrowRight } from "components/icons";
import React from "react";
import { roundedButton } from "styles/colors";
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
      icon={icon}
    >
      {icon == "left" && <ArrowLeft size={16} fill={roundedButton.font} />}
      <span>{value}</span>
      {icon == "right" && <ArrowRight size={16} fill={roundedButton.font} />}
    </RoundedButtonStyle>
  );
};
