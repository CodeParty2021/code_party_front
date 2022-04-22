import {
  css,
  DefaultTheme,
  FlattenInterpolation,
  ThemedStyledProps,
} from "styled-components";

export type MixableProps = {
  mixin?: (
    | FlattenInterpolation<ThemedStyledProps<any, DefaultTheme>>
    | undefined
  )[];
};

export const Mixable = (props: MixableProps) => css<MixableProps>`
  ${props.mixin}
`;
