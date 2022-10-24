import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";

function Header({ loggedIn }) {
  const location = useLocation();

  return (
    <header
      className={`${
        location.pathname === "/" ? "header" : "header header_theme_light"
      }`}
    >
      <Link to="/">
        <img src={logo} alt="лого" className="header__logo"></img>
      </Link>

      <Navigation loggedIn={loggedIn} />
    </header>
  );
}

export default Header;
