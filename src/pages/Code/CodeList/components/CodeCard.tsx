import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

type Props = {
  id: string;
  codeContent: string;
  updatedAt: string;
};

const Card = styled.div`
  background-color: gray;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  width: 600px;
  color: white;
`;

export const CodeCard: React.FC<Props> = (props: Props) => {
  return (
    <Card>
      <pre>{props.codeContent}</pre>
      <p>UpdatedAt:{props.updatedAt} </p>
      <Link to={"/free-coding/" + props.id + "/codes"}>編集</Link>
    </Card>
  );
};
