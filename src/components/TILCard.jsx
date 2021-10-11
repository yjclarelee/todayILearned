import React, {useEffect} from "react";
import {Button, Card, Modal} from "react-bootstrap";

const TILCard = (props) => {
  const [isModal, setIsModal] = useEffect(false);
  const showModal = () => setIsModal(true);
  const hideModal = () => setIsModal(false);

  return <>
    <Button onClick={showModal}>
      <Card>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.body}</Card.Text>
      </Card>
    </Button>

    <Modal show={isModal} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  </>
}

export default TILCard;