import React from "react";

function Footer() {
  return (
    <footer className="footer page__footer page__component  page__component_laptop_big">
      <p className="footer__copyright">&copy; {new Date().getFullYear()} Mesto Russia</p>
    </footer>
  );
}

export default Footer;
