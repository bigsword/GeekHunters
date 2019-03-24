import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { setSkillFilter } from '../actions';

class Filter extends Component {
  constructor(props) {
    super(props);

    let filter = this.props.skillFilter ? this.props.skillFilter : [];

    this.state = {
      skillFilter: filter 
    }
  }

  handleMultiSelection = (event) => {
    var target = event.target;
    var options = target.options;
    var name = target.name;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }

    this.setState({
      [name]: value
    });
    
    this.props.setSkillFilter(value); 
  }

  handleReset = (event) => {
    this.setState({
      skillFilter: []
    });

    this.props.setSkillFilter([]); 
  }

  render() {
    let skills = this.props.skills ? this.props.skills : [];

    return (
      <Container>
        <Form>
          <FormGroup>
            <Label for="skillsSelect">Skills (Hold command/ctrl key to multiple select)</Label>
            <Input type="select" name="skillFilter" id="skillsSelect"
                    onChange={this.handleMultiSelection}  value={this.state.skillFilter} multiple>
              {skills.map(s => <option key={s} value={s}>{s}</option>)}
            </Input>
          </FormGroup>
          <FormGroup>
            <Button onClick={this.handleReset}>Reset</Button>
            <Button onClick={this.props.handleClose} name="close">Close</Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
} 

const mapStateToProps = state => ({
  skills: state.skillList,
  skillFilter: state.skillFilter
})

const mapDispatchToProps = dispatch => ({
  setSkillFilter: (skillFilter) => 
    dispatch(setSkillFilter(skillFilter))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)
