import { Button } from "components/Button/Button";
import { Header } from "components/Header/Header";
import Link from "components/icons/Link";
import { PlayerPlateMe } from "components/PlayerPlate/Me/PlayerPlateMe";
import { PlayerPlateOther } from "components/PlayerPlate/Other/PlayerPlateOther";
import { StarBackground } from "components/StarBackground/StarBackground";
import React from "react";
import { SwordIcon } from "../Lobby/LobbyStyle";
import { CodeSelect } from "./components/CodeSelect";
import { useWaitingRoomState } from "./hooks/useWaitingRoomState";
import {
  BottomPanel,
  Container,
  InfoPanel,
  Others,
  PlayerBox,
  RightPanel,
  RoomID,
  RoomInfo,
  Title,
  TitlePosition,
  WaitingRoomStyle,
} from "./WaitingRoomStyle";

type Props = {};

export const RoomMatchWaitingRoom: React.FC<Props> = () => {
  const {
    user,
    roomInfo,
    isHost,
    ready,
    readyBtnHandler,
    exitBtnHandler,
    startBtnHandler,
    invitationBtnHandler,
    code,
    selectedCode,
    onChangeSelectedCode,
    openCodeSelectModal,
    closeCodeSelectModal,
    showCodeSelectModal,
    startBtnDisabled,
    readyBtnDisabled,
  } = useWaitingRoomState();

  const labelize = (codeContent: string | undefined) => {
    if (codeContent == undefined) return "";
    const firstLine = codeContent.split("\n")[0];
    return firstLine;
  };
  const color: (
    memberKeys: string[],
    userId: string
  ) => "turquoise" | "leaf" | "orange" | "magenta" = (
    memberkeys: string[],
    userId: string
  ) => {
    switch (memberkeys.indexOf(userId)) {
      case 0:
        return "magenta";
      case 1:
        return "leaf";
      case 2:
        return "turquoise";
      case 3:
        return "orange";
    }
    return "magenta";
  };

  if (user) {
    return (
      <WaitingRoomStyle>
        {showCodeSelectModal && code && (
          <CodeSelect
            codeList={code.codes}
            onSelect={onChangeSelectedCode}
            onClose={closeCodeSelectModal}
            selected={selectedCode}
            onReady={() => {
              if (!ready) readyBtnHandler();
            }}
            readyBtnDisabled={readyBtnDisabled}
          />
        )}

        <StarBackground />
        <Header backMessage="ロビーへ戻る" backButtonHandler={exitBtnHandler} />
        <Container>
          <TitlePosition>
            <SwordIcon></SwordIcon>
            <Title>フレンド対戦モード</Title>
          </TitlePosition>
          <PlayerBox>
            <PlayerPlateMe
              badge="膳所学童"
              color={color(roomInfo.memberKeys, user.id)}
              onClickSelectCode={openCodeSelectModal}
              onClickSelectOtherCode={openCodeSelectModal}
              selectedCodeName={labelize(selectedCode?.codeContent)}
              status={ready ? "ready" : "default"}
              userName={user.displayName}
              userPhoto="/logo512.png"
            />

            <RightPanel>
              <InfoPanel>
                <RoomInfo>
                  ルームID
                  <RoomID>{roomInfo.roomId}</RoomID>
                </RoomInfo>

                <Button
                  Icon={Link}
                  color="black"
                  icon="left"
                  onClick={invitationBtnHandler}
                  size="S"
                  status="default"
                  value="招待リンクをコピー"
                />
              </InfoPanel>

              <Others>
                {roomInfo.memberKeys.map((key) => {
                  if (key == user.id) return;
                  return (
                    <div key={key}>
                      <PlayerPlateOther
                        badge="膳所学童"
                        color={color(roomInfo.memberKeys, key)}
                        onClickChangeCPU={() => {}}
                        status={
                          roomInfo.members[key].ready ? "ready" : "default"
                        }
                        userName={roomInfo.members[key].displayName}
                        userPhoto="/logo512.png"
                        userType="user"
                      />
                    </div>
                  );
                })}
                {[1, 2, 3].map(
                  (i) =>
                    i >= roomInfo.memberKeys.length && (
                      <PlayerPlateOther
                        badge=""
                        color="turquoise"
                        onClickChangeCPU={undefined}
                        status="waiting"
                        userName=""
                        userPhoto="/logo512.png"
                        userType="user"
                      />
                    )
                )}
              </Others>
            </RightPanel>
          </PlayerBox>
          <BottomPanel>
            <Button
              color="black"
              icon={null}
              onClick={exitBtnHandler}
              size="M"
              status="default"
              value="退出する"
            />
            {isHost && (
              <Button
                color="pink"
                icon={null}
                onClick={startBtnHandler}
                size="M"
                status={startBtnDisabled ? "disabled" : "default"}
                value="ゲームスタート"
              />
            )}
          </BottomPanel>
        </Container>
      </WaitingRoomStyle>
    );
  } else {
    return <div>ログインが必要です</div>;
  }
};
