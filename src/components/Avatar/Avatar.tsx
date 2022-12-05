import React from "react";
import { AvatarStyle, AvatarStyleProps, AvatarDummyStyle } from "./AvatarStyle";
import { AlgoHead } from "components/Character/Algo/Head/AlgoHead";

type Props = AvatarStyleProps & {
  userPhotoUrl?: string;
};

export const Avatar: React.FC<Props> = ({ userPhotoUrl, ...styleProps }) => {
  return (
    <AvatarStyle imageUrl={userPhotoUrl} {...styleProps}>
      <div className="avatar_main">
        {userPhotoUrl ? (
          <img className="avatar_img" src={userPhotoUrl} alt="ユーザアバター" />
        ) : styleProps.type === "robot" ? (
          <AlgoHead color="blue" width="34px" height="28px" />
        ) : (
          <AvatarDummyStyle src="/img/avatar_dummy.svg" wrapper="svg" />
        )}
      </div>
      <div className="avatar_circle" />
    </AvatarStyle>
  );
};
