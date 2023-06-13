import React, { createRef, useEffect } from "react";
import xssFilters from "xss-filters";

interface Props {
  payload: string;
}

const TestComponent: React.FC<Props> = ({ payload }) => {
  const tooltipId = payload;
  const tooltipRef = createRef<HTMLAnchorElement>();

  useEffect(() => {
    if (tooltipRef.current) {
      tooltipRef.current.setAttribute(
        "aria-describedby",
        `tooltip_${tooltipId}`
      );
    }
  }, [tooltipId, tooltipRef]);

  return (
    <a ref={tooltipRef} href={xssFilters.uriInUnQuotedAttr(payload)}>
      INSPECT ME!
    </a>
  );
};

export default TestComponent;
