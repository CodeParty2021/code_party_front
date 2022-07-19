import React, { useRef } from "react";
import {
  BlockQuote,
  CMSRendererStyle,
  CMSRendererStyleProps,
  H1,
  P,
} from "./CMSRendererStyle";
import parse, {
  domToReact,
  HTMLReactParserOptions,
  Element,
} from "html-react-parser";

type Props = CMSRendererStyleProps & {
  html: string;
};

export const CMSRenderer: React.FC<Props> = ({ html, ...styleProps }) => {
  const h1id = useRef(1);

  const options: HTMLReactParserOptions = {
    replace: (node) => {
      const element = node as Element;
      if (element.name === "script") {
        return <></>;
      }
      if (element.name === "h1") {
        return <H1 id={h1id.current++}>{domToReact(element.children)}</H1>;
      }
      if (element.name === "p") {
        return <P>{domToReact(element.children)}</P>;
      }
      if (element.name === "blockquote") {
        return <BlockQuote>{domToReact(element.children)}</BlockQuote>;
      }
    },
  };
  return (
    <CMSRendererStyle {...styleProps}>{parse(html, options)}</CMSRendererStyle>
  );
};
