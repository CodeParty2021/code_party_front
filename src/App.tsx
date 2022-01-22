import React from "react";

import { HashRouter, Route, Routes } from "react-router-dom";
import { Auth } from "./pages/Auth/Auth";
import { Top } from "./pages/Top/Top";
import { StageList } from "./pages/Stage/StageList";
import { Stage } from "./pages/Stage/Stage";
import { Start } from "./pages/Start/Start";
import { Login } from "./pages/Login/Login";
type Props = {};

export const App: React.FC<Props> = () => {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/stage" element={<StageList />} />
          <Route path="/stage/:id" element={<Stage />} />
          <Route path="/start" element={<Start />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
