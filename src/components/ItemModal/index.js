import React from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';
import './Modal.css';


class ItemModal extends React.Component {
  renderTwitter() {
    let element;
    if (this.props.data.external) {
      if (this.props.data.external.twitter) {
        element = <i className="twitter icon" />;
      }
    }
    return element;
  }
  renderCrunch() {
    let element;
    if (this.props.data.external) {
      if (this.props.data.external.crunchbase) {
        element = <i className="bookmark outline icon" />;
      }
    }
    return element;
  }
  renderStars(data) {
    let element;
    if (this.props.data.calculated) {
      if (this.props.data.calculated.gh_stars) {
        element = (<Button
          color="red"
          content="GH stars"
          icon="github"
          className="mini"
          label={{ basic: true, color: 'red ', pointing: 'left', content: data.calculated.gh_stars }}
        />);
      }
    }
    return element;
  }
  
  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });
  
  render() {
    const data = this.props.data;
    return (
    
      <Modal className="item-modal" trigger={<span>{ this.props.children }</span>} closeIcon>
        <Modal.Header>
          <div className="logos-modal" />
          { data.name }
        </Modal.Header>
        <Modal.Content image>
          <div className="item-image x2" style={{ backgroundImage: `url(${data.raw_logo})` }} />
      
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
              {this.renderTwitter()}
              {this.renderCrunch()}
            </p>
          </div>
    
        </Modal.Content>
        <Modal.Actions>
          { this.renderStars(data)}
      
          {data.homepage_url ?
            <Button primary size="mini" as="a" target="_blank" href={data.homepage_url}>
            Website <Icon name="right chevron" />
            </Button>
            : ''}
    
        </Modal.Actions>
      </Modal>
    );
  }
}


export default ItemModal;

