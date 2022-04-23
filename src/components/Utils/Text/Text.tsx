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
  whiteSpace?: CSS.Properties["whiteSpace"];
} & MixableProps;

export const Text = styled.span<TextProps>`
  font-family: "Noto Sans JP", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  display: ${(p) => p.display};
  text-align: ${(p) => p.textAlign};
  font-size: ${(p) => p.fontSize};
  color: ${(p) => p.color};
  font-weight: ${(p) => p.fontWeight};
  line-height: ${(p) => p.lineHeight};
  white-space: ${(p) => p.whiteSpace};

  ${(p) => Mixable({ mixin: p.mixin })}
`;

Text.defaultProps = {
  display: "inline",
  textAlign: "left",
  fontSize: "18px",
  color: "#2F364D",
  fontWeight: "normal",
  lineHeight: "160%",
  whiteSpace: "normal",
};
