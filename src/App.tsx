import { SignOutButton } from "components/SignOutButton/SignOutButton";
import React from "react";
import { useSelector } from "react-redux";

import { HashRouter, Route, Routes, Link } from "react-router-dom";
import { RootState } from "store";
import { Top } from "./pages/Top/Top";
import { StageList } from "./pages/Stage/StageList";
import { Stage } from "./pages/Stage/Stage";
import { Start } from "./pages/Start/Start";
import { ModeSelect } from "pages/ModeSelect/ModeSelect";
import { CasualBattleLobby } from "pages/CasualBattle/Lobby/Lobby";
import { CasualBattleWaitingRoom } from "pages/CasualBattle/WaitingRoom/WaitingRoom";
import { CasualBattleSearchRoom } from "pages/CasualBattle/SearchRoom/SearchRoom";
import { CasualBattleGameWatch } from "pages/CasualBattle/GameWatch/GameWatch";
import { CodeCording } from "pages/Code/Cording/Cording";
import { CodeList } from "pages/Code/CodeList/CodeList";
type Props = {};

// react router はこのページが参考になるよ
// https://reffect.co.jp/react/react-router#Link

export const currentUser = React.createContext(undefined);

export const App: React.FC<Props> = () => {
  const { user, isLogin } = useSelector((state: RootState) => state.user);

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
            path="/casual-battle/search-room"
            element={<CasualBattleSearchRoom />}
          />
          <Route
            path="/casual-battle/result"
            element={<CasualBattleGameWatch />}
          />
          <Route path="/free-cording" element={<CodeCording />} />
          <Route path="/codes" element={<CodeList />} />
        </Routes>

        <p> ==============</p>
        <h3>以下開発用画面</h3>

        <a href="https://strap.app/app/board/jkJsgBr4NKM8IvxIYo8s">
          画面名称はこちら
        </a>
        <ul>
          <li>
            <Link to="/">トップページ</Link>
          </li>
          <li>
            <Link to="/stages">ステージ選択画面</Link>
          </li>
          <li>
            <Link to="/start">ログイン画面</Link>
          </li>
          <li>
            <Link to="/mode-select">モード選択画面</Link>
          </li>
          <li>
            <Link to="/casual-battle">カジュアルロビー画面</Link>
          </li>
          <li>
            <Link to="/casual-battle/waiting-room">待機招待画面</Link>
          </li>
          <li>
            <Link to="/casual-battle/search-room">ルーム参加画面</Link>
          </li>
          <li>
            <Link to="/casual-battle/result">観戦画面</Link>
          </li>
          <li>
            <Link to="/free-cording">フリーコーディング</Link>
          </li>
          <li>
            <Link to="/codes">ガレージ画面（コード一覧)</Link>
          </li>
        </ul>
        <h1>ログインユーザ</h1>
        <p>{user?.displayName}さん</p>
        {isLogin && <SignOutButton />}
      </HashRouter>
    </div>
  );
};

export default App;
