import React from 'react'
import { Label, Switch, Button } from '@blueprintjs/core';
import { SettingsContext } from '../../context/settings'
import { useContext, useState } from 'react';

import Header from '../header/header'
import Footer from '../footer/Footer'

const Settings = () => {

  const settings = useContext(SettingsContext);

  const [checked, setChecked] = useState(settings.showCompleted);
  const [items, setItems] = useState(settings.itemsToDisplay);
  const [sort, setSort] = useState(settings.sortString);



  const handleItems = (e) => {
    setItems(e.target.value);
  }

  const handleSort = (e) => {
    setSort(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(settings.itemsToDisplay)
    settings.setShowCompleted(checked);
    localStorage.setItem('completed', JSON.stringify(checked));
    settings.setItemsToDisplay(items);
    localStorage.setItem('items', JSON.stringify(items));
    settings.setSortString(sort);
    localStorage.setItem('sort', JSON.stringify(sort))
    alert('Change Approved!')
  }

  return (
    <>
    <Header /> 
      <form onSubmit={handleSubmit} id='settings-form'>
        <h2>Settings</h2>
        <Label>
          Show Completed
          <Switch checked={checked} onChange={() => setChecked(!checked)} />
        </Label>
          Items To Display <br />
          <input type='number' min='1' max='5' onChange={handleItems} />
        <Label>
          Sort String <br />
          <input type='text' onChange={handleSort} />
        </Label>

        <Button type='submit' className='bp4-intent-primary'>Submit Changes</Button>
        {settings.sortString? 
        <div id='current-settings'>
          <h3>Current Settings</h3>
          <p>Show Completed: {settings.showCompleted.toString()}</p>
          <p>Items To Display: {settings.itemsToDisplay}</p>
          <p>Sort String: {settings.sortString}</p>
        </div> : null
        }
      </form>
      <Footer />
    </>
  )
}

export default Settings;