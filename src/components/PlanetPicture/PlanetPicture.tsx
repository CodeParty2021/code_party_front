import React from "react";
import { YellowPlanetPicture } from "./YellowPlanetPicture";

type Props = {
  color: string;
  size: number;
};

//特定のplanetを描画する
export const PlanetPicture: React.FC<Props> = (props: Props) => {
  if (props.color == "yellow") {
    return <YellowPlanetPicture size={props.size} />;
  }
  return <></>;
};
