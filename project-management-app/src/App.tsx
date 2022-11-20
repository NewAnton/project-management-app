import { Route, Routes } from 'react-router-dom';
import React from 'react';

import { Navigation } from './components/Navigation/Navigation';
import { Main } from 'pages/Main/Main';
import { BoardList } from 'pages/BoardList/BoardList';
import { Board } from 'pages/Board/Board';
import { NewBoard } from 'pages/NewBoard/NewBoard';
import { ErrorPage404 } from 'pages/404ErrorPage/404ErrorPage';
import { Footer } from 'components/Footer/Footer';

import './App.scss';

export function App() {
  return (
    <>
      <header className="header">
        <Navigation />
      </header>
      <main className="main">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/board-list" element={<BoardList />} />
          <Route path="/new-board" element={<NewBoard />} />
          <Route path="/board" element={<Board />} />
          <Route path="*" element={<ErrorPage404 />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
