import React from "react";
import PopupWithForm from "./PopupWithForm";

const DeletePupup = ({ isOpen, onDeletePlace, onClose, isSending }) => {
  const hendleSubmit = (e) => {
    e.preventDefault();
    onDeletePlace();
  };
  return (
    <>
      <PopupWithForm
        name="my-modal-delete"
        title="Вы уверены?"
        buttonText="Да"
        type="submit"
        isSendingText="Удаление ..."
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={hendleSubmit}
        isSending={isSending}
      >
        <button
          onClick={onClose}
          className="modal__close"
          id="close-delete"
          type="button"
        ></button>
      </PopupWithForm>
    </>
  );
};

export default DeletePupup;
