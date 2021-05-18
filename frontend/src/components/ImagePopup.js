import React from "react";

function ImagePopup({card, onClose, ...props}) {

  return (
    <div className={`popup popup_type_image ${card.link && 'popup_visible'}`}>
      <div className="popup__container popup__container_type_image">
        <figure className="popup__figure">
          <img src={card.link} alt={card.name} className="popup__image" />
          <figcaption className="popup__figcaption">{card.name}</figcaption>
        </figure>
        <button aria-label="Закрыть окно" type="button" className="btn btn_type_close popup__close-btn transition" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default ImagePopup;
