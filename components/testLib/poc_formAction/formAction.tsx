import React from "react";
import s from "./formAction.module.scss";

interface Props {
  payload: string;
}

const FormAction: React.FC<Props> = ({ payload }) => {
  return (
    <>
      <h2>Form Action manipulation</h2>
      <div className={s.code}>
        inspect me!
        <form action={payload} method={"post"}>
          <button type={"submit"}>SUBMIT</button>
        </form>
      </div>
    </>
  );
};

export default FormAction;
