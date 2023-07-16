import React from "react";

const ImagePopup = ({ isOpen, card, onClose }) => {
  return (
    <>
      <section
        className={`modal ${isOpen === true ? "modal_opened" : ""}`}
        id="my-modal-image"
        onClick={onClose}
      >
        <div
          className="modal__container modal__container-img"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="modal__close"
            id="close-image"
            type="button"
          ></button>
          <img
            src={card.link ? card.link : "#"}
            alt={card.name ? card.name : "#"}
            className="modal__img"
          />
          <p className="modal__heading">{card.name}</p>
        </div>
      </section>
    </>
  );
};
export default ImagePopup;
