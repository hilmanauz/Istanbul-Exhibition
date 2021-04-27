import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ImageCard from '../components/Image-card'
import _ from 'lodash'
import {ClipLoader} from "react-spinners";
import { css } from "@emotion/core";
import {insertImageDetailAsync, setImagePhotographer} from '../store/actions/detailImage'

export default function Detail() {
  const {id} = useParams()
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(insertImageDetailAsync(`https://api.pexels.com/v1/photos/${id}`))
    // eslint-disable-next-line
  }, [id])
  const detailImage = useSelector(state => state.imageDetail.data)
  const loadingDetail = useSelector(state => state.imageDetail.loading)
  const errorDetail = useSelector(state => state.imageDetail.error)
  dispatch(setImagePhotographer(detailImage.photographer))
  
  const data = useSelector(state => state.images.data);
  const photographer = useSelector(state => state.imageDetail.photographer);
  const groupByPhotographer = _.groupBy(data, (el) => el.photographer);
  const selectedPhotographer = _.pick(groupByPhotographer, photographer);
  const images = Object.values(selectedPhotographer)
  console.log(images)
  const override = css`
  display: block;
  margin: 200px auto;
  `;

  if (loadingDetail){
    return (
      <ClipLoader css={override} size={150}/>
    )
  } else if (errorDetail){
    return (
      <h1>Error in {errorDetail}</h1>
    )
  } else if(detailImage){
    return (
      <div>
        <div className="container mt-5" style={{maxWidth:"1200px"}}>
          <div className="row">
            <div className="col-5">
                <div className="card shadow-sm p-3 mb-5 bg-white rounded" style={{width: "30rem", position:"sticky", top: 120}}>
                  <img src={detailImage.src.landscape} className="card-img-top img-thumbnail" alt="..."/>
                  <div className="card-body text-center">
                    <h3 className="card-title">Photographer:</h3>
                    <p className="card-text" style={{fontSize:"20px"}}>{detailImage.photographer}</p>
                      <div className="row">
                      <div className="col-6 d-flex justify-content-center">
                        <h5 className="card-title mr-3">Width:</h5>
                        <p>{detailImage.width}</p>
                      </div>
                      <div className="col-6 d-flex justify-content-center">
                        <h5 className="card-title mr-3">Height:</h5>
                        <p>{detailImage.height}</p>
                      </div>
                      </div>
                        <button className="btn-lg btn-secondary"> <a href={detailImage.src.original} target="_blank" style={{textDecoration:"none", color:"white"}} rel="noreferrer">Download <i className="fa fa-download" aria-hidden="true"></i> </a></button>
                  </div>
                </div>
              </div>
            <div className="col-7">
              <div className="text-center">
                <h2>Collection from {photographer}</h2>
              { images.length > 0 &&
                  <div className="row mb-5 mx-auto d-flex" style={{width:"100%"}}>
                  {
                    images[0].map((image, idx) => {
                    return <ImageCard image={image} key={idx} ></ImageCard>
                    })
                  }
                  </div>
              }
              { images.length === 0 &&
                <>
                  <img src="https://i.pinimg.com/originals/b7/41/bd/b741bd5da3e33944ab9432e9e0923822.gif" alt="..." style={{height:"400px", width:"600px"}}></img>
                  <h3 className="mt-3">Collection Not Found</h3>
                </>
              }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
