import React, { FC, HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLSpanElement> & {
  codiconName: string;
  className?: string;
  tabIndex?: number;
};

const SpanButton: FC<Props> = ({
  codiconName,
  className,
  tabIndex = 0,
  ...props
}) => {
  return (
    <span
      tabIndex={tabIndex}
      className={`span-button codicon codicon-${codiconName} ${className}`}
      {...props}
    ></span>
  );
};

export default SpanButton;
