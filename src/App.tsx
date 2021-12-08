import React from "react";
import { useSelector } from "react-redux";

import { HashRouter, Route, Routes, Link } from "react-router-dom";
import { User } from "services/user/user";
import { RootState } from "store";

import { Auth } from "./pages/Auth/Auth";
import { Top } from "./pages/Top/Top";
type Props = {};

// react router はこのページが参考になるよ
// https://reffect.co.jp/react/react-router#Link

export const currentUser = React.createContext(undefined);

export const App: React.FC<Props> = () => {
  const user: User | null = useSelector((state: RootState) => state.user);
  console.log(user);
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
        <ul>
          <li>
            <Link to="/">Top</Link>
          </li>
          <li>
            <Link to="/auth">Auth</Link>
          </li>
        </ul>
        <h1>ログインユーザ</h1>
        <div>{user != null ? user.displayName : "NULL"}</div>
      </HashRouter>
    </div>
  );
};

export default App;
