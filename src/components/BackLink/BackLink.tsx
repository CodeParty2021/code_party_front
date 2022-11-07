import { ArrowLeft } from "components/icons";
import React from "react";
import { BackButtonText, BackLinkButton, CircleArea } from "./BackLinkStyle";
import { backLink } from "styles/colors";
type Props = {
  backMessage: string;
  onClick: () => void;
  iconColor: "blue" | "black";
};

export const BackLink: React.FC<Props> = ({
  backMessage,
  onClick,
  iconColor,
}) => {
  return (
    <BackLinkButton onClick={onClick}>
      <CircleArea>
        <ArrowLeft size={24} fill={backLink.buttonIconColor[iconColor]} />
      </CircleArea>
      <BackButtonText>{backMessage}</BackButtonText>
    </BackLinkButton>
  );
};
