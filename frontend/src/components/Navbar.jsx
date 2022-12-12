import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import authServices from "./services/authServices";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [user, setUser] = useState();
  const [update, setUpdate] = useState();
  const [log, setLog] = useState();
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(setClick(false));
  const handleLogout = () => {
    authServices.logout();
    setUpdate(true);
  };
  const handleLogoutMobile = () => {
    closeMobileMenu();
    authServices.logout();
    setUpdate(true);
  };

  useEffect(() => {
    setUser(localStorage.getItem("role"));
  }, []);
  useEffect(() => {
    showLoginButton();
  }, [user]);

  useEffect(() => {
    return () => {
      window.location.reload();
    };
  }, [update]);

  const showLoginButton = () => {
    showButton();
    if ((user === undefined || user === null) && button) {
      setLog(
        <Button buttonStyle="btn--outline" link="/login">
          Login
        </Button>
      );
    } else {
      setLog(
        <Button buttonStyle="btn--outline" link="/" onClick={handleLogout}>
          Logout
        </Button>
      );
    }
  };
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  window.addEventListener("resize", showButton);
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <i class="fa-solid fa-taxi" />   Dispatcher
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {user === "User" || user === "Admin" ? (
              <li className="nav-item">
                <Link
                  to="/user"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  User Panel
                </Link>
              </li>
            ) : null}
            {user === "Admin" ? (
              <li className="nav-item">
                <Link
                  to="/admin"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Admin Panel
                </Link>
              </li>
            ) : null}
            {user !== null ? (
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-links-mobile"
                  onClick={handleLogoutMobile}
                >
                  Logout
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
          {button && log}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
