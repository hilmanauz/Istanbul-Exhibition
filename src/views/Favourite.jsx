import React, { useEffect } from 'react'
import {useSelector} from 'react-redux'
import ImageCard from '../components/Image-card'

export default function Favourite() {
  const images = useSelector(state => state.images.data)
  const favouriteImages = images.filter(image => image.isFavourite === true)
  const imagesSearch = useSelector(state => state.imagesSearch.data)
  let favouriteSearchImages = [];
  if (imagesSearch) {
    favouriteSearchImages = imagesSearch.filter(image => image.isFavourite === true)
  }

  const isFavourite = useSelector(state => state.images.isFavourite)
  
  useEffect (() => {
  }, [isFavourite])

  return (
    <div className="container mt-5">
      <div className="text-center mt-5">
        <h1>Your Favourite</h1>
          {
            <div className="row mb-5 mx-auto d-flex" style={{width:"100%"}}>
              { favouriteImages.length > 0 &&
                favouriteImages.map((image, idx) => {
                  return <ImageCard image={image} key={idx} ></ImageCard>
                })
              }
              { favouriteSearchImages &&
                favouriteSearchImages.map((image, idx) => {
                  return <ImageCard image={image} key={idx} ></ImageCard>
                })
              }
            </div>
          }
          {
            favouriteImages.length === 0 && favouriteSearchImages.length === 0 &&
            <>
              <img src="https://cdn.dribbble.com/users/932640/screenshots/2470471/jq.gif" alt="..." style={{height:"400px", width:"600px"}}></img>
              <h3 className="mt-3">Favourite Not Found</h3>
            </>
          }
      </div>
    </div>
  )
}
