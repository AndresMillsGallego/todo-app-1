import React from 'react';

import ToDo from './components/todo/todo.js';
import Settings from './components/settings/Settings'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default class App extends React.Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path='/settings' element={<Settings />} />
            <Route path='/' element={<ToDo />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}