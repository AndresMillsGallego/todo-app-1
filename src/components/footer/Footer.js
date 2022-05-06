import React from 'react';
import { useState } from 'react';

const Footer = () => {

  const [show, setShow] = useState(false);

  const handleClick = (e) => {
    setShow(!show);
  }

  return (
    <footer>
    <p onClick={handleClick} id="me">Andres Mills Gallego &copy; 2022</p>
    <p className={show ? 'showPath' : 'hidden'}>➡ 👟 ➡ 👟 ➡ 👟 ➡ 👟 ➡ 👟 ➡ 👟 ➡ 👟 ➡ 👟 ➡ 👟</p>
    <div id='links'>
      <a href='https://github.com/AndresMillsGallego'>GitHub</a>
      <a href='https://www.linkedin.com/in/andres-mills-gallego/'>LinkedIn</a>
    </div>
  </footer>
  )
}

export default Footer;