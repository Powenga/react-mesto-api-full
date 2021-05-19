import React from "react";
import { Route, Redirect } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Preloader from "./Preloader";

function ProtectedRoute({ component: Component, isDataLoading, ...props }) {
  const { loggedIn } = React.useContext(CurrentUserContext);
  return (
    <Route>
      { !isDataLoading ? (
        loggedIn ?  <Component {...props} />  : <Redirect to="/sign-in" />
      ) : (
        <Preloader/>
      )}
    </Route>
  )
}

export default ProtectedRoute;
