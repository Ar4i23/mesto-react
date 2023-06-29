import React, { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormValidation } from "../utils/useFormValidation";

const EditProfilePopup = ({ isOpen, isSending, onClose, onUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);

  const {
    value,
    error,
    isValid,
    isInputValid,
    hendleChange,
    resetInput,
    setValueInput,
  } = useFormValidation();

  useEffect(() => {
    setValueInput({ name: currentUser.name, about: currentUser.about });
  }, [currentUser, setValueInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(value, hendleClose);
  };

  const hendleClose = () => {
    resetInput({ name: currentUser.name, about: currentUser.about });
    onClose();
  };

  return (
    <>
      <PopupWithForm
        name="my-modal-edit"
        title="Редактировать профиль"
        isSendingText="Сохранение..."
        buttonText="Сохранить"
        type="submit"
        isOpen={isOpen}
        onClose={hendleClose}
        onSubmit={handleSubmit}
        isSending={isSending}
        isValid={isValid}
      >
        <input
          id="name-edit"
          name="name"
          type="text"
          className={`modal__input ${
            isInputValid.name === undefined || isInputValid.name
              ? ""
              : "modal__input_error"
          }`}
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          value={value.name ? value.name : ""}
          onChange={hendleChange}
          disabled={isSending}
        />
        <span className="modal__error" id="name-edit-error">
          {error.name}
        </span>
        <input
          id="about-edit"
          name="about"
          type="text"
          className={`modal__input ${
            isInputValid.about === undefined || isInputValid.name
              ? ""
              : "modal__input_error"
          }`}
          placeholder="Обо мне"
          required
          minLength="2"
          maxLength="200"
          value={value.about ? value.about : ""}
          onChange={hendleChange}
          disabled={isSending}
        />
        <span className="modal__error" id="about-edit-error">
          {error.about}
        </span>
      </PopupWithForm>
    </>
  );
};
export default EditProfilePopup;
