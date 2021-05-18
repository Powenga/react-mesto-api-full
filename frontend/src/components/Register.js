import React from "react";
import { Link, useHistory } from "react-router-dom";
import SignForm from "./SignForm";

function Register({onRegister}) {

  function handleSubmit(email, pass) {
    onRegister(email, pass);
  }

  return (
    <section className="register sign-form-container">
      <SignForm
        title="Регистрация"
        buttonText="Зарегистрироваться"
        onSubmit={handleSubmit}>
        <p className="register__sign-in-text">Уже зарегистрированы? <Link to="/sign-in" className="register__sign-in-link transition">Войти</Link></p>
      </SignForm>
    </section>
  );
}

export default Register;

