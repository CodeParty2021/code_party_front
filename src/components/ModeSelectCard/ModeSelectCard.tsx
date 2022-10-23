import { Setting, Sword } from "components/icons";
import React, { ReactNode } from "react";
import {
  ModeSelectCardConvexStyle,
  ModeSelectCardStyle,
  ModeSelectCardStyleProps,
} from "./ModeSelectCardStyle";

type Props = ModeSelectCardStyleProps & {
  imageName: "grab_flag_lobo" | "walking_lobo";
  title: string;
  description: ReactNode;
  icon: "setting" | "sword";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type DescriptionTextProps = {
  children: ReactNode;
};
export const DescriptionText: React.FC<DescriptionTextProps> = ({
  children,
}) => {
  return <> {children} </>;
};

export const ModeSelectCard: React.FC<Props> = ({
  imageName,
  title,
  description,
  icon,
  disabled,
  onClick,
  ...styleProps
}) => {
  const Icon = icon === "setting" ? Setting : Sword;
  return (
    <ModeSelectCardStyle disabled={disabled} onClick={onClick} {...styleProps}>
      <div className="modeselectcard_container_image">
        <img src={`/img/modeselectcard_${imageName}.png`} alt={title} />
        <ModeSelectCardConvexStyle
          src="/img/modeselectcard_convex.svg"
          wrapper="svg"
          disabled={disabled}
          {...styleProps}
        />
        {disabled && (
          <div className="modeselectcard_container_info">
            <span>現在は利用できません</span>
          </div>
        )}
      </div>
      <div className="modeselectcard_container_main">
        <Icon size={64} />
        <span className="modeselectcard_modename">{title}</span>
        <span className="modeselectcard_description">{description}</span>
      </div>
      <div className="modeselectcard_border" />
    </ModeSelectCardStyle>
  );
};
