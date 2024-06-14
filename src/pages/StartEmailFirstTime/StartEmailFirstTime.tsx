import { BackLink } from "components/BackLink/BackLink";
import { Button } from "components/Button/Button";
import { StarBackground } from "components/StarBackground/StarBackground";
import { TranslucentCard } from "components/TranslucentCard/TranslucentCard";
import { Loading } from "pages/Loading/Loading";
import React from "react";
import { useStartEmailState } from "./hooks/useStartEmailState";
import {
  BackLinkPosition,
  SetNameStyle,
  TextInput,
} from "./StartEmailFirstTimeStyle";

export const StartEmailFirstTime: React.FC = () => {
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
  } = useStartEmailState();
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
      <SetNameStyle>
        <TranslucentCard
          algoMessage={algoMessage}
          modalTitle="アカウントを作る"
        >
          <TextInput
            ref={emailRef}
            type="email"
            autoFocus={true}
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
            value="アカウントを作る"
            size="M"
            status={btnDisabled ? "disabled" : "default"}
          />
        </TranslucentCard>
      </SetNameStyle>
    </StarBackground>
  );
};
