import React from 'react';
import ReactDOM from 'react-dom';
import SettingsProvider from './context/settings'
import AuthProvider from './context/auth';

import App from './app.js';
import './index.scss'

class Main extends React.Component {
  render() {
    return (
      <SettingsProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SettingsProvider>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Main />, rootElement);