import React, { useState } from "react";
import { PlanetPicture } from "../../components/PlanetPicture/PlanetPicture";
import { AnonymousLoginForm } from "./components/AnonymousLoginFrom/AnonymousLoginForm";
import { FirebaseLoginForm } from "./components/FirebaseLoginForm/FirebaseLoginForm";

type Props = {};

export const Start: React.FC<Props> = () => {
  const [isAnonymous, setIsAnonymous] = useState<Boolean>(true);
  return (
    <div>
      <div>これはスタート画面です。</div>

      <PlanetPicture size={161} color="yellow" />

      {isAnonymous ? <AnonymousLoginForm /> : <FirebaseLoginForm />}

      <button onClick={() => setIsAnonymous(!isAnonymous)}>
        {isAnonymous ? "ログインはこちら" : "新しく始めるならこちら"}
      </button>
    </div>
  );
};
