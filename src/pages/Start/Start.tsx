import React from "react";
import { PlanetPicture } from "../../components/PlanetPicture/PlanetPicture";

type Prop = {};

export const Start: React.FC<Prop> = () => {
  return (
    <>
      <div>これはスタート画面です。</div>
      <PlanetPicture size={161} color="yellow" />
    </>
  );
};
