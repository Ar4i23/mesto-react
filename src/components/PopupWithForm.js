import React from "react";
import Form from "./Form";

const PopupWithForm = ({
  isOpen,
  isSending,
  onClose,
  onSubmit,
  isValid = true,
  ...rest
}) => {
  return (
    <>
      <section
        className={`modal ${isOpen === true ? "modal_opened" : ""}`}
        id={rest.name}
        onClick={onClose}
      >
        <div className="modal__container" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onClose}
            className="modal__close"
            id="close-edit"
            type="button"
          ></button>
          <h2 className="modal__title">{rest.title}</h2>
          <Form
            children={rest.children}
            buttonText={rest.buttonText}
            isSending={isSending}
            isSendingText={rest.isSendingText}
            onSubmit={onSubmit}
            isValid={isValid}
            type={rest.type}
          />
        </div>
      </section>
    </>
  );
};
export default PopupWithForm;
