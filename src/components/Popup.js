import React from "react";

const Popup = ({ name, isOpen, onClose, children }) => {
  return (
    <section
      className={`modal  ${isOpen === true ? "modal_opened" : ""}`}
      onClick={onClose}
    >
      <div
        className={`${
          name === "image" ? "modal__container-img" : "modal__container-tooltip"
        } `}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="modal__close" type="button" />
        {children}
      </div>
    </section>
  );
};

export default Popup;
