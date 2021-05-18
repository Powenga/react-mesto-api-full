import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup ({isOpen, onClose, onUpdateUser, isLoading}) {

  const {currentUser} = React.useContext(CurrentUserContext);

  const [userName, setUserName] = React.useState('');
  const [description , setDescription ] = React.useState('');

  React.useEffect(() => {
    setUserName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(evt) {
    setUserName(evt.target.value);
  }

  function  handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name: userName,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
    >
      <label className="popup__input-field">
        <input
          id="name-input"
          type="text"
          value={userName}
          name="userName"
          placeholder="Имя"
          className="popup__input popup__input_type_name"
          required
          minLength="2" maxLength="40"
          onChange={handleNameChange}/>
        <span className="popup__error name-input-error"></span>
      </label>
      <label className="popup__input-field">
        <input
          id="status-input"
          type="text"
          value={description}
          name="userAbout"
          placeholder="Статус"
          className="popup__input popup__input_type_status"
          required
          minLength="2" maxLength="200"
          onChange={handleDescriptionChange}/>
        <span className="popup__error status-input-error"></span>
      </label>
      <button type="submit" className={`btn btn_type_submit popup__submit-btn ${isLoading && 'popup__submit-btn_animated'} popup__button transition`}>
        {isLoading ? "Загрузка" : "Сохранить"}
  </button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
