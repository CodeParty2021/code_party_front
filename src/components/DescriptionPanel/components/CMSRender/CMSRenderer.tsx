import React, { useEffect, useRef } from "react";
import {
  BlockQuote,
  CMSRendererStyle,
  CMSRendererStyleProps,
  P,
} from "./CMSRendererStyle";
import parse, {
  domToReact,
  HTMLReactParserOptions,
  Element,
} from "html-react-parser";
import {
  BodyType,
  ClearConditionType,
  DescriptionCMSType,
  HintBoxType,
  isBodyType,
  isClearConditionType,
  isHintBoxType,
  isTableType,
  TableType,
} from "hooks/DescriptionCMSHooks/useDescriptionCMS";
import { Table } from "../Table/Table";
import { ClearCondition } from "../ClearCondition/ClearCondition";
import { H1, H2 } from "../Heading/Heading";

type Props = CMSRendererStyleProps & {
  description: DescriptionCMSType;
};

export const CMSRenderer: React.FC<Props> = ({
  description,
  ...styleProps
}) => {
  const h1id = useRef(1);
  useEffect(() => {
    h1id.current = 1;
  }, [h1id.current]);
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
      if (element.name === "h2") {
        return <H2>{domToReact(element.children)}</H2>;
      }
    },
  };
  return (
    <CMSRendererStyle>
      {description.body.map(
        (
          s: BodyType | HintBoxType | TableType | ClearConditionType,
          index: number
        ) => {
          if (isBodyType(s))
            return <div key={index}>{parse(s.html, options)}</div>;
          if (isTableType(s))
            return (
              <Table key={index} {...styleProps}>
                {parse(s.body, options)}
              </Table>
            );
          if (isClearConditionType(s))
            return (
              <ClearCondition
                key={index}
                conditions={s.condition.map((c) => c.text)}
              ></ClearCondition>
            );
          if (isHintBoxType(s))
            return <div key={index}>ヒントボックスは未実装</div>;
        }
      )}
    </CMSRendererStyle>
  );
};
