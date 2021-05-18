import React from "react";

function SignForm({title, buttonText, onSubmit, children}) {
  const [userData, setUserData] = React.useState({
    userEmail: "",
    userPassword: ""
  });

  function handleChange(evt){
    const {name, value} = evt.target;
    setUserData({...userData, [name]: value})
  }

  function handleSubmit(evt){
    evt.preventDefault();
    onSubmit(userData.userEmail, userData.userPassword);
  }

  return (
    <form className="sign-form" onSubmit={handleSubmit} noValidate>
      <h2 className="sign-form__title">{title}</h2>
      <label className="sign-form__input-field">
        <input
          value={userData.userEmail}
          onChange={handleChange}
          id="login-email"
          type="email"
          name="userEmail"
          placeholder="Email"
          className="sign-form__input sign-form__input_type_email"
          required
          minLength={5} maxLength={50}
        />
      </label>
      <label className="sign-form__input-field">
        <input
          value={userData.userPassword}
          onChange={handleChange}
          id="login-pass"
          type="password"
          name="userPassword"
          placeholder="Пароль"
          className="sign-form__input sign-form__input_type_pass"
          required
          minLength={5} maxLength={50}
        />
      </label>
      <button type="submit" className="btn btn_type_sign-submit transition">{buttonText}</button>
      {children}
    </form>
  );
}

export default SignForm;
