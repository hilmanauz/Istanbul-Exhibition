const initialState = {
  data: [],
  loading: true,
  error: null,
  key: '',
  tempKey: ''
}

function reducer(state = initialState, action) {
  const {type, payload} = action;
  if ( type === 'imagesSearch/insertData') {
    return { ...state, data: payload }
  } else if ( type === 'imagesSearch/setKey') {
    return { ...state, key: payload }
  } else if ( type === 'imagesSearch/setLoading') {
    return { ...state, loading: payload }
  } else if ( type === 'imagesSearch/setError') {
    return { ...state, error: payload }
  } else if ( type === 'imagesSearch/setTempKey') {
    return { ...state, tempKey: payload }
  }

  return state;
}

export default reducer;