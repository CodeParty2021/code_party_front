import { SignOutButton } from "components/SignOutButton/SignOutButton";
import React from "react";
import { useSelector } from "react-redux";

import { HashRouter, Route, Routes, Link } from "react-router-dom";
import { RootState } from "store";

import { Auth } from "./pages/Auth/Auth";
import { Top } from "./pages/Top/Top";
import { StageList } from "./pages/Stage/StageList";
import { Stage } from "./pages/Stage/Stage";
import { Start } from "./pages/Start/Start";
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
          <Route path="/auth" element={<Auth />} />
          <Route path="/stages" element={<StageList />} />
          <Route path="/stages/:id" element={<Stage />} />
          <Route path="/start" element={<Start />} />
        </Routes>

        <p> ==============</p>
        <h3>以下開発用画面</h3>
        <ul>
          <li>
            <Link to="/">Top</Link>
          </li>
          <li>
            <Link to="/auth">Auth</Link>
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
