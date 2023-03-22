import styles from "./testContainer.module.scss";
import React from "react";
import {
  ClassicInput,
  ClassN,
  DataTestId,
  DSIH,
  ExampleRouter,
  FormAction,
  HtmlAttr,
  LocationHref,
  NextRedirect,
  RefInnerHTML,
  WindowOpen,
} from "@components/testLib";
import Barrel from "@components/testLib/container/barrel";

const components: {
  [propName: string]: React.FunctionComponent<{ payload: string }>;
} = {
  dangerouslySetInnerHTML: DSIH,
  next_router_push: ExampleRouter,
  form_action: FormAction,
  location_href: LocationHref,
  next_redirect: NextRedirect,
  ref_InnerHTML: RefInnerHTML,
  window_open: WindowOpen,
  classNames: ClassN,
  data_Test_Id: DataTestId,
  html_Attr: HtmlAttr,
};

const examples: string[] = [
  `<img src="xxx:x" onerror=alert('pwnd')>`,
  `javascript:alert(1)`,
];

const TestContainer: React.FC = () => {
  const [inputString, setInputString] = React.useState("javascript:alert(1)");
  const [element, setElement] = React.useState(Object.keys(components)[1]);

  const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputString(event.target.value);
  };

  return (
    <>
      <div className={styles.grid}>
        <div className={styles.card}>
          <ClassicInput
            value={inputString}
            onChangeHandler={onChangeInputHandler}
          />
          <p>
            Examples:
            <ul>
              {examples.map((el) => (
                <li key={el}>{el}</li>
              ))}
            </ul>
          </p>
          <br />
          <label htmlFor={"element_select"}>Tested element: </label>
          <select
            id="element_select"
            defaultValue={element}
            onChange={(e) => setElement(e.target.value)}
            className={styles.card_selectBlock}
          >
            {Object.keys(components).map((el) => (
              <option value={el} key={el}>
                {el}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.card}>
          <Barrel
            componentName={element}
            payload={inputString}
            components={components}
          />
        </div>
      </div>
    </>
  );
};

export default TestContainer;
