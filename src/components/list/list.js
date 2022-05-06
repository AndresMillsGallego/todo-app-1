import React, { useContext, useState, useEffect } from 'react';
import { SettingsContext } from '../../context/settings';

import { Button, Card, Elevation } from '@blueprintjs/core'
import Palm from './palm.jpg'

const List = ({ list, toggleComplete }) => {

  const settings = useContext(SettingsContext);

  const [page, setPage] = useState(1);

  const renderItems = () => {
    let items = [];
    let temp = settings.itemsToDisplay
    let start = (settings.itemsToDisplay * page) - temp;
    let end = (settings.itemsToDisplay * page);
    if (list.length > settings.itemsToDisplay) {
      for (let i = start; i < end; i++) {
        items.push(list[i]);
      }
      return items;
    } else {
      return list;
    }
  }

  return (
    <>
      <section id='cards'>
        {list.length > 0 ? renderItems().map(item => (
          item ?
            <Card key={item.id} elevation={Elevation.TWO}>
              <img src={Palm} alt='palm' className='mini-palm'/>
              <h3>{item.text}</h3>
              <p>Assigned to: {item.assignee}</p>
              <p>Difficulty: {item.difficulty}</p>
              <Button onClick={() => toggleComplete(item.id)} className={item.complete ? 'bp4-intent-danger' : 'bp4-intent-primary'}>Complete: {item.complete.toString()}</Button>
              <hr />
            </Card> : null
        )) : <img src={Palm} alt='palm' id='palm'/>
        }
        {list.length > (settings.itemsToDisplay * 2) || page > 1 ?
          <Button 
            type='click' 
            onClick={() => setPage(page - 1)} 
            className=' buttons bp4-intent-warning'
            disabled={page < 2 ? true : false}
            >Previous</Button> : null}
        {list.length > settings.itemsToDisplay ?
          <Button 
            type='click' 
            onClick={() => setPage(page + 1)} 
            className='buttons bp4-intent-success'
            disabled={list.length / page <= settings.itemsToDisplay ? true : false}
            >Next</Button> : null}
      </section>
    </>
  )
}

export default List;