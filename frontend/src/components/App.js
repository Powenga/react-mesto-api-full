import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import React from "react";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import ProtectedRoute from "./ProtectedRoute";
import { Redirect, Route, Switch, useHistory } from "react-router";
import Login from "./Login";
import Register from "./Register";
import UserWidget from "./UserWidget";
import InfoTooltip from "./InfoTooltip";
import auth from "../utils/auth";
import { useTooltip } from "./hooks/useTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isDeleteCardPopupOpen, setIsisDeleteCardPopupOpen] =
    React.useState(false);
  // const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [deletedCard, setDeletedCard] = React.useState(false);

  // const [infoToolData, setInfoToolData] = React.useState({
  //   message: "",
  //   isError: true,
  // });

  const [loggedIn, setLoggedIn] = React.useState(false);

  const [cards, setCards] = React.useState([]);

  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    avatar: "",
    about: "",
    email: "",
    _id: "",
  });
  const [userEmail, setUserEmail] = React.useState("");
  const history = useHistory();

  const {
    setTooltipMessage,
    openTooltip,
    closeTooltip,
    isInfoTooltipOpen,
    infoToolData,
  } = useTooltip();

  React.useEffect(() => {
    auth
      .checkAutorization()
      .then(() => {
        !loggedIn && setLoggedIn(true);
        history.push("/");
      })
      .catch(() => {
        setLoggedIn(false);
        history.push("/sign-in");
      });
  }, [loggedIn, history]);

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userInfo, cards]) => {
          setCurrentUser(userInfo);
          setCards(cards);
          setUserEmail(userInfo.email);
        })
        .catch((err) => {
          setTooltipMessage(err.message, true);
          openTooltip();
        });
    }
  }, [loggedIn, openTooltip, setTooltipMessage]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleDeleteCardClick(card) {
    setDeletedCard(card);
    setIsisDeleteCardPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsisDeleteCardPopupOpen(false);
    setSelectedCard(false);
  }

  function handleUpdateUser(user) {
    setIsLoading(true);
    api
      .editProfile(user)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        setTooltipMessage(err.message, true);
        openTooltip();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(avatar, form) {
    setIsLoading(true);
    api
      .editAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        form.reset();
      })
      .catch((err) => {
        setTooltipMessage(err.message, true);
        openTooltip();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlace(card, resetForm) {
    setIsLoading(true);
    api
      .addCard(card)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
        resetForm();
      })
      .catch((err) => {
        setTooltipMessage(err.message, true);
        openTooltip();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleDeleteCard(card) {
    setIsLoading(true);
    api
      .removeCard(card)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        setTooltipMessage(err.message, true);
        openTooltip();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((userId) => userId === currentUser._id);

    api
      .likeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin(email, pass) {
    auth
      .signIn(email, pass)
      .then((res) => {
        !loggedIn && setLoggedIn(true);
        history.push("/");
      })
      .catch((err) => {
        setTooltipMessage(err.message, true);
        openTooltip();
      });
  }

  function handleRegister(email, pass) {
    auth
      .signUp(email, pass)
      .then((res) => {
        if (res) {
          setTooltipMessage("Вы успешно зарегистрировались!", false);
          openTooltip();
          history.push("/sign-in");
        } else {
          return Promise.reject("Что-то пошло не так...");
        }
      })
      .catch((err) => {
        setTooltipMessage(err.message, true);
        openTooltip();
      });
  }

  function handleLoguot() {
    auth
      .logout()
      .then(() => {
        setLoggedIn(false);
        history.push("/sign-in");
      })
      .catch((err) => {
        setTooltipMessage(err.message, true);
        openTooltip();
      });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider
        value={{ currentUser: currentUser, loggedIn: loggedIn, userEmail }}
      >
        <Header>
          <UserWidget onLogout={handleLoguot} />
        </Header>
        <main className="content page__content page__component page__component_laptop_big">
          <Switch>
            <ProtectedRoute
              path="/"
              exact
              component={Main}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteCardClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
            />
            <Route path="/sign-in">
              <Login onLogin={handleLogin} />
            </Route>
            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sing-in" />}
            </Route>
          </Switch>
        </main>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <ConfirmationPopup
          isOpen={isDeleteCardPopupOpen}
          card={deletedCard}
          onClose={closeAllPopups}
          onDeleteCard={handleDeleteCard}
          isLoading={isLoading}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          name="info"
          isOpen={isInfoTooltipOpen}
          isError={infoToolData.isError}
          title={infoToolData.message}
          onClose={closeTooltip}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
