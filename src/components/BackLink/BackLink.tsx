import { IconButton } from "components/IconButton/IconButton";
import { ArrowLeft } from "components/icons";
import React from "react";
import { BackButtonText, BackLinkButton } from "./BackLinkStyle";

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
      <IconButton Icon={ArrowLeft} color={iconColor} />
      <BackButtonText>{backMessage}</BackButtonText>
    </BackLinkButton>
  );
};
