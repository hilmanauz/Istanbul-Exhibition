const initialState = {
  data: [],
  error: null,
  page: Math.ceil(Math.random()*10),
  tempPage: 0,
  isFavourite: 0
}

function reducer(state = initialState, action) {
  const {type, payload} = action;
  if ( type === 'images/insertData') {
    return { ...state, data: state.data.concat(payload) }
  } else if ( type === 'images/setPage') {
    return { ...state, page: state.page + payload }
  } else if ( type === 'images/setError') {
    return { ...state, error: payload }
  } else if ( type === 'images/setIsFavourite') {
    return { ...state, isFavourite: state.isFavourite + 1 }
  } else if ( type === 'images/setTempPage') {
    return { ...state, tempPage: payload }
  }
  return state;
}

export default reducer;