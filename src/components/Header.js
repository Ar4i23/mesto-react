import React from "react";
import logo from "../images/logo.svg";
function Header() {
  return (
    <>
      <header className="header">
        <a href="../index.js" className="header__logo-link">
          <img className="header__img" src={logo} alt="Логотип Место" />
        </a>
      </header>
    </>
  );
}
export default Header;
