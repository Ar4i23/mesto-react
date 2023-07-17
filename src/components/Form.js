import React from "react";

const Form = ({
  name,
  buttonText,
  type,
  isSending,
  isSendingText,
  children,
  onSubmit,
  isValid,
}) => {
  return (
    <form onSubmit={onSubmit} className="login__form" name={name} noValidate>
      {children}
      {name === "signin" || name === "signup" ? (
        <button
          className={`login__button  ${
            isValid ? "" : "login__button_invalid"
          } `}
          type={type}
          disabled={isSending}
        >
          {isSending ? isSendingText : buttonText}
        </button>
      ) : (
        <button
          className={`modal__button  ${
            isValid ? "" : "modal__button_invalid"
          } `}
          type={type}
          disabled={isSending}
        >
          {isSending ? isSendingText : buttonText}
        </button>
      )}
    </form>
  );
};

export default Form;
