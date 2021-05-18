import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup ({isOpen, onClose, onUpdateAvatar, isLoading}) {

  const inputRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value
    }, evt.target)
  }

  return (
    <PopupWithForm title="Обновить аватар" name='edit-avatar' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <label className="popup__input-field">
        <input
          ref={inputRef}
          id="avatar-url-input"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_type_url"
          required/>
        <span className="popup__error avatar-url-input-error"></span>
      </label>
      <button type="submit" className={`btn btn_type_submit popup__submit-btn ${isLoading && 'popup__submit-btn_animated'} popup__button transition`}>
        {isLoading ? "Сохранение" : "Сохранить"}
      </button>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
