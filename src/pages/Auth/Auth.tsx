import React from "react";
import { firebaseConfig } from "../../config";
type Prop = {};

export const Auth: React.FC<Prop> = () => {
  console.log(firebaseConfig);
  return (
    <div>
      <h1>Auth</h1>
    </div>
  );
};
