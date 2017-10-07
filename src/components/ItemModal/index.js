import React from 'react';
import { Modal, Button, Icon} from 'semantic-ui-react';
import './Modal.css';

const ItemModal = ({ data, children }) => (
  <Modal className="item-modal" trigger={<div>{ children }</div>}>
    <Modal.Header><span className="showme">{ data.name }</span></Modal.Header>
    <Modal.Content image>
      <div className="item-image x2" style={{ backgroundImage: `url(${data.calculated.resized_logo})` }} />
  
      <div className="details">
        <h2>{ data.name }</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed doeiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat.
        </p>
        <hr />
        <p>
          {data.oss ? 'OSS |' : ''}
          {data.external.twitter ? <Icon name="twitter" /> : ''}
          {data.external.crunchbase ? <Icon name="hand peace" /> : ''}
          
        </p>
      </div>
      
    </Modal.Content>
    <Modal.Actions>
      {data.calculated.gh_stars ?
        <Button
          color="red"
          content="GH stars"
          icon="github"
          className="mini"
          label={{ basic: true, color: 'red ', pointing: 'left', content: data.calculated.gh_stars }}
        />
        : ''}
  
      {data.homepage_url ?
        <Button primary size="mini" as="a" target="_blank" href={data.homepage_url}>
          Website <Icon name="right chevron" />
        </Button>
        : ''}
        
    </Modal.Actions>
  </Modal>
);

export default ItemModal;

