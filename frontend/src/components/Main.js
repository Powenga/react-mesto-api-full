import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main ({
  cards,
  onCardLike,
  onCardDelete,
  onEditProfile,
  onAddPlace, onEditAvatar,
  onCardClick,
  ...props}) {

  const {currentUser} = React.useContext(CurrentUserContext);

  return (
    <>
      <section className="profile">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <img src={currentUser.avatar} className="profile__avatar" alt="Аватар пользователя" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button aria-label="Редактировать профиль" type="button" className="btn btn_type_edit profile__edit-btn transition" onClick={onEditProfile}></button>
          <p className="profile__status">{currentUser.about}</p>
        </div>
        <button aria-label="Добавить новое место" type="button" className="btn btn_type_add profile__add-btn transition" onClick={onAddPlace}></button>
      </section>
      <section className="places content__places" aria-label='Места'>
        <ul className="places__grid">
          {cards.map(card => (
            <Card key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete} />
          ))}
        </ul>
      </section>
    </>
  );
}

export default Main;

