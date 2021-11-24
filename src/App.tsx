import React from "react";

import { HashRouter, Route, Routes } from "react-router-dom";
import { Auth } from "./pages/Auth/Auth";
import { Top } from "./pages/Top/Top";
type Props = {};

export const App: React.FC<Props> = () => {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
