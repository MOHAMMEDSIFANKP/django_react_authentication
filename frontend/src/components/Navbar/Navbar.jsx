import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

function navbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home"></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <button className='btn btn-warning me-4'>Logout</button>
    </Navbar>
  );
}

export default navbar;