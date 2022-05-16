import React, { useContext, useEffect, useState } from 'react';
import useForm from '../../hooks/form.js';
import axios from 'axios';

import { SettingsContext } from '../../context/settings.js';
import { AuthContext } from '../../context/auth.js';
import { v4 as uuid } from 'uuid';
import { When } from 'react-if'


import Header from '../header/header'
import Form from '../form/form'
import List from '../list/list'
import Footer from '../footer/Footer'
import Login from '../auth/Login'

const ToDo = () => {

  const settings = useContext(SettingsContext);
  const auth = useContext(AuthContext);

  const defaultValues = {
    difficulty: 4,
  }

  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  async function addItem(item) {
    console.log('item',item);
    let body = {
      assignee: item.assignee,
      text: item.text,
      difficulty: item.difficulty,
      id: uuid(),
      complete: false,
    }
    let response = await axios.post('https://api-js401.herokuapp.com/api/v1/todo', body);
    getItems();
  }

  async function getItems() {
    let response = await axios.get('https://api-js401.herokuapp.com/api/v1/todo')
    setList(response.data.results);
  }

  async function deleteItem(id) {
    let response = await axios.delete(`https://api-js401.herokuapp.com/api/v1/todo/${id}`)
    const items = list.filter(item => item._id !== id);
    setList(items);
  }

  async function toggleComplete(id, isComplete) {
    let response = await axios.put(`https://api-js401.herokuapp.com/api/v1/todo/${id}`, {complete: !isComplete})
    console.log(response)
    
    const items = list.map(item => {
      if (item._id === id) {
        item.complete = !item.complete;
      }
      return item;
    });
    setList(items);

  }

  useEffect(() => {
    getItems();
  }, [])

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);

  return (
    <>
      <Login />
      <When condition={auth.isLoggedIn}>
        <Header incomplete={incomplete} />
        <div id='main'>
          <Form
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            defaultValues={defaultValues}
          />

          <List
            list={list}
            toggleComplete={toggleComplete}
            deleteItem={deleteItem}
          />
        </div>
        <Footer /> 
        </When>
      </>
  );
};

export default ToDo;