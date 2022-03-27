import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Top } from "./pages/Top/Top";
import { StageList } from "./pages/Stage/StageList";
import { Stage } from "./pages/Stage/Stage";
import { Start } from "./pages/Start/Start";
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

type Props = {};

// react router はこのページが参考になるよ
// https://reffect.co.jp/react/react-router#Link

export const App: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const isDev = process.env.NODE_ENV === "development";
  useEffect(() => {
    dispatch(setCallBackToSyncUser());
  }, []);

  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/stages" element={<StageList />} />
          <Route path="/stages/:id" element={<Stage />} />
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
        </Routes>
        {isDev && <RootingScreen />}
      </HashRouter>
    </div>
  );
};

export default App;
