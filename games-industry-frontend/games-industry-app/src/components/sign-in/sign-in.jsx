import { useRef, useEffect, useContext } from "react";
import { CartContext } from "../contexts/cart-context";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import joi from "joi";

import feedback from "../feedback";
import { useState } from "react";

const SignIn = () => {
  const { doRender, setDoRender } = useContext(CartContext);
  const [backendError, setBeckendError] = useState();

  const email = "email";
  const emailPattern = "/[a-zA-z1-9]+@[a-zA-z]+\\.\\w{2,3}/";
  const passwordPattern =
    "/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8}/";
  const emailExample = "baruch0199@gmail.com";
  const passwordRulls =
    "it must contain capitalized and lowercase letters, numbers and one of this characters - !@#$%^&*])[@#$%^&* ";

  const passwordRef = useRef(null);
  const passwordVisibleEyeRef = useRef(null);
  const passwordInvisibleEyeRef = useRef(null);
  useEffect(() => {
    const password = passwordRef.current;
    const passwordVisibleEye = passwordVisibleEyeRef.current;
    const passwordInvisibleEye = passwordInvisibleEyeRef.current;
    passwordInvisibleEye.hidden = false;
    passwordVisibleEye.hidden = true;

    passwordVisibleEye.addEventListener("click", () => {
      if (password.type === "text") {
        password.type = "password";
        passwordVisibleEye.hidden = true;
        passwordInvisibleEye.hidden = false;
      }
    });

    passwordInvisibleEye.addEventListener("click", () => {
      if (password.type === "password") {
        password.type = "text";
        passwordVisibleEye.hidden = false;
        passwordInvisibleEye.hidden = true;
      }
    });
  }, []);

  const navigate = useNavigate();
  const { signIn } = useAuth();

  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate(values) {
      const { error } = joi
        .object({
          email: joi
            .string()
            .email({ tlds: { allow: false } })
            .min(2)
            .max(50)
            .required(),
          password: joi.string().min(8).max(50).required(),
        })
        .validate(values, {
          abortEarly: false,
        });
      if (!error) {
        console.log(error);
        return null;
      }

      const errors = {};
      for (const detail of error.details) {
        errors[detail.path[0]] = detail.message;
      }
      return errors;
    },
    async onSubmit(values) {
      try {
        const response = await signIn(values);
        navigate("/");
        setDoRender(doRender + 1);
        feedback("well done, you have signed in", "slide");
      } catch ({ response }) {
        if (response.data.includes(email)) {
          return setBeckendError(() =>
            response.data.replace(emailPattern, `example - ${emailExample}`)
          );
        }
        setBeckendError(() =>
          response.data.replace(passwordPattern, passwordRulls)
        );
      }
    },
  });

  return (
    <form
      className="sign-in-section "
      noValidate
      autoComplete="off"
      onSubmit={form.handleSubmit}
    >
      <div className=" bi bi-controller sign-in-conroller"></div>
      <div className="sign-in-background">
        <h6 className="sign-in-title">sign-in</h6>
        <div className="text-danger text-center mb-3">{backendError}</div>
        <div className="sign-in-email-password-checkbox">
          <div className="sign-in-email-wraper">
            <div className="sign-in-mail"></div>
            <input
              autoComplete="off"
              className="sign-in-email is-invalid"
              type="email"
              name="email"
              id="email"
              placeholder="email"
              value=""
              {...form.getFieldProps("email")}
            />

            <div className="invalid-feedback">
              {form.touched.email && form.errors.email}
            </div>
          </div>
          <div className="sign-in-password-wraper">
            <div className="sign-in-key"></div>
            <div
              className="sign-in-visible-eye"
              ref={passwordVisibleEyeRef}
            ></div>
            <input
              autoComplete="off"
              className="sign-in-password is-invalid"
              type="password"
              name="password"
              id="password"
              placeholder="password"
              ref={passwordRef}
              value=""
              {...form.getFieldProps("password")}
            />
            <div className="invalid-feedback">
              {form.touched.password && form.errors.password}
            </div>
            <div
              className="sign-in-invisible-eye"
              ref={passwordInvisibleEyeRef}
            ></div>
          </div>
          {/* <div className="sign-in-check-box-wraper">
            <input
              autoComplete="off"
              className="sign-in-checkbox"
              type="checkbox"
              name="checkbox"
              id="checkbox"
            />
            <span className="sign-in-remember-me">remember me</span>
          </div> */}
        </div>
        <div className="sign-in-submit-wraper">
          <button className="sign-in-submit" type="submit">
            sign-in
          </button>
        </div>
        {/* <div className="sign-in-forgot-passord-wraper">
          <span className="sign-in-forgot-passord">Forgot password</span>
        </div> */}
      </div>
    </form>
  );
};

export default SignIn;
