import React from 'react';
import Container from 'react-bootstrap/Container';
import { SignUpForm } from 'components/SignUpForm/SignUpForm';
import { SignInForm } from 'components/SignInForm/SignInForm';
import { authSignOut } from 'services/authSignOut';

export function Main() {
  return (
    <Container>
      <SignUpForm />
      <SignInForm />
      <button className="sign-out-button btn btn-primary" onClick={authSignOut}>
        Sign Out
      </button>
      <h2 className="main__title">Main Page</h2>
      <h2>
        Много разного описания нашего приложения. Функциональность, пример, как работать и т.д.
      </h2>
      <h2>Описание нашей команды</h2>
      <h2>Main Page</h2>
      <h2>Main Page</h2>
      <h2>Main Page</h2>
      <h2>Main Page</h2>
      <h2>Main Page</h2>
      <h2>Main Page</h2>
      <h2>Main Page</h2>
      <h2>Main Page</h2>
      <h2>Main Page</h2>
      <h2>Main Page</h2>
      <h2>Main Page</h2>
      <h2>Main Page</h2>
      <h2>Main Page</h2>
      <h2>Main Page</h2>
      <h2>Main Page</h2>
      <h2>Main Page</h2>
      <h2>Main Page</h2>
      <h2>Main Page</h2>
      <h2>Main Page</h2>
      <h2>Main Page</h2>
      <h2>Main Page</h2>
      <h2>Main Page</h2>
    </Container>
  );
}
