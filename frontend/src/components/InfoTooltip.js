import React from "react";
import errorImgPath from "../images/info-error.svg";
import successImgPath from "../images/info-success.svg";

function InfoTooltip({name, isOpen, isError, title, onClose}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_visible'}`}>
      <div className="popup__container">
        <img
          className="popup__info-image"
          src={isError ? errorImgPath : successImgPath}
          alt={isError ? "Ошибка" : "Успех"}
        />
        <h2 className="popup__title popop__title_type_info">{title}</h2>
        <button aria-label="Закрыть окно" type="button" className="btn btn_type_close popup__close-btn transition" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
