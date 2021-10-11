import axios from "axios";
import React, {useState} from "react";
import {Button, Card, Modal} from "react-bootstrap";

const TILCard = (props) => {
  const [isModal, setIsModal] = useState(false);
  const showModal = () => setIsModal(true);
  const hideModal = () => setIsModal(false);

  const deletePost = async () => {
    console.log('props id', props.id)
    await axios.delete(`http://localhost:4000/posts/${props.id}`);
    hideModal();
    props.getData();
  }

  return <>
      <Card onClick={showModal} className="m-3">
        <Card.Img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1471&q=80"/>
        <div className="p-2">
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.body}</Card.Text>
        </div>
      </Card>

    <Modal show={isModal} onHide={hideModal} dialogClassName="modal-90w modal-60v">
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img className="w-100" src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1471&q=80" alt="content"/>
        <div>{props.body}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-warning" onClick={deletePost}>
          삭제하기
        </Button>
      </Modal.Footer>
    </Modal>
  </>
}

export default TILCard;