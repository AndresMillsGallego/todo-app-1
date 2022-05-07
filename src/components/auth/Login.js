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
        <Button onClick={logout} className='bp4-intent-danger logout'>Logout</Button>
      </When>

      <When condition={!isLoggedIn}>
        <h1 id="login-h1">ToDo App</h1>
        <form onSubmit={handleSubmit} id='login-form'>
          <input 
            data-testid="username"
            placeholder="username"
            name="username"
            type='text'
            onChange={handleChange}
            />
            <input 
            data-testid="password"
            placeholder="password"
            name="password"
            type='text'
            onChange={handleChange}
            />
            <Button type='submit' className="bp4-intent-primary">Login</Button>
        </form>
      </When>
    </div>
  )
};

export default Login;