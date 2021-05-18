import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup ({isOpen, onClose, onAddPlace, isLoading}) {

  const [placeName, setPlaceName] = React.useState('');
  const [placeSrc, setplaceSrc] = React.useState('');

  function handleNameChange(evt) {
    setPlaceName(evt.target.value);
  }

  function handleSrcChange(evt) {
    setplaceSrc(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: placeName,
      link: placeSrc
    }, () => {
      setPlaceName('');
      setplaceSrc('');
    })
  }

  return (
    <PopupWithForm title="Новое место" name="add-place" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <label className="popup__input-field">
        <input
          id="title-input"
          type="text"
          value={placeName}
          name="title"
          placeholder="Название"
          className="popup__input popup__input_type_title"
          required
          minLength="2"
          maxLength="30"
          onChange={handleNameChange}/>
        <span className="popup__error title-input-error"></span>
      </label>
      <label className="popup__input-field">
        <input
          id="card-url-input"
          type="url"
          value={placeSrc}
          name="link"
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_type_url"
          required
          onChange={handleSrcChange}/>
        <span className="popup__error card-url-input-error"></span>
      </label>
      <button type="submit" className={`btn btn_type_submit popup__submit-btn ${isLoading && 'popup__submit-btn_animated'} popup__button transition` } disabled={isLoading}>
        {isLoading ? "Сохранение" : "Создать"}
  </button>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
