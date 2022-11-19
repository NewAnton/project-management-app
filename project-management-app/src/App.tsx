import { Route, Routes } from 'react-router-dom';
import React from 'react';

import { Navigation } from './components/Navigation/Navigation';
import { Main } from 'pages/Main/Main';
import { BoardList } from 'pages/BoardList/BoardList';
import { Board } from 'pages/Board/Board';
import { ErrorPage404 } from 'pages/404ErrorPage/404ErrorPage';

export function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/board-list" element={<BoardList />} />
        <Route path="/board" element={<Board />} />
        <Route path="*" element={<ErrorPage404 />} />
      </Routes>
    </>
  );
}
