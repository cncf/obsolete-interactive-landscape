import React from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';
import Iconator from './../Iconator';
import './Modal.css';


class ItemModal extends React.Component {
  renderTwitter() {
    let element;
    if (this.props.data.external) {
      if (this.props.data.external.twitter) {
        element = <a href={this.props.data.external.twitter} ><i className="twitter icon" /></a>;
      }
    }
    return element;
  }
  renderCrunch() {
    let element;
    if (this.props.data.external) {
      if (this.props.data.external.crunchbase) {
        element = <a href={this.props.data.external.crunchbase} ><i className="bookmark outline icon" /></a>;
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
  
  renderLogo() {
    let element;
    if (this.props.data.calculated) {
      if (this.props.data.calculated.resized_logo) {
        element = this.props.data.calculated.resized_logo;
      }
    }
    return element;
  }
  
  renderSummary(c,data){
    if(c.cb_summary){
      return(
        <div className="about">
          
          <div className="summary">
            <h4>About {data.company}</h4>
            <p>{c.cb_summary} </p>
          </div>
          <div className="list">
            <ul>
              {c.cb_city ? <li>Location: {c.cb_city} </li> : ''}
              
            </ul>
          </div>
        </div>
      );
    }
  }
  
  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });
  
  render() {
    const data = this.props.data;
    const c = this.props.calculated;
    console.log(data);

    
    return (
    
      <Modal className="item-modal" trigger={<span>{ this.props.children }</span>} closeIcon>
        <Modal.Header>
          <Iconator icon={this.props.slug} size="s" />
          <span>{this.props.cat}</span> | {this.props.subcat}
        </Modal.Header>
        <Modal.Content image>
          <div className="item-image x2" style={{ backgroundImage: `url(${c.resized_logo})` }} />
      
          <div className="details">
            <h2>{ data.name }</h2>
            
            <div className="details_content">
              { data.description ? data.description : 'no description available' }
              {this.renderSummary(c,data)}
            </div>
            
            <hr />
            <p>
              {data.cncf ? 'CNCF |' : ''}
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

