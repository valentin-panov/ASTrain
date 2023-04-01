import React from "react";

interface Props {
  payload: string;
  // children: React.ReactNode | React.ReactNode[];
  // props: Record<string, unknown>;
}

const CreateElement: React.FC<Props> = ({ payload }) => {
  const [type, propsPayload, childrenPayload] = payload.split("|");
  // const type = payload;
  // const type = "scRipt";
  const props = { className: propsPayload };
  const children: React.ReactNode = childrenPayload;
  return React.createElement(type, props, children);
};

export default CreateElement;
