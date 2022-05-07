import React, { useContext, useEffect, useState } from 'react';
import useForm from '../../hooks/form.js';

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

  function addItem(item) {
    console.log(item);
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
    console.log(settings.itemsToDisplay)
  }

  function deleteItem(id) {
    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {

    const items = list.map(item => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);

  }

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
          />
        </div>
        <Footer /> 
        </When>
      </>
  );
};

export default ToDo;