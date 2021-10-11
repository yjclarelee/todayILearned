import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import Nav from "../components/Nav";
import TILCard from '../components/TILCard';
import Footer from "../components/Footer";

import { dbService } from "../fbase";
import { addDoc, getDocs, query, collection } from "firebase/firestore";

const Main = () => {
  const [cardData, setCardData] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const showModal = () => setIsModal(true);
  const hideModal = () => setIsModal(false);

  const padTime = (time) => time.toString().length <= 1 ? '0' + time : time;

  const getData = async () => {
    setCardData([]);
    const res = await getDocs(query(collection(dbService, "posts")));
    // res.forEach(elem => setCardData([...cardData, elem.data()]));
    res.forEach(elem => setCardData(prevData => [...prevData, elem.data()]));
  }

  const postData = async (e) => {
    const date = new Date();
    e.preventDefault();

    await addDoc(collection(dbService, "posts"), {
      "key": Date.now(),
      "id": Date.now(), 
      "title": e.target[0].value,
      "body": e.target[1].value,
      "published_at": `${date.getFullYear()}-${padTime(date.getMonth()+1)}-${padTime(date.getDate()+1)}`
    });
    hideModal();
    getData();
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
          key={card.key}
          id={card.id}
          title={card.title}
          body={card.body}
          getData={getData}
        />)
    }
    </div>
    <Modal show={isModal} onHide={hideModal} dialogClassName="modal-90w modal-60v">
      <Modal.Header closeButton>
        <Modal.Title>새 글</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={postData}>
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