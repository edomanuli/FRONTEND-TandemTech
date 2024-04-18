import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Services/useAuth";
import { Offcanvas } from "react-bootstrap";
import "../modules/headerOffCanvas.css";

const Header = () => {
  const { removeLoginToken, isLoggedIn } = useAuth();
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const toggleOffcanvas = () => setShowOffcanvas(!showOffcanvas);
  const handleLogout = () => removeLoginToken();

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary px-3 pt-3 pb-3 fixed-top">
        <div className="container">
          <a className="navbar-brand" href="/home">
            TANDEM-TECH
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item px-3">
                <NavLink className="nav-link" to="/home">
                  HOME
                </NavLink>
              </li>
              <li className="nav-item px-2">
                <NavLink className="nav-link" to="/allplans">
                  PLANS
                </NavLink>
              </li>
              {isLoggedIn() ? (
                <>
                  <li className="nav-item px-2">
                    <button
                      className="nav-link"
                      onClick={toggleOffcanvas}
                      style={{ textDecoration: "none" }}
                    >
                      ACCOUNT
                    </button>
                  </li>
                  <button
                    className="btn btn-outline-secondary mx-2"
                    onClick={handleLogout}
                  >
                    LOG OUT
                  </button>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      LOGIN
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      REGISTER
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <Offcanvas show={showOffcanvas} onHide={toggleOffcanvas} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>ACCOUNT MENU</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul>
            <div>
              <li className="off-link">
                <NavLink to="/home" onClick={toggleOffcanvas}>
                  HOME
                </NavLink>
              </li>
            </div>

            <div>
              <li className="off-link">
                <NavLink to="/account/my-plans" onClick={toggleOffcanvas}>
                  MY PLANS
                </NavLink>
              </li>
            </div>

            <li className="off-link">
              <NavLink to="/account/my-devices" onClick={toggleOffcanvas}>
                MY DEVICES
              </NavLink>
            </li>
            <li className="off-link">
              <NavLink to="/account/my-bill" onClick={toggleOffcanvas}>
                MY BILL
              </NavLink>
            </li>
            <li className="off-link">
              <NavLink to="/account/add-device" onClick={toggleOffcanvas}>
                ADD DEVICE
              </NavLink>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Header;
