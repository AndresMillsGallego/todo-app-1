import React, { useState } from 'react';
import { Button, Label } from '@blueprintjs/core'
import axios from 'axios';

const SignUp = () => {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('')

  const handleName = (e) => {
    setName(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, password)
    const body = {
      username: name,
      password: password
    }
    let response = await axios.post('https://api-js401.herokuapp.com/signup', body)


  }
  return (
    <form onSubmit={handleSubmit}>
      <fieldset id='signup-form'>
        <legend>Sign Up!</legend>
      <Label>
        <input type='text' onChange={handleName} placeholder='username'/>
      </Label>
      <Label>
        <input type='text' onChange={handlePassword} placeholder='password'/>
      </Label>
      <Button type='submit' className='bp4-intent-primary'>Submit</Button>
      </fieldset>
    </form>
  )
}

export default SignUp;
