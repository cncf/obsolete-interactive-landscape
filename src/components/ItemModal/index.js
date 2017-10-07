import React from 'react';
import { Modal, Button, Icon} from 'semantic-ui-react';
import './Modal.css';

const ItemModal = ({ data, children }) => (
  <Modal className="item-modal" trigger={<div>{ children }</div>}>
    <Modal.Header><span className="showme">{ data.name }</span></Modal.Header>
    <Modal.Content image>
      <div className="item-image x2" style={{ backgroundImage: `url(${data.calculated.resized_logo})` }} />
  
      <div className="details">
        <h2>Alibaba Cloud</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed doeiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat.
        </p>
        <hr />
        <p> OSS <i className="check icon" /> | <i className="github icon" />
          <i className="twitter icon" />
        </p>
      </div>
      
    </Modal.Content>
    <Modal.Actions>
      <Button
        color="red"
        content="Like"
        icon="heart"
        label={{ basic: true, color: 'red', pointing: 'left', content: '2,048' }}
      />
      <Button primary>
        Proceed <Icon name="right chevron" />
      </Button>
    </Modal.Actions>
  </Modal>
);

export default ItemModal;

