import React from "react";
import {
  HeaderStyle,
  LogoStyle,
  HeaderCircleStyle,
  BackLinkArea,
  BackButtonText,
} from "./HeaderStyle";
import { IconButton } from "components/IconButton/IconButton";
import { ArrowLeft } from "components/icons";

type Props = {
  buttonMessage?: string;
  backButtonHandler?: () => void;
};

export const Header: React.FC<Props> = ({
  buttonMessage,
  backButtonHandler,
}) => {
  return (
    <>
      <HeaderStyle>
        {buttonMessage && backButtonHandler && (
          <BackLinkArea>
            <IconButton Icon={ArrowLeft} onClick={backButtonHandler} />
            <BackButtonText>{buttonMessage}</BackButtonText>
          </BackLinkArea>
        )}
      </HeaderStyle>
      <HeaderCircleStyle src="./img/header-circle.svg" />
      <LogoStyle src="./logo.svg"></LogoStyle>
    </>
  );
};
