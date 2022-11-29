import { Route, Routes } from 'react-router-dom';
import React from 'react';

import { Navigation } from './components/Navigation/Navigation';
import { Main } from 'pages/Main/Main';
import { BoardList } from 'pages/BoardList/BoardList';
import { Board } from 'pages/Board/Board';
import { NewBoard } from 'pages/NewBoard/NewBoard';
import { Profile } from 'pages/Profile/Profile';
import { Task } from 'components/Task/Task';
import { ErrorPage404 } from 'pages/404ErrorPage/404ErrorPage';
import { Footer } from 'components/Footer/Footer';
import { useTypedSelector } from 'hooks/useTypedSelector';

import './App.scss';

export function App() {
  const { boardID } = useTypedSelector((state) => state.boardID);

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
          <Route path="/board" element={<Board boardId={boardID} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/task" element={<Task />} />
          <Route path="*" element={<ErrorPage404 />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
