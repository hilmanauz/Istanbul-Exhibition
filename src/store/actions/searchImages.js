export function insertData (payload) {
  return {type: 'imagesSearch/insertData', payload}
}

export function setErrorImagesSearch(payload) {
  return {type: 'imagesSearch/setError', payload}
}
  
export function setLoadingImagesSearch(payload) {
  return {type: 'imagesSearch/setLoading', payload}
}

export function insertImagesSearchAsync (url) {
  return (dispatch) => {
    fetch(url, {
      method: 'GET',
      headers: {
          Authorization : process.env.REACT_APP_API_KEY_PEXELS
      }
    })
    .then(res => res.json())
    .then(res => {
      dispatch(insertData(res.photos))
    })
    .catch(err => {
      dispatch(setErrorImagesSearch(err))
    })
    .finally(() => {
      dispatch(setLoadingImagesSearch(false))
    })
  }
}

export function setKey (payload) {
    return {type: 'imagesSearch/setKey', payload}
}


export function setTempKey (payload) {
  return {type: 'imagesSearch/setTempKey', payload}
}