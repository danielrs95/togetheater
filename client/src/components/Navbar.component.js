import React, {useContext} from 'react';
import {Navbar, Nav } from 'react-bootstrap'
// Importamos contexto
import AuthGlobal from "../context/store/AuthGlobal";
import { logoutUser } from "../context/actions/autenticacion.action";
import Button from 'react-bootstrap/Button'
import NavbarButtons from './NavbarButtons';

export default function NavbarComponent(){
  const context = useContext(AuthGlobal);

  const LogOut = () => {
    logoutUser(context.dispatch);
  };

  return(
    <Navbar collapseOnSelect expand="lg" className='color-nav'  fixed="top">
      <Navbar.Brand href="/"><h2>Togetheater</h2></Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/Trending">Trending</Nav.Link>
          <Nav.Link href="/NowPlaying">Now Playing</Nav.Link>
          <Nav.Link href="/Popular">Popular</Nav.Link>
          <Nav.Link href="/TopRated">Top Rated</Nav.Link>
          <Nav.Link href="/Upcoming">Upcoming</Nav.Link>
          {context.stateUser.isAuthenticated === true ?
            <Nav.Link href="/Wishlist">My Whislist</Nav.Link> :
            <></>
          }
        </Nav>
        <Nav className="ml-auto">
          {context.stateUser.isAuthenticated === true
            ? <Button onClick={LogOut} className='float-right' variant="danger" type="submit">LogOut</Button>
            : <NavbarButtons/>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
