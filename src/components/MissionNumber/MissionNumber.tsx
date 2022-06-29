import React from "react";
import {
  MissionNumberBGStyle,
  MissionNumberStyle,
  MissionNumberStyleProps,
} from "./MissionNumberStyle";

type Props = MissionNumberStyleProps & {
  number: number;
};

export const MissionNumber: React.FC<Props> = ({ number, ...styleProps }) => {
  return (
    <MissionNumberStyle {...styleProps}>
      <MissionNumberBGStyle src="/img/mission_number_bg.svg" wrapper="svg" />
      <span>{number}</span>
    </MissionNumberStyle>
  );
};
