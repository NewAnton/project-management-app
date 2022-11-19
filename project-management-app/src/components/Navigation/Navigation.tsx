import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faUser,
  faListSquares,
  faGlobe,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

import './Navigation.scss';

export function Navigation() {
  const [navBarTheme, setnavBarTheme] = useState('header__navbar');

  const changeNavBarTheme = () => {
    window.scrollY >= 80
      ? setnavBarTheme('header__navbar navbar-scroll')
      : setnavBarTheme('header__navbar');
  };

  window.addEventListener('scroll', changeNavBarTheme);

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" className={navBarTheme}>
      <Container>
        <Navbar.Brand className="font-weight-bold" href="/">
          Project Management App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav className="me-auto mr-5">
            <Nav.Link className="navbar__link" as={Link} to="/board">
              <FontAwesomeIcon className="element__star mr-1" icon={faPlus} size="xs" />
              New Board
            </Nav.Link>
            <Nav.Link className="navbar__link" as={Link} to="/board-list">
              <FontAwesomeIcon className="element__star mr-1" icon={faListSquares} size="xs" />
              Boards
            </Nav.Link>
            <Nav.Link className="navbar__link" as={Link} to="/profile">
              <FontAwesomeIcon className="element__star mr-1" icon={faUser} size="xs" />
              Edit Profile
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className="navbar__link" as={Link} to="/bo">
              <FontAwesomeIcon className="element__star mr-1" icon={faGlobe} size="xs" />
              En
            </Nav.Link>
            <Nav.Link className="navbar__link" as={Link} to="/bo">
              <FontAwesomeIcon className="element__star mr-1" icon={faRightFromBracket} size="xs" />
              Sign out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
