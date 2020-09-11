import React from "react";
import { Navbar, NavbarBrand, NavItem, Nav } from "reactstrap";
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import {
//   isAuthenticated,
//   userDetails,
// } from "../../Redux/Authentication/AuthActions";


function NavBar() {
  const authenticated = useSelector((state) => state.auth.authenticated);
  const dispatch = useDispatch();

  return (
    <div className={styles.navbar}>
      <Navbar className={styles.navbarContainer}>
        <NavbarBrand>
          {authenticated === true ? (
            <NavLink
              to="/"
              className="text-white"
              style={{ textDecoration: "none" }}
            >
              Pro-Organiser
            </NavLink>
          ) : (
            <NavLink
              to="/home"
              className="text-white"
              style={{ textDecoration: "none" }}
            >
              Pro-Organiser
            </NavLink>
          )}
        </NavbarBrand>
        <Nav>
          <NavItem className={styles.home}>
              <NavLink
                to={`/boards`}
                className="text-white"
                style={{ textDecoration: "none" }}
                activeClassName={styles.active}
              >
                Home
              </NavLink>
          </NavItem>
          <NavItem className={styles.createBoard}>
              <NavLink
                to={`/createBoard`}
                className="text-white"
                style={{ textDecoration: "none" }}
                activeClassName={styles.active}
              >
                Create Board
              </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
