import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import Nav from "../components/Nav";
import TILCard from '../components/TILCard';
import Footer from "../components/Footer";
import axios from "axios";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const Main = () => {
  const [cardData, setCardData] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const showModal = () => setIsModal(true);
  const hideModal = () => setIsModal(false);

  const getData = async () => {
    const res = await axios.get("http://localhost:4000/posts?_sort=id&_order=desc");
    setCardData(res.data);
  }

  const postData = async (e) => {
    const date = new Date();
    e.preventDefault();
    await axios.post("http://localhost:4000/posts", {
      "id": Date.now(), 
      "title": e.target[0].value,
      "body": e.target[1].value,
      "published_at": `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()+1}`
    })
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
          key={card.id} 
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