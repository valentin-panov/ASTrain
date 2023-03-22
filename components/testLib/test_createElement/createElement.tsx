import React from "react";

interface Props {
  payload: string;
  children: React.ReactNode | React.ReactNode[];
  props: Record<string, unknown>;
}

const CreateElement: React.FC<Props> = ({ payload, props, children }) => {
  return React.createElement(payload, props, children);
};

export default CreateElement;
