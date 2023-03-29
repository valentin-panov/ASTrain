import React from "react";
import styles from "./JSONparse.module.scss";

interface Props {
  payload: string;
}

const JSONparse: React.FC<Props> = ({ payload }) => {
  const deepCopy = (obj: unknown) => {
    if (!obj) return obj;

    const copied: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(obj as unknown as object)) {
      switch (typeof value) {
        case "number":
        case "symbol":
        case "boolean":
        case "undefined":
          copied[key] = value;
          break;
        case "string":
          if (value.substr(0, 8) == "function") {
            const startBody = value.indexOf("{") + 1;
            const endBody = value.lastIndexOf("}");
            const startArgs = value.indexOf("(") + 1;
            const endArgs = value.indexOf(")");

            copied[key] = new Function(
              value.substring(startArgs, endArgs),
              value.substring(startBody, endBody)
            );
          } else {
            copied[key] = value;
          }
          break;
        case "object":
          // BEGIN prototype poisoning mitigation
          // if (key === '__proto__') {
          //   break;
          // }
          // END prototype poisoning mitigation
          copied[key] = deepCopy(value);
      }
    }
    return copied;
  };

  const crafted = `{"__proto__":{"toJSON":"function(){${payload};return 1;};"},"foo":"bar"}`;
  const parsed = JSON.parse(crafted);
  const copied = deepCopy(parsed);
  JSON.stringify(copied); // JSON.stringify calls toJSON method under the hood

  return (
    <>
      <h2>Insecure deserialization for:</h2>
      <div className={styles.code}>{crafted}</div>
    </>
  );
};

export default JSONparse;