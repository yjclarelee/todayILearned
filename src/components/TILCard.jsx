import React, {useState} from "react";
import {Button, Card, Modal} from "react-bootstrap";

const TILCard = (props) => {
  const [isModal, setIsModal] = useState(false);
  const showModal = () => setIsModal(true);
  const hideModal = () => setIsModal(false);

  return <>
      <Card className="m-4 p-3">
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.body}</Card.Text>
      </Card>

    <Modal show={isModal} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideModal}>
          Close
        </Button>
        <Button variant="primary" onClick={hideModal}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  </>
}

export default TILCard;