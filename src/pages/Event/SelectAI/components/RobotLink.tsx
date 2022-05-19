import {
  RobotLinkStyle,
  RobotImage,
  Frame,
  Label,
  Filter1,
  Filter2,
  AlgoFront,
  MissionNumberFront,
} from "./RobotLinkStyle";
import React from "react";

type Props = {
  label: string;
  number: number;
  onClick?: () => void;
};

export const RobotLink: React.FC<Props> = ({ label, number, onClick }) => {
  return (
    <RobotLinkStyle onClick={onClick}>
      <RobotImage>
        <Frame>
          <Filter1 />
          <Filter2 />
          <MissionNumberFront number={number} />
          <AlgoFront />
        </Frame>
      </RobotImage>
      <Label>{label}</Label>
    </RobotLinkStyle>
  );
};
