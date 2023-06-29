import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormValidation } from "../utils/useFormValidation";

const EditAvatarPopup = ({ isSending, isOpen, onClose, onUpdateAvatar }) => {
  const inputRef = useRef();

  const { value, error, isValid, isInputValid, hendleChange, resetInput } =
    useFormValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({ avatar: inputRef.current.value }, hendleClose);
  };

  const hendleClose = () => {
    resetInput();
    onClose();
  };

  return (
    <>
      <PopupWithForm
        name="my-modal-avatar"
        title="Обновить аватар"
        buttonText="Обновить"
        isSendingText="Обновление..."
        type="submit"
        isOpen={isOpen}
        isValid={isValid}
        isSending={isSending}
        onClose={hendleClose}
        onSubmit={handleSubmit}
      >
        <input
          id="link-avatar"
          name="avatar"
          type="url"
          className={`modal__input ${
            isInputValid.avatar === undefined || isInputValid.avatar
              ? ""
              : "modal__input_error"
          }`}
          placeholder="Ссылка на картинку"
          required
          onChange={hendleChange}
          ref={inputRef}
          value={value.avatar ? value.avatar : ""}
          disabled={isSending}
        />
        <span className="modal__error" id="link-avatar-error">
          {error.avatar}
        </span>
      </PopupWithForm>
    </>
  );
};
export default EditAvatarPopup;
