import { BackLink } from "components/BackLink/BackLink";
import { Button } from "components/Button/Button";
import { StarBackground } from "components/StarBackground/StarBackground";
import { TranslucentCard } from "components/TranslucentCard/TranslucentCard";
import { Loading } from "pages/Loading/Loading";
import React from "react";
import { useStartState } from "./hooks/useStartEmailState";
import { BackLinkPosition, TextInput } from "./StartEmailStyle";

export const StartEmail: React.FC = () => {
  const {
    loading,
    algoMessage,
    emailRef,
    passwordRef,
    emailChangeHandler,
    passwordChangeHandler,
    startBtnHandler,
    backLinkButtonHandler,
    btnDisabled,
    enterSubmitHandler,
  } = useStartState();
  return loading ? (
    <Loading />
  ) : (
    <StarBackground>
      <BackLinkPosition>
        <BackLink
          backMessage="トップに戻る"
          onClick={backLinkButtonHandler}
          iconColor="black"
        />
      </BackLinkPosition>
      <TranslucentCard modalTitle="ログインして遊ぶ" algoMessage={algoMessage}>
        <TextInput
          ref={emailRef}
          type="email"
          onChange={emailChangeHandler}
          onKeyDown={enterSubmitHandler}
          placeholder="メールアドレス"
        ></TextInput>
        <TextInput
          ref={passwordRef}
          type="password"
          onChange={passwordChangeHandler}
          onKeyDown={enterSubmitHandler}
          placeholder="パスワード"
        ></TextInput>
        <Button
          onClick={startBtnHandler}
          color="pink"
          size="M"
          value="ログイン"
          status={btnDisabled ? "disabled" : "default"}
        />
      </TranslucentCard>
    </StarBackground>
  );
};
