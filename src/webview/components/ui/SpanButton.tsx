import React, { FC, HTMLAttributes, KeyboardEvent, MouseEvent } from "react";

type Props = HTMLAttributes<HTMLSpanElement> & {
  codiconName: string;
  className?: string;
  tabIndex?: number;
  func?: (
    e: MouseEvent<HTMLSpanElement> | KeyboardEvent<HTMLSpanElement>
  ) => void;
};

const SpanButton: FC<Props> = ({
  codiconName,
  className,
  tabIndex = 0,
  func,
  ...props
}) => {
  return (
    <span
      onClick={(e) => {
        if (func) func(e);
      }}
      onKeyUp={(e) => {
        if (e.keyCode === 13 && func) func(e);
      }}
      tabIndex={tabIndex}
      className={`span-button codicon codicon-${codiconName} ${className}`}
      {...props}
    ></span>
  );
};

export default SpanButton;
