import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faListSquares,
  faGlobe,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

import './Navigation.scss';
import { NewBoardFormModal } from 'components/NewBoard/NewBoard';

export function Navigation() {
  const [navBarTheme, setnavBarTheme] = useState('header__navbar');
  const [language, setLanguage] = useState(false);

  const changeNavBarTheme = () => {
    window.scrollY >= 80
      ? setnavBarTheme('header__navbar navbar-scroll')
      : setnavBarTheme('header__navbar');
  };

  window.addEventListener('scroll', changeNavBarTheme);

  const changeLanguage = () => {
    setLanguage(!language);
  };

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" className={navBarTheme}>
      <Container>
        <Navbar.Brand className="font-weight-bold navbar__logo" href="/">
          Project Management App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="navbar__item">
          <Nav className="me-auto navbar__link-container">
            <NewBoardFormModal />
            <Nav.Link className="navbar__link" as={Link} to="/board-list">
              <FontAwesomeIcon className="mr-1" icon={faListSquares} size="xs" />
              Boards
            </Nav.Link>
            <Nav.Link className="navbar__link" as={Link} to="/profile">
              <FontAwesomeIcon className="mr-1" icon={faUser} size="xs" />
              Edit Profile
            </Nav.Link>
          </Nav>
          <Nav className="navbar__btn-container">
            <button type="button" className="navbar__btn" onClick={changeLanguage}>
              <FontAwesomeIcon className="mr-1" icon={faGlobe} size="xs" />
              {language ? 'Ru' : 'En'}
            </button>
            <button type="button" className="navbar__btn">
              <FontAwesomeIcon className="mr-1" icon={faRightFromBracket} size="xs" />
              Sign out
            </button>
            {/* <button type="button" className="navbar__btn">
              <FontAwesomeIcon className="element__star mr-1" icon={faRightFromBracket} size="xs" />
              Sign in
            </button>
            <button type="button" className="navbar__btn">
              <FontAwesomeIcon className="element__star mr-1" icon={faRightFromBracket} size="xs" />
              Sign up
            </button> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
