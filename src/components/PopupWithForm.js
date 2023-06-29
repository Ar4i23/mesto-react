import React from "react";

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
          <form
            onSubmit={onSubmit}
            className="modal__form"
            name={rest.name}
            noValidate
          >
            {rest.children}
            <button
              className={`modal__button  ${
                isValid ? "" : "modal__button_invalid"
              } `}
              type={rest.type}
              disabled={isSending}
            >
              {isSending ? rest.isSendingText : rest.buttonText}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};
export default PopupWithForm;
