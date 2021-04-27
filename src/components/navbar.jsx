import React, { useCallback, useState } from 'react'
import {GiFoxHead} from 'react-icons/gi'
import { useHistory } from "react-router-dom";
import {useDispatch} from 'react-redux'
import {setKey} from '../store/actions/searchImages'
import heart from '../icons/heart.svg'
import heartSolid from '../icons/heart-solid.svg'



function Navbar() {
  let history = useHistory()
  let dispatch = useDispatch()
  const [isSearch, setIsSearch] = useState(true);
  const url = ""
  const goToFavorite = () => {
    setIsSearch(false);
    history.push('/favourite')
  }

  const goToHome = (event) => {
    event.preventDefault()
    setIsSearch(true);
    history.push('/')
  }

  const debounce = (func) => {
    let timer;
    return function (...args){
      const context = this;
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        timer = null
        func.apply(context, args);
      }, 1000)
    }
  }

  const HandleChange = (event) => {
    const {value} = event.target;
    dispatch(setKey(value))
  }

  // const deleteSearch = (event) => {
  //   if(event.key === 'Enter'){
  //     event.target.value = ""
  //   }
  // }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const lastSearch = useCallback(
    debounce(HandleChange) 
    , [])
    
  return (
    <nav className="navbar sticky-top navbar-light shadow bg-light">
        <a href={url} className="navbar-brand font-weight-bold" onClick={(event) => goToHome(event)}><GiFoxHead size={30}/>Istanbul Exhibition</a>
        <div className="d-flex flex-row bd-highlight">
        <button className="btn btn-sm btn-outline-light rounded-pill font-weight-bold mr-3" type="button" onClick={goToFavorite}><img src={isSearch ? heart : heartSolid } style={{width: "25px", height:"25px"}} alt="..."></img></button>
        { isSearch &&
          <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" onChange={lastSearch}/>
        }
        </div>
    </nav>
  )
}

export default Navbar