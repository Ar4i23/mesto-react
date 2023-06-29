import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormValidation } from "../utils/useFormValidation";

const AddPlacePopup = ({ isOpen, isSending, onClose, onAddPlace }) => {
  const { value, error, isValid, isInputValid, hendleChange, resetInput } =
    useFormValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace(value, hendleClose);
  };

  const hendleClose = () => {
    resetInput();
    onClose();
  };

  return (
    <>
      <PopupWithForm
        name="my-modal-cread"
        title="Новое место"
        buttonText="Сохранить"
        isSendingText="Сохранение..."
        type="submit"
        isOpen={isOpen}
        onClose={hendleClose}
        onSubmit={handleSubmit}
        isSending={isSending}
        isValid={isValid}
      >
        <input
          id="name-cread"
          name="name"
          type="text"
          className={`modal__input ${
            isInputValid.name === undefined || isInputValid.name
              ? ""
              : "modal__input_error"
          }`}
          placeholder="Название картинки"
          required
          minLength="2"
          maxLength="30"
          value={value.name ? value.name : ""}
          onChange={hendleChange}
          disabled={isSending}
        />
        <span className="modal__error" id="name-cread-error">
          {error.name}
        </span>
        <input
          id="link-cread"
          name="link"
          type="url"
          className={`modal__input ${
            isInputValid.link === undefined || isInputValid.link
              ? ""
              : "modal__input_error"
          }`}
          placeholder="Ссылка на картинку"
          required
          value={value.link ? value.link : ""}
          onChange={hendleChange}
          disabled={isSending}
        />
        <span className="modal__error" id="link-cread-error">
          {error.link}
        </span>
      </PopupWithForm>
    </>
  );
};
export default AddPlacePopup;
