import React from "react";
import { MissionNumberStyle, MissionNumberStyleProps } from "./MissionNumberStyle";

type Props = MissionNumberStyleProps & {
  number: number;
};

export const MissionNumber: React.FC<Props> = ({
  number,
  ...styleProps
}) => {
  return (
    <MissionNumberStyle
      {...styleProps}
    >
      <span>
        {number}
      </span>
    </MissionNumberStyle>
  );
};
