import React from 'react';
import { Modal, Button, Icon, Label } from 'semantic-ui-react';
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
        element = <a href={this.props.data.external.crunchbase} ><i className="database outline icon" /></a>;
      }
    }
    return element;
  }
  renderStars(c) {
    let element;
    if (c) {
      if (c.gh_stars) {
        element = (
        <Label basic color="grey" horizontal>
          <Icon name='github' />
          GH stars
          <Label.Detail>{c.gh_stars}</Label.Detail>
        </Label>
        )
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
              {c.cb_country ? <li>Country: {c.cb_country} </li> : ''}
              {c.cb_employees ? <li>Employees: {c.cb_employees} </li> : ''}
              {c.cb_raised ? <li>Raised: {c.cb_raised} </li> : ''}
              {c.cb_stock ? <li>Stock: {c.cb_stock} </li> : ''}
              
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
    console.log(c);

    
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
            <div>
              {data.cncf ? <Label basic color='blue' horizontal>CNCF</Label> : ''}
              {data.oss ? <Label basic color='green' horizontal>OSS</Label> : ''}
  
              { this.renderStars(c)}
  
              {this.renderTwitter()}
              {this.renderCrunch()}
            </div>
          </div>
    
        </Modal.Content>
        <Modal.Actions>
      
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

