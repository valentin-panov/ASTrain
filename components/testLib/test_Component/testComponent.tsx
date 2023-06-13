import React, { createRef, useEffect } from "react";

interface Props {
  payload: string;
}

const TestComponent: React.FC<Props> = ({ payload }) => {
  const tooltipId = payload;
  const tooltipRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (tooltipRef.current) {
      tooltipRef.current.setAttribute(
        "aria-describedby",
        `tooltip_${tooltipId}`
      );
    }
  }, [tooltipId, tooltipRef]);

  return <div ref={tooltipRef}>INSPECT ME!</div>;
};

export default TestComponent;
