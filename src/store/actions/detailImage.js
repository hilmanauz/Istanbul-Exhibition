export function insertData(payload) {
  return {type: 'imageDetail/insertData', payload}
}

export function setErrorImageDetail(payload) {
  return {type: 'imageDetail/setError', payload}
}

export function setLoadingImageDetail(payload) {
  return {type: 'imageDetail/setLoading', payload}
}

export function insertImageDetailAsync (url) {
  return (dispatch) => {
    fetch(url, {
      method: 'GET',
      headers: {
          Authorization : process.env.REACT_APP_API_KEY_PEXELS
      }
    })
    .then(res => res.json())
    .then(res => {
      dispatch(insertData(res))
    })
    .catch(err => {
      dispatch(setErrorImageDetail(err))
    })
    .finally(() => {
      dispatch(setLoadingImageDetail(false))
    })
  }
}

export function setImagePhotographer (payload) {
  return {type: 'imageDetail/setImagePhotographer', payload}
}