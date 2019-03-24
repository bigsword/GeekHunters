const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_SKILL_LIST':
      return {
        ...state,
        skillList: action.data
      }
    case 'RECEIVE_CANDIDATES':
      return {
        ...state,
        candidates: action.data
      }
    case 'ADD_CANDIDATE':
      return {
        ...state,
        candidates: [
          ...state.candidates,
          action.data
        ]
      }
    case 'SET_SKILL_FILTER':
      return {
        ...state,
        skillFilter: action.data
      }
    default:
      return state;
  }
}

export default reducer;
