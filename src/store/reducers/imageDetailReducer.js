const initialState = {
    data: [],
    loading: true,
    error: null,
    photographer: ''
}

function reducer(state = initialState, action) {
  const {type, payload} = action;
  if ( type === 'imageDetail/insertData') {
    return { ...state, data: payload }
  } else if ( type === 'imageDetail/setLoading') {
    return { ...state, loading: payload }
  } else if ( type === 'imageDetail/setError') {
    return { ...state, error: payload }
  } else if ( type === 'imageDetail/setImagePhotographer') {
    return { ...state, photographer: payload }
  }

  return state;
}

export default reducer;