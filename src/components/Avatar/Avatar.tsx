import React from "react";
import { AvatarStyle, AvatarStyleProps, AvatarDummyStyle } from "./AvatarStyle";
import { AlgoHead } from "components/Character/Algo/Head/AlgoHead";

type Props = AvatarStyleProps & {
  userPhotoUrl?: string;
};

export const Avatar: React.FC<Props> = ({ userPhotoUrl, ...styleProps }) => {
  return (
    <AvatarStyle imageUrl={userPhotoUrl} {...styleProps}>
      {userPhotoUrl ? undefined : styleProps.type === "robot" ? (
        <AlgoHead color="blue" width="34px" height="28px" />
      ) : (
        !userPhotoUrl && (
          <AvatarDummyStyle src="/img/avatar_dummy.svg" wrapper="svg" />
        )
      )}
    </AvatarStyle>
  );
};
