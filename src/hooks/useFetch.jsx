import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function useFetch(url, page) {
  const [error, setError] = useState(null);
  const {REACT_APP_API_KEY_PEXELSS} = process.env;
  const dispatch = useDispatch();
  
  useEffect (() => {
    fetch(url+`&page=${page}`, {
        method: 'GET',
        headers: {
            Authorization : REACT_APP_API_KEY_PEXELSS
        }
    })
    .then(res => res.json())
    .then(res => {
        dispatch({ type: 'images/insertImages', payload: res.photos})
    })
    .catch(err => {
        setError(err)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  return {
      error
  }
}
