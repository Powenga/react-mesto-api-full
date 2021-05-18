import React from "react";
import SignForm from "./SignForm";

function Login({onLogin}) {

  function handleSubmit(email, pass) {
    onLogin(email, pass)
  }

  return (
    <section className="login sign-form-container">
      <SignForm title="Вход" buttonText="Войти" onSubmit={handleSubmit}/>
    </section>
  );
}

export default Login;
