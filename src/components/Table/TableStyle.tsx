import styled from "styled-components";
export type TableStyleProps = {};

export const Tb = styled.table`
  border-collapse: collapse;
`;
export const TableStyle = styled.div`
  display: inline-block;
  text-align: center;

  background: #eaebf1;
  border-radius: 8px;
  padding: 8px;

  & thead {
    border-bottom: 1px solid #242a3d;
    margin: 2px 0px;
  }
  & th {
    padding: 2px 16px;
  }
  & td {
    padding: 2px 16px;
  }
  & tr {
    padding: 2px 0px;
  }
`;
