import React from "react";
import {
  PlanetPictureStyle,
  PlanetPictureStyleProps,
} from "./PlanetPictureStyle";
import { YellowPlanetPicture } from "./YellowPlanetPicture";

type Props = PlanetPictureStyleProps & {
  color: "blue" | "pink" | "orange" | "yellow";
};

//特定のplanetを描画する
export const PlanetPicture: React.FC<Props> = ({ color, ...styleProps }) => {
  if (color == "blue")
    return (
      <PlanetPictureStyle
        src="/img/planet_blue.svg"
        wrapper="svg"
        {...styleProps}
      />
    );
  if (color == "pink")
    return (
      <PlanetPictureStyle
        src="/img/planet_pink.svg"
        wrapper="svg"
        {...styleProps}
      />
    );
  if (color == "orange")
    return (
      <PlanetPictureStyle
        src="/img/planet_orange.svg"
        wrapper="svg"
        {...styleProps}
      />
    );
  return <YellowPlanetPicture size={styleProps.size} />;
};
