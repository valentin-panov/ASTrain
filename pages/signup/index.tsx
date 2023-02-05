import React, { useContext, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import Card from "../../components/common/card/Card";
import GradientButton from "../../components/common/buttons/GradientButton";
import Hyperlink from "../../components/common/buttons/Hyperlink";
import Label from "../../components/common/Label";
import FormInput from "../../components/FormInput";
import { AuthContext } from "../../context/AuthContext";
import GradientBar from "../../components/common/GradientBar";
import FormError from "../../components/FormError";
import FormSuccess from "../../components/FormSuccess";
import { publicFetch } from "@utils/fetch";
import { AxiosError } from "axios";
import { ICredentials } from "../../interfaces/ICredentials";
import logo from "../../images/logo.png";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./Singup.module.scss";
import Link from "next/link";

const Yup = require("yup");

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Signup: React.FC = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const [signupSuccess, setSignupSuccess] = useState<string>();
  const [signupError, setSignupError] = useState<string>();
  const [redirectOnLogin, setRedirectOnLogin] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const submitCredentials = async (credentials: ICredentials) => {
    try {
      setLoginLoading(true);
      const { data } = await publicFetch.post(`signup`, credentials);

      authContext.setAuthState(data);
      setSignupSuccess(data.message);
      setSignupError("");

      setTimeout(() => {
        setRedirectOnLogin(true);
      }, 700);
    } catch (err) {
      setLoginLoading(false);
      if (err instanceof Error) {
        setSignupError(err.message);
      } else {
        const error = err as AxiosError;
        setSignupError(error?.response?.data.message || "Unexpected error");
      }
      setSignupSuccess("");
    }
  };

  useEffect(() => {
    if (redirectOnLogin) {
      router.push("/dashboard").then();
    }
  }, [redirectOnLogin, router]);

  return (
    <>
      <section className="w-1/2 h-screen m-auto p-8 sm:pt-10">
        <GradientBar />
        <Card>
          <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
              <div>
                <div className="w-32 m-auto mb-6">
                  <Link href={"/"} shallow={false}>
                    <a className={styles.logo}>
                      <Image src={logo} alt="Logo" width={150} height={32} />
                    </a>
                  </Link>
                </div>
                <h2 className="mb-2 text-center text-3xl leading-9 font-extrabold text-gray-900">
                  Sign up for an account
                </h2>
                <p className="text-gray-600 text-center">
                  Already have an account?{" "}
                  <Hyperlink to="login" text="Log in now" />
                </p>
              </div>
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                }}
                onSubmit={(values: ICredentials) => submitCredentials(values)}
                validationSchema={SignupSchema}
              >
                {() => (
                  <Form className="mt-8">
                    {signupSuccess && <FormSuccess text={signupSuccess} />}
                    {signupError && <FormError text={signupError} />}
                    <input type="hidden" name="remember" value="true" />
                    <div>
                      <div className="flex">
                        <div className="mb-2 mr-2 w-1/2">
                          <div className="mb-1">
                            <Label text="First Name" />
                          </div>
                          <FormInput
                            ariaLabel="First Name"
                            name="firstName"
                            type="text"
                            placeholder="First Name"
                          />
                        </div>
                        <div className="mb-2 ml-2 w-1/2">
                          <div className="mb-1">
                            <Label text="Last Name" />
                          </div>
                          <FormInput
                            ariaLabel="Last Name"
                            name="lastName"
                            type="text"
                            placeholder="Last Name"
                          />
                        </div>
                      </div>
                      <div className="mb-2">
                        <div className="mb-1">
                          <Label text="Email address" />
                        </div>
                        <FormInput
                          ariaLabel="Email address"
                          name="email"
                          type="email"
                          placeholder="Email address"
                        />
                      </div>
                      <div>
                        <div className="mb-1">
                          <Label text="Password" />
                        </div>
                        <FormInput
                          ariaLabel="Password"
                          name="password"
                          type="password"
                          placeholder="Password"
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <GradientButton type="submit" loading={loginLoading}>
                        Sign Up
                      </GradientButton>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Signup;
