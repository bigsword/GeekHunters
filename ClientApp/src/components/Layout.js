import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import Filter from '../containers/Filter';
import Create from '../containers/Create';

export class Layout extends Component {
  static displayName = Layout.name;

  constructor(props) {
    super(props);

    this.state = {
      gadget: ""
    };
  }

  handleMenuClick = (menu) => {
    this.setState({
      gadget: menu
    });
  }

  handleGadgetClose = (gadget) => {
    this.setState({
      gadget: ""
    });
  }

  render () {
    var gadget = null;
    if (this.state.gadget === "filter") {
      gadget = <Filter handleClose={this.handleGadgetClose}/>;
    } else if (this.state.gadget === "create") {
      gadget = <Create handleClose={this.handleGadgetClose} />;
    }

    return (
      <div>
        <NavMenu onMenuClick={this.handleMenuClick}/>
        {gadget}
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
