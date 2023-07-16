import React from "react";
import LoginComponent from "./LoginComponent";
import { useFormValidation } from "../utils/useFormValidation";

const Login = ({ isSending, onSubmit }) => {
  const { value, error, isValid, isInputValid, hendleChange, resetInput } =
    useFormValidation();
  const handleLogin = (e) => {
    e.preventDefault();
    onSubmit(value, resetInput);
  };

  return (
    <>
      <LoginComponent
        name="signin"
        type="submit"
        isValid={isValid}
        onSubmit={handleLogin}
        isSending={isSending}
      >
        <input
          id="email-login"
          name="email"
          type="email"
          className={`login__input ${
            isInputValid.email === undefined || isInputValid.email
              ? ""
              : "login__input_error"
          }`}
          placeholder="Email"
          required
          minLength="2"
          maxLength="40"
          value={value.email ? value.email : ""}
          onChange={hendleChange}
          disabled={isSending}
        />
        <span className="login__error">{error.email}</span>
        <input
          id="password-login"
          name="password"
          type="password"
          className={`login__input ${
            isInputValid.password === undefined || isInputValid.password
              ? ""
              : "login__input_error"
          }`}
          placeholder="Пароль"
          required
          minLength="2"
          maxLength="200"
          value={value.password ? value.password : ""}
          onChange={hendleChange}
          disabled={isSending}
        />
        <span className="login__error">{error.password}</span>
      </LoginComponent>
    </>
  );
};

export default Login;
