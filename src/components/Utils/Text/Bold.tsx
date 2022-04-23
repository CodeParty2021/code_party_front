import styled from "styled-components";
import { Text, TextProps } from "./Text";

export type BoldProps = Omit<TextProps, "fontWeight">;

export const Bold = styled(Text)<BoldProps>`
  font-weight: bold;
`;
