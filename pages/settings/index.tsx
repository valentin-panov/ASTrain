import React, { useContext, useEffect, useState } from "react";
import PageTitle from "../../components/common/PageTitle";
import Card from "../../components/common/Card";
import GradientButton from "../../components/common/GradientButton";
import { Field, Form, Formik } from "formik";
import { FetchContext } from "../../context/FetchContext";
import FormError from "../../components/FormError";
import FormSuccess from "../../components/FormSuccess";
import { AxiosError } from "axios";

interface IValues {
  bio: string;
  // formikHelpers: FormikHelpers<FormikValues>;
}

const Settings: React.FC = () => {
  const fetchContext = useContext(FetchContext);
  const [bio, setBio] = useState<IValues>({ bio: "" });
  const [successMessage, setSuccessMessage] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    const getBio = async () => {
      try {
        const { data } = await fetchContext.authAxios.get("bio");
        setBio({ bio: data.bio });
      } catch (err) {
        console.log(err);
      }
    };
    getBio().then();
  }, [fetchContext.authAxios]);

  const saveBio = async (bio: IValues) => {
    try {
      const { data } = await fetchContext.authAxios.patch("bio", { bio }); // TODO : check!
      setErrorMessage("");
      setSuccessMessage(data.message);
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        const error = err as AxiosError;
        setErrorMessage(error?.response?.data.message || "Unexpected error");
      }
      setSuccessMessage("");
    }
  };
  return (
    <>
      <PageTitle title="Settings" />
      <Card>
        <h2 className="font-bold mb-2">Fill Out Your Bio</h2>
        {successMessage && <FormSuccess text={successMessage} />}
        {errorMessage && <FormError text={errorMessage} />}
        <Formik
          initialValues={bio}
          onSubmit={(values) => saveBio(values)}
          enableReinitialize={true}
        >
          {() => (
            <Form>
              <Field
                className="border border-gray-300 rounded p-1 w-full h-56 mb-2"
                component="textarea"
                name="bio"
                placeholder="Your bio here"
              />
              <GradientButton text="Save" type="submit" />
            </Form>
          )}
        </Formik>
      </Card>
    </>
  );
};

export default Settings;
