import React from "react";
function PopupWithForm({ name, title, children, isOpen, onClose, buttonText }) {
  return (
    <>
      <section
        className={`modal ${isOpen === true ? "modal_opened" : ""}`}
        id={name}
        onClick={(evt) => {
          onClose(evt);
        }}
      >
        <div className="modal__container">
          <button
            className="modal__close"
            id="close-edit"
            type="button"
          ></button>
          <h2 className="modal__title">{title}</h2>
          <form className="modal__form" name={name} noValidate>
            {children}
            <button className="modal__button" type="submit">
              {buttonText}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
export default PopupWithForm;
