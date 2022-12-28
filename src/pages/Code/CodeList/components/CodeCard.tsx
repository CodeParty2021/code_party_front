import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

type Props = {
  id: string;
  codeContent: string;
  updatedAt: string;
  deleteHandler: (id: string) => void;
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
      <div>
        <Link to={"/free-coding/" + props.id + "/codes"}>編集</Link>
        <button onClick={() => props.deleteHandler(props.id)}>削除</button>
      </div>
    </Card>
  );
};
