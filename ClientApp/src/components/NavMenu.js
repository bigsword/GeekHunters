import React, { Component } from 'react';
import { Collapse, Container, Navbar, Nav, NavLink, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: false
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  handleMenuClick = (e) => {
    this.props.onMenuClick(e.target.name);
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand >Geek Hunter</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} />
              <Collapse isOpen={this.state.collapsed} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink href="#" onClick={this.handleMenuClick} name="filter">Filter</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#" onClick={this.handleMenuClick} name="create">Create</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
