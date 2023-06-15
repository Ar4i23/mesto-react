import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <>
      <section
        className={`modal ${card.isOpen === true ? "modal_opened" : ""}`}
        id="my-modal-image"
        onClick={(evt) => {
          onClose(evt);
        }}
      >
        <div className="modal__container modal__container_img">
          <button
            className="modal__close"
            id="close-image"
            type="button"
          ></button>
          <img src={card.src} alt={card.name} className="modal__img" />
          <p className="modal__heading">{card.name}</p>
        </div>
      </section>
    </>
  );
}
export default ImagePopup;
