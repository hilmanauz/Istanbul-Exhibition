import { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'

export default function useFetchDetail(url) {
  const data = useSelector(state => state.imageDetail)
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
      dispatch({type: 'imageDetail/insertImageDetail', payload: res})
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
      data,
      loading,
      error
  }
}
