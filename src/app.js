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
            <Route path='/todo-app-1/settings' element={<Settings />} />
            <Route path='/todo-app-1' element={<ToDo />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}