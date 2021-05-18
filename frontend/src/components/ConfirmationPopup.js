import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup({ isOpen, onClose, card, onDeleteCard, isLoading}) {

  function handleSubmit(evt) {
    evt.preventDefault();
    onDeleteCard(card);
  }

  return (
    <PopupWithForm title="Вы уверены?" name="confirmation" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <button type="submit" className={`btn btn_type_submit popup__submit-btn ${isLoading && 'popup__submit-btn_animated'} popup__button transition`}>
        {isLoading ? "Удаление" : "Да"}
      </button>
    </PopupWithForm>
  );
}

export default ConfirmationPopup;
