import React from 'react';
import styled from 'styled-components';
import Burger from './Burger';
import logo from '../../assets/logo.png'

const Nav = styled.nav`
  width: 100%;
  height: 55px;
  border-bottom: 2px solid #f1f1f1;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;

  .logo {
    padding: 5px 0;
  }
  .logo a img {
    height: 35px;
} 

`

const Navbar = () => {
  return (
    <Nav>
      <div className="logo">
        <a href="/"><img src={logo} alt="logo" /></a>
      </div>
      <Burger />
    </Nav>
  )
}

export default Navbar
