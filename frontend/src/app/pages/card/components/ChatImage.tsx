import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

export const ChatImage = ({ item, index }: { item: any; index: number }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <img
        onClick={() => setShow(true)}
        src={item.file_url}
        style={{ width: '100px', height: '150px' }}
        alt={`${index} photoMessage`}
        key={`${index} photoKeyMEssage`}
      ></img>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        centered
        size="lg"
        style={{ borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px' }}
      >
        <Modal.Body
          className="notifications__modal"
          style={{ padding: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <img
            src={item.file_url}
            style={{ width: '80%', height: '60%' }}
            alt={`${index} photoMessage`}
            key={`${index} photoKeyMEssage`}
          ></img>
        </Modal.Body>
      </Modal>
    </>
  );
};
