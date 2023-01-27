import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from "react-router-dom"
import { useState, useEffect } from 'react';
function Header() {
    const [islogged, setIsLogged] = useState(false);
    const username = JSON.parse(window.localStorage.getItem('user-info'));
    useEffect(() => {
        if (window.localStorage.getItem('user-info') === null) {
            setIsLogged(true);
        }
    });
    const renderLoogedOut = (
        <>
        <Link to={"/list"}>List Bookings</Link>
        <Link to={"/add"}>Add Booking</Link>
        <Link to={"/Logout"}>Logout</Link>
        </>
    );
    const renderLoogedIn = (
        <>
        <Link to={"/login"}>Login</Link>
        <Link to={"/register"}>Register</Link>
        </>
    );
  return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">MoreCorp</Navbar.Brand>
          <Nav className="me-auto">
            
          {localStorage.getItem('user-info') ? renderLoogedOut : renderLoogedIn}
          </Nav>
        </Container>
      </Navbar>
  );
}

export default Header;
