import React from 'react';
import {Button, Container, Navbar} from "react-bootstrap";

const Nav = (props) => {
  return <Navbar>
  <Container>
    <Navbar.Brand href="#home" className="fs-2 fw-bold">TIL;</Navbar.Brand>
    <Navbar.Toggle />
    <div className="justify-content-end">
      <Button variant="outline-dark" onClick={props.showModal}>새 글 쓰기</Button>
   </div>
   </Container>
</Navbar>
}

export default Nav;