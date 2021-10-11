import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import Nav from "../components/Nav";
import TILCard from '../components/TILCard';
import Footer from "../components/Footer";
import axios from "axios";

const Main = () => {
  const [cardData, setCardData] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const showModal = () => setIsModal(true);
  const hideModal = () => setIsModal(false);

  const getData = async () => {
    const res = await axios.get("http://localhost:4000/posts");
    setCardData(res.data);
  }

  useEffect(() => {
    getData();
  }, [])

  return <div>
    <Nav showModal={showModal}/>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", marginLeft: "3.5rem", marginRight: "3.5rem"}}>
    {
      cardData.map(card => 
        <TILCard
          key={card.id} 
          title={card.title}
          body={card.body}
        />)
    }
    </div>
    <Modal show={isModal} onHide={hideModal} dialogClassName="modal-90w modal-60v">
      <Modal.Header closeButton>
        <Modal.Title>새 글</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>제목</Form.Label>
            <Form.Control type="text"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="body">
            <Form.Label>내용</Form.Label>
            <Form.Control as="textarea" rows={5}/>
          </Form.Group>
          <Button variant="outline-dark" type="submit">
            글 작성
          </Button>
      </Form>
      </Modal.Body>
    </Modal>
    <Footer></Footer>
  </div>
}

export default Main;