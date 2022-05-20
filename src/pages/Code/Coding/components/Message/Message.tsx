import React from "react";
import {
  MessageStyle,
  MessageStyleProps,
  MessageTriangleStyle,
} from "./MessageStyle";

type Props = MessageStyleProps & {
  title: string;
  value: string;
};

export const Message: React.FC<Props> = ({
  title,
  value,
  ...styleProps
}) => {
  return (
    <MessageStyle {...styleProps}>
      <div className="message_container_main">
        <span className="message_title">{title}</span>
        <span className="message_value">{value}</span>
      </div>
      <MessageTriangleStyle
        src="/img/message_triangle.svg"
        wrapper="svg"
      />
    </MessageStyle>
  );
};
