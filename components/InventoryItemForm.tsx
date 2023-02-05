import React from "react";
import { Form, Formik } from "formik";
import Label from "./common/Label";
import FormInput from "./FormInput";
import GradientButton from "./common/buttons/GradientButton";
import { IItem } from "../interfaces/IItem";

const Yup = require("yup");

const InventoryItemSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  itemNumber: Yup.string().required("Item number is required"),
  unitPrice: Yup.string().required("Unit price is required"),
});

export type TInventoryItemInitialValues = Pick<
  IItem,
  "name" | "itemNumber" | "unitPrice"
>;

export interface IInventoryItemForm {
  onSubmit: (
    values: TInventoryItemInitialValues,
    arg1: () => void
  ) => Promise<void>;
}

const initialValues: TInventoryItemInitialValues = {
  name: "",
  itemNumber: "",
  unitPrice: "",
};
const InventoryItemForm: React.FC<IInventoryItemForm> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(
        values: TInventoryItemInitialValues,
        { resetForm }: { resetForm: () => void }
      ) => onSubmit(values, resetForm)}
      validationSchema={InventoryItemSchema}
      validateOnBlur={false}
    >
      {() => (
        <Form>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 mr-2 mb-2 sm:mb-0">
              <div className="mb-1">
                <Label text="Item Name" />
              </div>
              <FormInput
                ariaLabel="Name"
                name="name"
                type="text"
                placeholder="Item Name"
              />
            </div>
            <div className="w-full md:w-1/3 mr-2 mb-2 sm:mb-0">
              <div className="mb-1">
                <Label text="Item Number" />
              </div>
              <FormInput
                ariaLabel="Item Number"
                name="itemNumber"
                type="text"
                placeholder="Item Number"
              />
            </div>
            <div className="w-full md:w-1/3 mr-2 mb-2 sm:mb-0">
              <div className="mb-1">
                <Label text="Unit Price" />
              </div>
              <FormInput
                ariaLabel="Unit Price"
                name="unitPrice"
                type="number"
                placeholder="Unit Price"
              />
            </div>
          </div>
          <div className="flex">
            <div className="w-full sm:w-1/4 mt-4">
              <GradientButton type="submit">Submit</GradientButton>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default InventoryItemForm;
