import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { When } from 'react-if'

import { Button } from '@blueprintjs/core'

const Login = () => {

  const { isLoggedIn, login, logout } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password)
  }

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
  }

  return (
    <div id="login">
      <When condition={isLoggedIn}>
        <Button onClick={logout}>Logout</Button>
      </When>

      <When condition={!isLoggedIn}>
        <form onSubmit={handleSubmit}>
          <input 
            placeholder="username"
            name="username"
            type='text'
            onChange={handleChange}
            />
            <input 
            placeholder="password"
            name="password"
            type='text'
            onChange={handleChange}
            />
            <Button type='submit'>Login</Button>
        </form>
      </When>
    </div>
  )
};

export default Login;