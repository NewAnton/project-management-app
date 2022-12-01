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
import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import { SignUpForm } from 'components/SignUpForm/SignUpForm';
import { SignInForm } from 'components/SignInForm/SignInForm';
import { authSignOut } from 'services/authSignOut';
import { getToken } from 'services/getToken';

import './Navigation.scss';

export function Navigation() {
  const [navBarTheme, setnavBarTheme] = useState('header__navbar');
  const [language, setLanguage] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const changeNavBarTheme = () => {
    window.scrollY >= 80
      ? setnavBarTheme('header__navbar navbar-scroll')
      : setnavBarTheme('header__navbar');
  };

  window.addEventListener('scroll', changeNavBarTheme);

  const changeLanguage = () => {
    setLanguage(!language);
  };

  const handleCloseSignUpModal = () => {
    setIsSignUpModalOpen(!isSignUpModalOpen);
  };

  const handleCloseSignInModal = () => {
    setIsSignInModalOpen(!isSignInModalOpen);
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
            <Nav.Link className="navbar__link">
              <FontAwesomeIcon className="mr-1" icon={faPlus} size="xs" />
              New Board
            </Nav.Link>
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
            <button
              type="button"
              className="navbar__btn"
              onClick={() => {
                setIsSignUpModalOpen(true);
              }}
            >
              <FontAwesomeIcon className="mr-1" icon={faRightFromBracket} size="xs" />
              Sign up
            </button>
            <ModalWindow show={isSignUpModalOpen} onHide={handleCloseSignUpModal} title="Sign Up">
              <SignUpForm />
            </ModalWindow>
            {getToken() ? (
              <button type="button" className="navbar__btn" onClick={authSignOut}>
                <FontAwesomeIcon
                  className="element__star mr-1"
                  icon={faRightFromBracket}
                  size="xs"
                />
                Sign Out
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="navbar__btn"
                  onClick={() => {
                    setIsSignInModalOpen(true);
                  }}
                >
                  <FontAwesomeIcon
                    className="element__star mr-1"
                    icon={faRightFromBracket}
                    size="xs"
                  />
                  Sign in
                </button>
                <ModalWindow
                  show={isSignInModalOpen}
                  onHide={handleCloseSignInModal}
                  title="Sign In"
                >
                  <SignInForm />
                </ModalWindow>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
