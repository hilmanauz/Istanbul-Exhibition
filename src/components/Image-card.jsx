import React from 'react'
import Swal from 'sweetalert2'
import heart from '../icons/suit-heart.svg'
import heartFill from '../icons/suit-heart-fill.svg'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {setIsFavouriteImages} from '../store/actions/images'


function ImageCard (props) {
  const {image} = props
  const url = ""
  const history = useHistory()
  const dispatch = useDispatch()


  const goToDetail = (event) => {
    event.preventDefault()
    Swal.fire({
      imageUrl: image.src.large2x,
      imageHeight: 450,
      imageAlt: 'Custom image',
      showCloseButton: true,
      confirmButtonText:'Detail',
      confirmButtonColor: 'grey'
    })
      .then(result => {
        if(result.isConfirmed){
          history.push(`/detail/${image.id}`)
        }
      })
  }

  const AddToFavourite = () => {
    if (image.isFavourite){
      image.isFavourite = false
      dispatch(setIsFavouriteImages())
    } else {
      image.isFavourite = true
      dispatch(setIsFavouriteImages())
    }
  }

  return (
      <div className="card col-xs-12 col-lg-3 col-xl-4 my-4 mx-auto border-0 shadow-sm" style={{width: "18rem"}}>
      <a onClick={(event) => goToDetail(event)} href={url}> <img src={image.src.large2x} className="card-img-top mt-2" alt="..."style={{height: "23rem"}}/></a> 
      <div className="card-body d-flex flex-column align-items-center">
        <img src={image.isFavourite ? heartFill : heart} alt="" className="bottom-left-icon m-2" onClick={AddToFavourite}/>
      </div>
    </div>
  )
}

export default ImageCard
