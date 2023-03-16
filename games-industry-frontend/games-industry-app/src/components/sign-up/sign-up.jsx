import { useRef, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import joi from "joi";
import { useAuth } from "../contexts/auth-context";
import feedback from "../feedback";

const SignUp = () => {
  const [backendError, setBeckendError] = useState();

  const email = "email";
  const emailPattern = "/[a-zA-z1-9]+@[a-zA-z]+\\.\\w{2,3}/";
  const passwordPattern =
    "/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8}/";
  const emailExample = "baruch0199@gmail.com";
  const passwordRulls =
    "it must contain capitalized and lowercase letters, numbers and one of this characters - !@#$%^&*])[@#$%^&* ";

  const passwordRef = useRef(null);
  const samePasswordRef = useRef(null);
  const passwordVisibleEyeRef = useRef(null);
  const passwordInvisibleEyeRef = useRef(null);
  const samePasswordVisibleEyeRef = useRef(null);
  const samePasswordInvisibleEyeRef = useRef(null);
  useEffect(() => {
    const password = passwordRef.current;
    const samePassword = samePasswordRef.current;
    const passwordVisibleEye = passwordVisibleEyeRef.current;
    const passwordInvisibleEye = passwordInvisibleEyeRef.current;
    const samePasswordVisibleEye = samePasswordVisibleEyeRef.current;
    const samePasswordInvisibleEye = samePasswordInvisibleEyeRef.current;
    passwordInvisibleEye.hidden = false;
    passwordVisibleEye.hidden = true;
    samePasswordInvisibleEye.hidden = false;
    samePasswordVisibleEye.hidden = true;

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
    samePasswordVisibleEye.addEventListener("click", () => {
      if (samePassword.type === "text") {
        samePassword.type = "password";
        samePasswordVisibleEye.hidden = true;
        samePasswordInvisibleEye.hidden = false;
      }
    });

    samePasswordInvisibleEye.addEventListener("click", () => {
      if (samePassword.type === "password") {
        samePassword.type = "text";
        samePasswordVisibleEye.hidden = false;
        samePasswordInvisibleEye.hidden = true;
      }
    });
  }, []);

  const navigate = useNavigate();
  const [notTheSamePassword, setNotTheSamePassword] = useState();
  const { signUp } = useAuth();

  const form = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      samePassword: "",
    },
    validate(values) {
      const { error } = joi
        .object({
          name: joi.string().min(5).max(50).required(),
          email: joi
            .string()
            .email({ tlds: { allow: false } })
            .min(2)
            .max(50)
            .required(),
          password: joi.string().min(8).max(50).required(),
          samePassword: joi.string().min(7).max(50).required(),
          admin: joi.boolean(),
        })
        .validate(values, {
          //abortEarly: false, it presents all errors  not only one
          abortEarly: false,
        });

      // formik each render identify if error exist, after validation all details(they must be correct) error is undefined. to handle error we return null
      if (!error) {
        console.log(error);
        return null;
      }
      //error.details present all errors orgenized inside array
      const errors = {};
      for (const detail of error.details) {
        errors[detail.path[0]] = detail.message;
      }
      return errors;
    },
    async onSubmit(values) {
      const { password, samePassword } = values;
      if (password != samePassword) {
        setNotTheSamePassword("passwords are not matched");
        return;
      }
      try {
        await signUp(values);
        navigate("/sign-in");
        feedback("now it's time to sign in 😊", 5000);
      } catch ({ response }) {
        if (response.data.includes(email)) {
          return setBeckendError(() =>
            response.data.replace(emailPattern, `example - ${emailExample}`)
          );
        }
        return setBeckendError(() =>
          response.data.replace(passwordPattern, passwordRulls)
        );
      }
    },
  });

  return (
    <form
      className="sign-up-section"
      noValidate
      autoComplete="off"
      onSubmit={form.handleSubmit}
    >
      <div className=" bi bi-controller sign-up-conroller  "></div>
      <div>
        <div className="sign-up-background">
          <h6 className="sign-up-title">sign-up</h6>
          <div className="text-danger text-center mb-3">{backendError}</div>
          <div className="sign-up-email-password-checkbox-fullname">
            <div className="text-danger text-center">{notTheSamePassword}</div>
            <div className="sign-up-fullname-wraper">
              <div className="sign-up-person"></div>
              <input
                autoComplete="off"
                className="sign-up-fullname is-invalid"
                type="text"
                name="name"
                id="name"
                placeholder="name"
                value=""
                {...form.getFieldProps("name")}
              />
              <div className="invalid-feedback">
                {form.touched.name && form.errors.name}
              </div>
            </div>
            <div className="sign-up-email-wraper">
              <div className="sign-up-mail"></div>
              <input
                autoComplete="off"
                className="sign-up-email is-invalid"
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
            <div className="sign-up-password-wraper">
              <div className="sign-up-key"></div>
              <div
                className="sign-up-visible-eye"
                ref={passwordVisibleEyeRef}
              ></div>
              <input
                autoComplete="off"
                className="sign-up-password is-invalid"
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
                className="sign-up-invisible-eye"
                ref={passwordInvisibleEyeRef}
              ></div>
            </div>
            <div className="sign-up-same-password-wraper">
              <div className="sign-up-key"></div>
              <div
                className="sign-up-same-password-visible-eye"
                ref={samePasswordVisibleEyeRef}
              ></div>
              <input
                autoComplete="off"
                className="sign-up-password is-invalid"
                type="password"
                name="samePassword"
                id="samePassword"
                placeholder="same password"
                value=""
                ref={samePasswordRef}
                {...form.getFieldProps("samePassword")}
              />
              <div className="invalid-feedback">
                {form.touched.samePassword && form.errors.samePassword}
              </div>
              <div
                className="sign-up-same-password-invisible-eye"
                ref={samePasswordInvisibleEyeRef}
              ></div>
            </div>

            {/* <div className="sign-up-check-box-wraper">
              <input
                autoComplete="off"
                className="sign-up-checkbox"
                type="checkbox"
                name="checkbox"
                id="checkbox"
              />
              <span className="sign-up-remember-me">remember me</span>
            </div> */}
          </div>
          <div className="sign-up-submit-wraper">
            <button className="sign-up-submit" type="submit">
              sign-up
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
