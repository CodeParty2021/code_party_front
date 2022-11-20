/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "components/Button/Button";
import { Header } from "components/Header/Header";
import { StarBackground } from "components/StarBackground/StarBackground";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "./LobbyStyle";

type Props = {};

export const RoomMatchLobby: React.FC<Props> = () => {
  const { roomCreateBtnDisabled, roomCreateBtnHandler, roomSearchBtnHandler } =
    useLobbyState();
  const devFlag = true;
  const navigate = useNavigate();
  const backButtonHandler = () => {
    navigate("/select-mode");
  };
  const [roomInputValue, setRoomInputValue] = useState("");
  return devFlag ? (
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
              <Button color="blue" size="M" value="作成" />
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
              <Form type="text" placeholder="ルームIDを入力"></Form>
              <Button color="blue" size="M" value="入室" />
            </WithButton>
          </ContentsArea>
        </Card>
      </Container>
    </StarBackground>
  ) : (
    <div>
      <div>ルーム待機画面</div>
      <button
        id="create-btn"
        onClick={roomCreateBtnHandler}
        disabled={roomCreateBtnDisabled}
      >
        ルームを建てる
      </button>
      <button id="search-btn" onClick={roomSearchBtnHandler}>
        ルームを探す
      </button>
    </div>
  );
};
