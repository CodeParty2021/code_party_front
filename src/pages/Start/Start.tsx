import React from "react";
import { useStartState } from "./hooks/useStartState";
import { PlanetPicture } from "components/PlanetPicture/PlanetPicture";
import { AnonymousLoginForm } from "./components/AnonymousLoginFrom/AnonymousLoginForm";
import { FirebaseLoginForm } from "./components/FirebaseLoginForm/FirebaseLoginForm";

type Props = {};

export const Start: React.FC<Props> = () => {
  const { anonymousLoginFormDisplay, firebaseLoginFormDisplay } =
    useStartState();
  return (
    <div>
      <div>これはスタート画面です。</div>

      <PlanetPicture size="161px" color="blue" />

      {anonymousLoginFormDisplay ? <AnonymousLoginForm /> : undefined}
      {firebaseLoginFormDisplay ? <FirebaseLoginForm /> : undefined}
    </div>
  );
};
