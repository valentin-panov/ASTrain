import React, { useContext, useEffect, useState } from "react";
import PageTitle from "../../components/common/pageTitle/PageTitle";
import Card from "../../components/common/card/Card";
import GradientButton from "../../components/common/buttons/GradientButton";
import { Field, Form, Formik } from "formik";
import { FetchContext } from "@context/FetchContext";
import FormError from "../../components/formError/FormError";
import FormSuccess from "../../components/formSuccess/FormSuccess";
import { AxiosError } from "axios";
import { MainLayout } from "../../layouts";
import s from "./Settings.module.scss";
import { AuthContext } from "@context/AuthContext";
import { GetServerSideProps } from "next";
import { ICsrfToken } from "@interfaces/ICsrf";

interface IValues {
  bio: string;
  // formikHelpers: FormikHelpers<FormikValues>;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const csrfToken = res.getHeader("x-csrf-token") || "";
  return { props: { csrfToken } };
};

const Settings: React.FC<ICsrfToken> = ({ csrfToken }) => {
  const fetchContext = useContext(FetchContext);
  const authContext = useContext(AuthContext);
  const { userInfo } = authContext.authState;
  const [bio, setBio] = useState<IValues>({ bio: "" });
  const [successMessage, setSuccessMessage] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    const getBio = async () => {
      try {
        return await fetchContext.authAxios.get("bio", {
          params: {
            _id: userInfo._id,
          },
        });
      } catch (err) {
        console.log("getBio error", err);
      }
    };
    getBio().then((response) => {
      if (response?.status === 200) {
        setBio({ bio: response.data.bio });
      } else {
        // error handler
        console.log("getBio then error", response?.data.message);
      }
    });
  }, [fetchContext.authAxios, userInfo._id]);

  const saveBio = async (bio: IValues) => {
    try {
      const { data } = await fetchContext.authAxios.patch(
        "bio",
        { bio },
        {
          headers: {
            "x-csrf-token": csrfToken,
          },
        }
      );
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
    <MainLayout>
      <PageTitle title="Settings" />
      <Card>
        <h2 className={s.title}>Fill Out Your Bio</h2>
        {successMessage && <FormSuccess text={successMessage} />}
        {errorMessage && <FormError text={errorMessage} />}
        <Formik
          initialValues={bio}
          onSubmit={(values) => saveBio(values)}
          enableReinitialize={true}
        >
          {() => (
            <Form className={s.formContainer}>
              <Field
                className={s.formField}
                component="textarea"
                name="bio"
                placeholder="Your bio here"
              />
              {/*<input type="hidden" value={csrfToken} />*/}
              <GradientButton type="submit">Save</GradientButton>
            </Form>
          )}
        </Formik>
      </Card>
    </MainLayout>
  );
};

export default Settings;
