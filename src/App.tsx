import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Top } from "./pages/Top/Top";
import { StageList } from "./pages/Stage/StageList";
import { Stage } from "./pages/Stage/Stage";
import { Start } from "./pages/Start/Start";
import { Step } from "./pages/Step/Step";
import { StepList} from "./pages/Step/StepList";
import { ModeSelect } from "pages/ModeSelect/ModeSelect";
import { CasualBattleLobby } from "pages/CasualBattle/Lobby/Lobby";
import { CasualBattleWaitingRoom } from "pages/CasualBattle/WaitingRoom/WaitingRoom";
import { CasualBattleSearchRoom } from "pages/CasualBattle/SearchRoom/SearchRoom";
import { CasualBattleGameWatch } from "pages/CasualBattle/GameWatch/GameWatch";
import { CodeCoding } from "pages/Code/Coding/Coding";
import { CodeList } from "pages/Code/CodeList/CodeList";
import { PrivateRoute } from "utils/PrivateRoute";
import { setCallBackToSyncUser } from "services/user/user";
import { RootingScreen } from "components/RootingScreen/RootingScreen";
import { CasualBattleInvitation } from "pages/CasualBattle/Invitation/Invitation";
import { RootState } from "store";

type Props = {};

// react router はこのページが参考になるよ
// https://reffect.co.jp/react/react-router#Link

export const App: React.FC<Props> = () => {
  const unRegisterObserver = useSelector(
    (state: RootState) => state.user.unRegisterObserver
  );
  const dispatch = useDispatch();
  const isDev = process.env.NODE_ENV === "development";

  // ログイン監視リスナーをセット
  useEffect(() => {
    dispatch(setCallBackToSyncUser());
    // ページリロードやページから出るときにリスナーを削除
    return () => {
      if (unRegisterObserver) unRegisterObserver();
    };
  }, []);

  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/stages" element={<StageList />} />
          <Route path="/stages/:id" element={<Stage />} />
          <Route path="/stages/:id/step" element={<StepList />} />
          <Route path="/stages/:id/step/:id" element={<Step />} />
          <Route path="/start" element={<Start />} />
          <Route path="/mode-select" element={<ModeSelect />} />
          <Route
            path="/casual-battle/waiting-room"
            element={<CasualBattleWaitingRoom />}
          />
          <Route path="/casual-battle" element={<CasualBattleLobby />} />
          <Route
            path="/casual-battle/invitation/:roomId"
            element={<CasualBattleInvitation />}
          />
          <Route
            path="/casual-battle/search-room"
            element={<CasualBattleSearchRoom />}
          />
          <Route
            path="/casual-battle/result"
            element={<CasualBattleGameWatch />}
          />
          <Route
            path="/codes"
            element={<PrivateRoute component={CodeList} />}
          />
          <Route
            path="/free-coding"
            element={<PrivateRoute component={CodeCoding} />}
          />
          <Route
            path="/free-coding/:codeId"
            element={<PrivateRoute component={CodeCoding} />}
          />
        </Routes>
        {isDev && <RootingScreen />}
      </HashRouter>
    </div>
  );
};

export default App;
