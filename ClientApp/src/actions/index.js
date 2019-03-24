import axios from 'axios';

export const receiveSkillList = data => ({
  type: 'RECEIVE_SKILL_LIST', data
})

export const receiveCandidates = data => ({
  type: 'RECEIVE_CANDIDATES', data
})

export const addCandidate = data => ({
  type: 'ADD_CANDIDATE', data
});

export const setSkillFilter = data => ({
  type: 'SET_SKILL_FILTER', data
})

export function fetchCandidate(skills = []) {
  return (dispatch) => {
    axios.get(process.env.REACT_APP_CANDIDATE_URL)
      .then(res => dispatch(receiveCandidates(res.data)))
      .catch(err => console.log(err));
  }
}

export function fetchSkillList() {
  return (dispatch) => {
    axios.get(process.env.REACT_APP_SKILL_URL)
      .then(res => dispatch(receiveSkillList(res.data)))
      .catch(err => console.log(err));
  }
}

export function createCandidate(firstName, lastName, skills) {
  return (dispatch) => {
    axios.post(process.env.REACT_APP_CANDIDATE_URL, {
      firstName,
      lastName,
      skills
    })
    .then(res => dispatch(addCandidate(res.data)))
    .catch(err => console.log(err));
  }
}
