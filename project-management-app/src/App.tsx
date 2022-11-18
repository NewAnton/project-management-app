import { Route, Routes } from 'react-router-dom';
import React from 'react';

import { Navigation } from './components/Navigation/Navigation';
import { Main } from 'pages/Main/Main';
import './App.scss';

export function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Main />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/forms" element={<FormsPage />} />
        <Route path="/card" element={<Modal card={card} />} />
        <Route path="*" element={<ErrorPage404 />} /> */}
      </Routes>
    </>
  );
}
