import { Button } from "components/Button/Button";
import { Header } from "components/Header/Header";
import { StarBackground } from "components/StarBackground/StarBackground";
import { Loading } from "pages/Loading/Loading";
import React from "react";
import { useLobbyState } from "./hooks/useLobbyState";
import {
  Container,
  ContentsArea,
  Card,
  Title,
  TitlePosition,
  SwordIcon,
  WithButton,
  Description,
  Form,
  AlgoGatherBanner,
  AlgoStarBanner,
  ErrorMessage,
} from "./LobbyStyle";

type Props = {};

export const RoomMatchLobby: React.FC<Props> = () => {
  const {
    isLoading,
    errorMessage,
    roomIdRef,
    createRoomHandler,
    createRoomDisabled,
    enterRoomHandler,
    enterRoomDisabled,
    backButtonHandler,
  } = useLobbyState();
  return isLoading ? (
    <Loading />
  ) : (
    <StarBackground>
      <Header
        backMessage="ゲーム選択へ戻る"
        backButtonHandler={backButtonHandler}
      />
      <TitlePosition>
        <SwordIcon></SwordIcon>
        <Title>フレンド対戦モード</Title>
      </TitlePosition>
      <Container>
        <Card>
          <AlgoStarBanner src="/img/algo_star.svg"></AlgoStarBanner>
          <ContentsArea>
            <WithButton>
              <Title>新しくルームを作成する</Title>
              <Button
                color="blue"
                size="M"
                value="作成"
                onClick={createRoomHandler}
                status={createRoomDisabled ? "disabled" : "default"}
              />
            </WithButton>
          </ContentsArea>
        </Card>
        <Card>
          <AlgoGatherBanner src="/img/algo_gather.svg"></AlgoGatherBanner>
          <ContentsArea>
            <Title>ルームに参加する</Title>
            <Description>
              フレンドから教えてもらったルームIDを入力して参加
            </Description>
            <WithButton>
              <Form
                type="text"
                ref={roomIdRef}
                placeholder="ルームIDを入力"
              ></Form>
              <Button
                color="blue"
                size="M"
                value="入室"
                onClick={enterRoomHandler}
                status={enterRoomDisabled ? "disabled" : "default"}
              />
            </WithButton>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </ContentsArea>
        </Card>
      </Container>
    </StarBackground>
  );
};
