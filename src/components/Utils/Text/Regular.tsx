import styled from "styled-components";
import { Text, TextProps } from "./Text";

export type RegularProps = Omit<TextProps, "fontWeight">;

export const Regular = styled(Text)<RegularProps>`
  font-weight: normal;
`;
