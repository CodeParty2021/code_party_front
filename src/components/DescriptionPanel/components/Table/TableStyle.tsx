import styled from "styled-components";
import { descriptionPanel } from "styles/colors";
export type TableStyleProps = {};

export const Tb = styled.table`
  border-collapse: collapse;
`;
export const TableStyle = styled.div`
  display: inline-block;
  text-align: center;

  background-color: ${descriptionPanel.table.background};
  border-radius: 8px;
  padding: 8px;
  color: ${descriptionPanel.table.color};
  & thead {
    border-bottom: 1px solid ${descriptionPanel.table.color};
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
