export function insertData (payload) {
    return {type: 'images/insertData', payload}
}

export function setErrorImages (payload) {
  return {type: 'images/setError', payload}
}

export function setPageImages (payload) {
    return {type: 'images/setPage', payload}
}

export function setTempPageImages (payload) {
  return {type: 'images/setTempPage', payload}
}

export function setIsFavouriteImages () {
    return {type: 'images/setIsFavourite'}
}

export function insertImagesAsync (url, page) {
  return (dispatch) => {
    fetch(url+`&page=${page}`, {
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
      dispatch(setErrorImages(err))
    })
  }
}