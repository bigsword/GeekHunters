import React, { Component } from 'react';
import { connect } from 'react-redux'
import Candidate from '../components/Candidate';
import {fetchSkillList, fetchCandidate} from '../actions';

class CandidateList extends Component {

  _passFilter(skills) {
    let filter = this.props.skillFilter;

    if (!filter) {
      return true;
    }

    for (var i = 0; i < filter.length; i++) {
      if (skills.includes(filter[i])) {
        continue;
      } else {
        return false;
      }
    }

    return true;
  }

  componentDidMount() {
    this.props.fetchCandidate();
    this.props.fetchSkillList();
  }

  render () {
    let candidates = this.props.candidates ? this.props.candidates : [];
    candidates = candidates.filter(c => this._passFilter(c.skills));
    let cards = candidates.map(c => <Candidate key={c.id} 
                                                firstName={c.firstName} 
                                                lastName={c.lastName} 
                                                skills={c.skills} />);

    return (
      <div>
        {cards}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  skillFilter: state.skillFilter,
  candidates: state.candidates
})

const mapDispatchToProps = dispatch => ({
  fetchCandidate: () => dispatch(fetchCandidate()),
  fetchSkillList: () => dispatch(fetchSkillList())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CandidateList)
