import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete, ...props}) {

  const {currentUser} = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = (!isOwn && 'card__trash-btn_hidden');
  const isLiked = card.likes.some(user => user._id === currentUser._id);
  const cardLikeButtonClassName = (isLiked && 'card__like-btn_liked');

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick () {
    onCardLike(card);
  }

  function handleDeleteClick () {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <button
        aria-label="Удалить место"
        type="button"
        className={`btn btn_type_trash card__trash-btn ${cardDeleteButtonClassName} transition`}
        onClick={handleDeleteClick}></button>
      <div className="card__inner" >
        <img src={card.link} alt={card.name} className="card__img" onClick={handleClick}/>
        <div className="card__content">
          <h2 className="card__title">{card.name}</h2>
          <div className="card__like-container">
            <button
              aria-label="Поставить лайк"
              type="button"
              className={`btn btn_type_like card__like-btn ${cardLikeButtonClassName} transition`}
              onClick={handleLikeClick}>
            </button>
            <p className="card__like-count">{card.likes.length}</p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Card;
