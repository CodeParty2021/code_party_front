import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth } from "./pages/Auth/Auth";
import { Top } from "./pages/Top/Top";
type Props = {};

export const App: React.FC<Props> = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/Auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
