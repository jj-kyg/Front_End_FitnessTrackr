import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getToken, logout } from "../auth"
import "./Navbar.css";

const Navbar = ({ loginClick, setLoginClick }) => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const handleLoginClick = () => setLoginClick(!loginClick);

  return (
    <>
      <div className="nav-container">
        <div className="navbar">
          <Link to="/" className="navbar-logo">
            <h1>FitnessTrac.kr</h1>
          </Link>
          <div className="menu-icon" id="mobile-menu" onClick={handleClick}>
            {click ? (
              <>
                <span className="x"></span>
                <span className="x"></span>
                <span className="x"></span>
              </>
            ) : (
              <>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </>
            )}
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links">
                <h3>Home</h3>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/routines" className="nav-links">
                <h3>Routines</h3>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/activities" className="nav-links">
                <h3>Activities</h3>
              </Link>
            </li>
            {getToken() ? <li className="nav-item">
              <Link to="/myroutines" className="nav-links">
                <h3>Profile</h3>
              </Link>
            </li> : null}
            {getToken() ? 
              <li className="nav-item">
                <Link to="/" onClick={() => logout()} className="nav-links nav-links-btn">
                  Logout
               </Link>
              </li> 
              : 
              <li className="nav-item">
                <Link to="/login" onClick={handleLoginClick} className="nav-links nav-links-btn">
                  Login
                </Link>
            </li>}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
