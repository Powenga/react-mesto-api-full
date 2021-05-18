import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function UserWidget({onLogout}) {
  const {loggedIn, userEmail} = React.useContext(CurrentUserContext);

  function signOut() {
    onLogout();
  }

  return (
  <div className="user-widget">
      <Switch>
        {loggedIn && (
          <Route>
            <p className="user-widget__email">{userEmail}</p>
            <button type="btn" onClick={signOut} className="btn user-widget__sign-out transition">Выйти</button>
          </Route>
        )}
        <Route path="/sign-in">
          <Link className="user-widget__link transition" to="/sign-up">Регистрация</Link>
        </Route>
        <Route path="/sign-up">
          <Link className="user-widget__link transition" to="/sign-in">Войти</Link>
        </Route>
      </Switch>
  </div>
  );
}

export default UserWidget;
