import { css, DefaultTheme, StyledComponent } from "styled-components";
import { Mixable, MixableProps } from "styles/Mixable/Mixable";

export type HoverProps = {
  trigger?: StyledComponent<any, DefaultTheme, any>;
} & MixableProps;

export const Hover = (props: HoverProps) => css<HoverProps>`
  ${props.trigger
    ? css`
        ${props.trigger}:hover && {
          ${Mixable({ mixin: props.mixin })}
        }
      `
    : css`
        &:hover {
          ${Mixable({ mixin: props.mixin })}
        }
      `}
`;
