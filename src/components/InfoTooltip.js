import React from "react";
import Popup from "./Popup";

const InfoTooltip = ({ isOpen, successful, onClose }) => {
  return (
    <Popup isOpen={isOpen} successful={successful} onClose={onClose}>
      <div
        className={`${
          successful ? "modal__register-img" : "modal__register-img-error"
        }`}
      />
      <h2 className="modal__register-title">
        {successful
          ? "Вы успешно зарегестрировались"
          : "Что-то пошло не так! попробуйте еще раз"}
      </h2>
    </Popup>
  );
};

export default InfoTooltip;
