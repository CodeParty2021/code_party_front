import React from "react";

import {
  AlgoBox,
  AlgoHeadMini,
  BackgroundBlur,
  Balloon,
  Message,
  ModalTitle,
  ModalPosition,
  ModalStyle,
} from "./TranslucentCardStyle";

type Props = {
  modalTitle: string;
  algoMessage: string;
  children: React.ReactNode;
} & {};

export const TranslucentCard: React.FC<Props> = (props: Props) => {
  const { modalTitle, algoMessage, children } = props;
  return (
    <ModalPosition>
      <ModalStyle>
        <ModalTitle>
          <span>{modalTitle}</span>
        </ModalTitle>
        <AlgoBox>
          <AlgoHeadMini />
          <Balloon src="/img/balloon.svg" />
          <Message>{algoMessage}</Message>
        </AlgoBox>
        {children}
        <BackgroundBlur />
      </ModalStyle>
    </ModalPosition>
  );
};
