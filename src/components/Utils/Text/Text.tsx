import styled from "styled-components";
import CSS from "csstype";
import { Mixable, MixableProps } from "styles/Mixable/Mixable";

export type TextProps = {
  display?: CSS.Properties["display"];
  textAlign?: CSS.Properties["textAlign"];
  fontSize?: CSS.Properties["fontSize"];
  color?: CSS.Properties["color"];
  fontWeight?: CSS.Properties["fontWeight"];
  lineHeight?: CSS.Properties["lineHeight"];
} & MixableProps;

export const Text = styled.span<TextProps>`
  font-family: "Noto Sans JP", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  display: ${(props) => props.display};
  text-align: ${(props) => props.textAlign};
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color};
  font-weight: ${(props) => props.fontWeight};
  line-height: ${(props) => props.lineHeight};

  ${(p) => Mixable({ mixin: p.mixin })}
`;

Text.defaultProps = {
  display: "inline",
  textAlign: "left",
  fontSize: "18px",
  color: "#2F364D",
  fontWeight: "normal",
  lineHeight: "160%",
};
