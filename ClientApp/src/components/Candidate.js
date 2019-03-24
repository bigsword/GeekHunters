import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Container } from 'reactstrap';

class Candidate extends Component {

  render () {
    let skills = this.props.skills.map(s => <ListGroupItem key={s}>{s}</ListGroupItem>);

    return (
      <Container>
        <h4>Name: {this.props.firstName}, {this.props.lastName}</h4>
        <ListGroup>{skills}</ListGroup>
      </Container>
    );
  }
}

export default Candidate;