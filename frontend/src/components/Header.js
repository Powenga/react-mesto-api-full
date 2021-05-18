import logoPath from '../images/logo.svg';
import React from "react";

function Header({children}) {
  return (
    <header className="header page__component page__component_laptop_wide">
      <a href="/" target="_self" className="logo transition">
        <img src={logoPath} className="logo__img" alt="Логотип" />
      </a>
      {children}
    </header>
  );
}

export default Header;
