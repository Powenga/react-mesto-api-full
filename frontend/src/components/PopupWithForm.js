import React from "react";

function PopupWithForm({ title, name, isOpen, onClose, children, onSubmit, ...props}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_visible'}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form name={name} className="popup__form" noValidate onSubmit={onSubmit}>
          {children}
        </form>
        <button aria-label="Закрыть окно" type="button" className="btn btn_type_close popup__close-btn transition" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
