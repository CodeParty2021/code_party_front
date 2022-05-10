import React from "react";
import { ButtonStyle, ButtonStyleProps } from "./ButtonStyle";

type Props = ButtonStyleProps & {
  icon?: "right" | "left" | null;
  value?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const Button: React.FC<Props> = ({
  icon,
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
        {icon == "left" && <div>icon</div>}
        <span>{value}</span>
        {icon == "right" && <div>icon</div>}
      </div>
    </ButtonStyle>
  );
};
