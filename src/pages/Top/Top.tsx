import React from "react";
import { Link } from "react-router-dom";

type Prop = {};

export const Top: React.FC<Prop> = () => {
  return (
    <div>
      <h1>What is CodeParty</h1>
      <Link to="/start">Lets Play</Link>
    </div>
  );
};
