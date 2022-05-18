import React from "react";
import { StarStyle, StarStyleProps } from "./StarStyle";

type Props = StarStyleProps & {};

export const Star: React.FC<Props> = ({ ...styleProps }) => {
  return <StarStyle src="/img/star.svg" wrapper="svg" {...styleProps} />;
};
