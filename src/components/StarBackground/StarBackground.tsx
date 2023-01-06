import React from "react";
import {
  Star1,
  Star2,
  Star3,
  Star4,
  Star5,
  Star6,
  Star7,
  Star8,
  StarBackgroundStyle,
  StarBackgroundStyleProps,
} from "./StarBackgroundStyle";

type Props = StarBackgroundStyleProps & {};

export const StarBackground: React.FC<Props> = ({
  children,
  ...styleProps
}) => {
  return (
    <>
      {children}
      <StarBackgroundStyle {...styleProps}>
        <Star1 color="purple" />
        <Star2 color="purple" />
        <Star3 color="yellow" />
        <Star4 color="yellow" />
        <Star5 color="pink" />
        <Star6 color="purple" />
        <Star7 color="turquoise" />
        <Star8 color="pink" />
      </StarBackgroundStyle>
    </>
  );
};
