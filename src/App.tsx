import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Top } from "./pages/Top/Top";
import { StageList } from "./pages/Stage/StageList";
import { Stage } from "./pages/Stage/Stage";
import { Start } from "./pages/Start/Start";
import { Lp } from "./pages/Lp/Lp";
import { RobotDevelopmentTop } from "./pages/RobotDevelopment/Top/Top";
import { Specification } from "pages/RobotDevelopment/Specification/Specification";
import { OnlineMatch } from "pages/OnlineMatch/OnlineMatch";
import { Garage } from "pages/Garage/Garage";
import { GarageList } from "pages/Garage/GarageList";
import { SelectMode } from "pages/SelectMode/SelectMode";
import { RoomMatchLobby } from "pages/RoomMatch/Lobby/Lobby";
import { RoomMatchWaitingRoom } from "pages/RoomMatch/WaitingRoom/WaitingRoom";
import { RoomMatchSearchRoom } from "pages/RoomMatch/SearchRoom/SearchRoom";
import { RoomMatchGameWatch } from "pages/RoomMatch/GameWatch/GameWatch";
import { RoomMatchPickCode } from "pages/RoomMatch/PickCode/PickCode";
import { SetName } from "pages/SetName/SetName";
import { CodeCoding } from "pages/Code/Coding/Coding";
import { CodeList } from "pages/Code/CodeList/CodeList";
import { PrivateRoute } from "utils/PrivateRoute";
import { TutorialStep } from "pages/Tutorial/TutorialStep/Step";
import { TutorialMissions } from "pages/Tutorial/TutorialMission/TutorialMissions";
import { MissionEnd } from "pages/Tutorial/MissionEnd/MissionEnd";
import { setCallBackToSyncUser } from "services/user/user";
import { RootingScreen } from "components/RootingScreen/RootingScreen";
import { RoomMatchInvitation } from "pages/RoomMatch/Invitation/Invitation";
import { EventTop } from "pages/Event/Top/Top";
import { EventSelectMode } from "pages/Event/SelectMode/SelectMode";
import { EventSelectAI } from "pages/Event/SelectAI/SelectAI";
import { EventSetName } from "pages/Event/SetName/SetName";
import { RootState } from "store";
import { GameIntro } from "pages/Tutorial/GameIntro/GameIntro";

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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/stages" element={<StageList />} />
          <Route path="/stages/:id" element={<Stage />} />
          <Route path="/lp" element={<Lp />} />

          <Route
            path="/set-name"
            element={<PrivateRoute component={SetName} />}
          />
          <Route
            path="/robot-development/top"
            element={<RobotDevelopmentTop />}
          />
          <Route
            path="/robot-development/specification"
            element={<Specification />}
          />
          <Route path="/start" element={<Start />} />
          <Route path="/select-mode" element={<SelectMode />} />
          <Route
            path="/garage"
            element={<PrivateRoute component={GarageList} />}
          />
          <Route
            path="/garage/:id"
            element={<PrivateRoute component={Garage} />}
          />

          <Route
            path="/online-match"
            element={<PrivateRoute component={OnlineMatch} />}
          />
          <Route
            path="/room-match/waiting-room"
            element={<PrivateRoute component={RoomMatchWaitingRoom} />}
          />
          <Route
            path="/room-match"
            element={<PrivateRoute component={RoomMatchLobby} />}
          />
          <Route
            path="/room-match/invitation/:roomId"
            element={<RoomMatchInvitation />}
          />
          <Route
            path="/room-match/search-room"
            element={<PrivateRoute component={RoomMatchSearchRoom} />}
          />
          <Route
            path="/room-match/result"
            element={<PrivateRoute component={RoomMatchGameWatch} />}
          />
          <Route
            path="/room-match/pick-code"
            element={<PrivateRoute component={RoomMatchPickCode} />}
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

          <Route
            path="/tutorial/world/:id/missions"
            element={<PrivateRoute component={TutorialMissions} />}
          />
          <Route
            path="/tutorial/world/:world_id/mission/:mission_id/step/:step_id"
            element={<PrivateRoute component={TutorialStep} />}
          />
          <Route
            path="/tutorial/world/:world_id/mission/:mission_id/end"
            element={<PrivateRoute component={MissionEnd} />}
          />
          <Route
            path="/tutorial/world/:world_id/intro"
            element={<PrivateRoute component={GameIntro} />}
          />
          <Route path="/event" element={<EventTop />} />
          <Route
            path="/event/select-mode"
            element={
              <PrivateRoute component={EventSelectMode} redirectUrl="/event" />
            }
          />
          <Route
            path="/event/set-name"
            element={
              <PrivateRoute component={EventSetName} redirectUrl="/event" />
            }
          />
          <Route
            path="/event/select-ai"
            element={
              <PrivateRoute component={EventSelectAI} redirectUrl="/event" />
            }
          />
        </Routes>
        {isDev && <RootingScreen />}
      </BrowserRouter>
    </div>
  );
};

export default App;
