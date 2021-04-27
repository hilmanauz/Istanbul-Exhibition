import { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'

export default function useFetchDetail(url) {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const {REACT_APP_API_KEY_PEXELSS} = process.env;
  const dispatch = useDispatch()

  useEffect (() => {
    fetch(url, {
        method: 'GET',
        headers: {
            Authorization : REACT_APP_API_KEY_PEXELSS
        }
    })
    .then(res => res.json())
    .then(res => {
      dispatch({type: 'imagesSearch/insertimagesSearch', payload: res.photos})
    })
    .catch(err => {
        setError(err)
    })
    .finally(() => {
      setLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  return {
      loading,
      error
  }
}
