import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { createCandidate } from '../actions';

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      skills: [],
      errors: []
    }
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleMultiSelection = (event) => {
    var target = event.target;
    var name = target.name;
    var options = target.options;
    var value = [];
    for (var i = 0; i < options.length; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }

    this.setState({
      [name]: value
    });
  }


  handleSubmit = (event) => {
    event.preventDefault();

    let errors = [];
    if(!this.state.firstName) {
      errors.push("First Name cannot be empty.");
    }

    if(!this.state.lastName) {
      errors.push("Last Name cannot be empty.");
    }
    
    this.setState({
      errors: errors
    });

    if(errors.length !== 0) {
      return;
    }

    this.props.createCandidate(this.state.firstName,
                                this.state.lastName,
                                this.state.skills);

    this.props.handleClose();
  }

  render() {
    let skills = this.props.skills ? this.props.skills : [];

    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input type="text" name="firstName" id="firstName" placeholder="first name" 
                    onChange={this.handleChange}  value={this.state.firstName} />
          </FormGroup>          
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input type="text" name="lastName" id="lastName" placeholder="last name" 
                    onChange={this.handleChange}  value={this.state.lastName} />
          </FormGroup>
          <FormGroup>
            <Label for="skillsSelect">Skills (Hold command/ctrl key to multiple select)</Label>
            <Input type="select" name="skills" id="skillsSelect"
                    onChange={this.handleMultiSelection}  value={this.state.skills} multiple>
              {skills.map(s => <option key={s} value={s}>{s}</option>)}
            </Input>
          </FormGroup>
          <FormGroup>
            {this.state.errors.map(e => <p key={e}>{e}</p>)}
            <Button type="submit">Create</Button>
            <Button onClick={this.props.handleClose} name="close">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
} 

const mapStateToProps = state => ({
  skills: state.skillList
})

const mapDispatchToProps = dispatch => ({
  createCandidate: (firstName, lastName, skills) => 
    dispatch(createCandidate(firstName, lastName, skills))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create)