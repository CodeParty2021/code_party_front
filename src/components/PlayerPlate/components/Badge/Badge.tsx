import { Star } from "components/Star/Star";
import React from "react";
import { BadgeStyle, BadgeStyleProps } from "./BadgeStyle";

type Props = BadgeStyleProps & {
  badgeName?: string;
  color?: "turquoise" | "leaf" | "orange" | "magenta";
};

export const Badge: React.FC<Props> = ({ badgeName, color, ...styleProps }) => {
  return (
    <BadgeStyle {...styleProps}>
      <Star color={color} width="19px" height="19px" />
      <span className="badge_name">{badgeName || "称号なし"}</span>
      <Star color={color} width="19px" height="19px" />
    </BadgeStyle>
  );
};
