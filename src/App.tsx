import React from "react";

import { HashRouter, Route, Routes, Link } from "react-router-dom";

import { Auth } from "./pages/Auth/Auth";
import { Top } from "./pages/Top/Top";
type Props = {};

// react router はこのページが参考になるよ
// https://reffect.co.jp/react/react-router#Link

export const currentUser = React.createContext(undefined);

export const App: React.FC<Props> = () => {
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
      </HashRouter>
    </div>
  );
};

export default App;
