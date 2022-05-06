import React from 'react';
import { useState, useEffect } from 'react';
export const SettingsContext = React.createContext();

function SettingsProvider({children}) {

  const [showCompleted, setShowCompleted] = useState();

  const [itemsToDisplay, setItemsToDisplay] = useState();

  const [sortString, setSortString] = useState();

  const getCompleted = () => {
    const savedCompleted = localStorage.getItem('completed');
    const completed = JSON.parse(savedCompleted)
    if (completed) setShowCompleted(completed)
    else setShowCompleted(false);
  } 

  const getItems = () => {
    const savedItems = localStorage.getItem('items');
    const items = +JSON.parse(savedItems)
    if (items) setItemsToDisplay(items)
    else setItemsToDisplay(3);
  } 

  const getSort = () => {
    const savedSort = localStorage.getItem('sort');
    const sort = JSON.parse(savedSort)
    if (sort) setSortString(sort)
    else setSortString('difficulty');
  } 
  useEffect(() => {getCompleted()}, [])
  useEffect(() => {getItems()}, [])
  useEffect(() => {getSort()}, [])
  

  const state = {
    showCompleted, 
    itemsToDisplay,
    sortString,
    setShowCompleted,
    setItemsToDisplay,
    setSortString
  }

  return (
    <SettingsContext.Provider value={state}>
      {children}
    </SettingsContext.Provider>
  )
}


export default SettingsProvider;