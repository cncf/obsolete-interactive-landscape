import React from 'react';
import { Header, Image, Modal } from 'semantic-ui-react';

const ItemModal = ({data}) => (
  <Modal trigger={<div>{ data.name }</div>}>
    <Modal.Header>Select a Photo</Modal.Header>
    <Modal.Content image>
      <Image wrapped size="medium" src="../assets/images/brand/cncf.png" />
      <Modal.Description>
        <Header>{ data.name }</Header>
        <p>Weve found the following gravatar image associated with your e-mail address.</p>
        <p>Is it okay to use this photo?</p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

export default ItemModal;
