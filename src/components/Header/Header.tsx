import React from "react";
import {
  HeaderStyle,
  LogoStyle,
  HeaderCircleStyle,
  BackLinkArea,
} from "./HeaderStyle";
import { BackLink } from "components/BackLink/BackLink";

type Props = {
  backMessage?: string;
  backButtonHandler?: () => void;
};

export const Header: React.FC<Props> = ({ backMessage, backButtonHandler }) => {
  return (
    <>
      <HeaderStyle>
        {backMessage && backButtonHandler && (
          <BackLinkArea>
            <BackLink
              backMessage={backMessage}
              onClick={backButtonHandler}
              iconColor={"blue"}
            ></BackLink>
          </BackLinkArea>
        )}
      </HeaderStyle>
      <HeaderCircleStyle src="/img/header-circle.svg" />
      <LogoStyle src="/logo.svg"></LogoStyle>
    </>
  );
};
